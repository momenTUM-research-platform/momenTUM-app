import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Task } from 'src/app/interfaces/types';
import { Study, Alerts } from 'src/app/interfaces/study';
import { RRule } from 'rrule';

@Injectable({ providedIn: 'root' })
export class StudyTasksService {
  private readonly MAX_OCCURRENCES = 60;

  constructor(private storageService: StorageService) {}

  /**
   * Generate tasks for each module based on scheduleMode (absolute or relative)
   * and save them in storage.
   */
  async generateStudyTasks(): Promise<void> {
    const study: Study | null = await this.storageService.getStudy();
    if (!study) {
      console.warn('No study found, aborting task generation.');
      return;
    }

    // Retrieve actual enrollment date (fallback to now if missing)
    const enrolmentDateStr = await this.storageService.getEnrolmentDate();
    const enrolmentDate = enrolmentDateStr ? new Date(enrolmentDateStr) : new Date();

    // 1) Randomize participant condition and store
    const conditions = study.properties.conditions;
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    console.log(`Selected condition: ${condition}`, conditions);
    await this.storageService.saveCondition(condition);

    const tasks: Task[] = [];
    let nextId = 101;

    // 2) Generate notifications for each eligible module
    study.modules?.forEach((mod, idx) => {
      if (mod.condition !== '*' && mod.condition !== condition) return;

      console.log(`Generating dates for module ${mod.id}`, mod.alerts);
      const dates = this.generateTaskDates(mod.alerts, enrolmentDate);
      console.log(` → raw dates (${dates.length}):`, dates);

      dates.forEach(dt => {
        if (mod.alerts.sticky) {
          // ONE canonical task per date; attach reminder times for this date
          this.pushTask(
            mod, idx, dt,
            0,                 // stickyCount not needed anymore
            nextId++,
            tasks,
            mod.alerts.times ?? []  // pass reminder times
          );
        } else {
          // Non-sticky → each prompt is its own task (base + extra times)
          this.pushTask(mod, idx, dt, 0, nextId++, tasks);
          (mod.alerts.times ?? []).forEach(hm => {
            const extraDate = this.mergeDateTime(dt, hm);
            this.pushTask(mod, idx, extraDate, 0, nextId++, tasks);
          });
        }
      });
    });

    // 3) Sort tasks chronologically and save
    tasks.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    console.log(`Final tasks (${tasks.length}):`, tasks.map(t => t.time));
    await this.storageService.saveTasks(tasks);
  }

  /**
   * Dispatch to absolute or relative schedule generation.
   */
  private generateTaskDates(alerts: Alerts, enrolmentDate: Date): Date[] {
    return alerts.scheduleMode === 'relative'
      ? this.generateRelativeDates(alerts, enrolmentDate)
      : this.generateAbsoluteDates(alerts);
  }

  /** Return true if task is expired at 'nowMs'. Sticky expires after LAST reminder + timeout. */
private isExpiredNow(t: Task, nowMs: number): boolean {
  if (!t.timeout) return false;

  const baseMs = new Date(t.time).getTime();
  const timeoutMs = t.timeout_after ?? 0;

  if (!t.sticky) {
    return nowMs >= baseMs + timeoutMs;
  }

  // Sticky: expire after the last same-day reminder time (if any) + timeout
  let anchor = new Date(baseMs);
  if (Array.isArray(t.reminder_times) && t.reminder_times.length) {
    const lastHM = t.reminder_times[t.reminder_times.length - 1];
    anchor = this.mergeDateTime(new Date(baseMs), lastHM);
  }

  // Optional cushion for jittered reminders so we don't cut them off early
  const cushionMs = t.random ? (t.random_interval ?? 0) * 60_000 : 0;

  return nowMs >= anchor.getTime() + timeoutMs + cushionMs;
}

  /**
   * Generate dates based on absolute calendar fields using RRule.
   */
  private generateAbsoluteDates(alerts: Alerts): Date[] {
    const { startDateTime, repeat, interval, until } = alerts;
    const dtstart = new Date(startDateTime!);
    if (isNaN(dtstart.getTime())) {
      console.error('Invalid startDateTime:', startDateTime);
      return [];
    }
    if (repeat === 'never') {
      return [dtstart];
    }

    const opts: any = {
      dtstart,
      freq: RRule[repeat.toUpperCase()],
      interval: interval || 1,
      until: until ? new Date(until + 'T23:59:59') : undefined,
      count: until ? undefined : this.MAX_OCCURRENCES
    };

    try {
      const rule = new RRule(opts);
      return until
        ? rule.all()
        : rule.all((_, i) => i < this.MAX_OCCURRENCES);
    } catch (e) {
      console.error('RRule error with options', opts, e);
      return [];
    }
  }

  /**
   * Generate dates relative to enrollment date using offsetDays/time and repeatCount.
   */
  private generateRelativeDates(alerts: Alerts, enrolmentDate: Date): Date[] {
    const { offsetDays, offsetTime, repeat, interval, repeatCount } = alerts;
    if (offsetDays == null || !offsetTime) {
      console.error('Missing offsetDays or offsetTime for relative schedule', alerts);
      return [];
    }

    // First occurrence anchored at enrollment
    const first = new Date(enrolmentDate);
    first.setDate(first.getDate() + offsetDays);
    const [h, m] = offsetTime.split(':').map(Number);
    first.setHours(h, m, 0, 0);

    const occurrences: Date[] = [first];
    if (repeat === 'never' || !repeatCount) {
      return occurrences;
    }

    // Additional repeats after first
    let prev = first;
    for (let i = 0; i < repeatCount; i++) {
      const next = new Date(prev);
      switch (repeat) {
        case 'daily':
          next.setDate(prev.getDate() + (interval || 1));
          break;
        case 'weekly':
          next.setDate(prev.getDate() + 7 * (interval || 1));
          break;
        case 'monthly':
          next.setMonth(prev.getMonth() + (interval || 1));
          break;
        case 'yearly':
          next.setFullYear(prev.getFullYear() + (interval || 1));
          break;
      }
      occurrences.push(next);
      prev = next;
    }
    return occurrences;
  }

  /**
   * Schedule a single task, applying random jitter if enabled.
   */
  private pushTask(
    mod: Study['modules'][0],
    modIndex: number,
    date: Date,
    _stickyCount: number,   // kept for call sites, but unused now
    idNum: number,
    out: Task[],
    reminderTimes: string[] = []   // NEW
  ): void {
    const scheduled = new Date(date);
    if (mod.alerts.random) {
      scheduled.setMinutes(scheduled.getMinutes() - mod.alerts.randomInterval);
      scheduled.setMinutes(
        scheduled.getMinutes() + Math.random() * mod.alerts.randomInterval * 2
      );
    }
  
    const localeOpts = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    } as const;
  
    out.push({
      uuid: mod.id,
      index: modIndex,
      task_id: String(idNum),
      name: mod.name,
      type: mod.params.type,
      hidden: false,
      unlock_after: mod.unlock_after ?? [],
      sticky: mod.alerts.sticky,
      sticky_label: mod.alerts.stickyLabel,
      alert_title: mod.alerts.title,
      alert_message: mod.alerts.message,
      timeout: mod.alerts.timeout,
      timeout_after: mod.alerts.timeoutAfter,
      time: scheduled.toISOString(),
      locale: scheduled.toLocaleString('en-US', localeOpts),
      completed: false,
      reminder_times: mod.alerts.sticky ? reminderTimes : [],
      // NEW: pass through jitter settings so NotificationsService can jitter reminders
      random: !!mod.alerts.random,
      random_interval: mod.alerts.randomInterval ?? 0,
    } as Task);
  }
  
  /**
   * Combine a base date with an HH:mm time string.
   */
  private mergeDateTime(base: Date, hm: string): Date {
    const parts = hm.split(':').map(Number);
    const [h, m] = parts;
    if (parts.length < 2 || isNaN(h) || isNaN(m)) {
      console.warn('Invalid time string:', hm);
      return new Date(base);
    }
    const d = new Date(base);
    d.setHours(h, m, 0, 0);
    return d;
  }

  /** Retrieve raw task list */
  async getAllTasks(): Promise<Task[]> {
    return (await this.storageService.getTasks()) ?? [];
  }

  /** Retrieve only unlocked, non-expired tasks */
  async getToDos(): Promise<Task[]> {
    const tasks = (await this.storageService.getTasks()) ?? [];
    const now = new Date();
    const nowMs = now.getTime();
    const sticky: any[] = [];
    const timed: any[] = [];
    let lastLabel = '';
  
    for (const t of tasks) {
      const alertTime = new Date(t.time);
      if (!this.checkUnlocked(t, tasks)) continue;
      if (alertTime > now) continue;            // not yet visible
      if (t.completed) continue;
      if (t.hidden) continue;
      if (this.isExpiredNow(t, nowMs)) continue; // ← NEW: respect timeout for all tasks
  
      if (t.sticky) {
        if (lastLabel !== t.sticky_label) {
          sticky.push({ type: 'header', label: t.sticky_label });
          lastLabel = t.sticky_label;
        }
        sticky.push(t);
      } else {
        timed.push(t);
      }
    }
  
    if (timed.length) {
      timed.reverse();
      timed.unshift({ type: 'header', label: 'Recent' });
    }
    return timed.concat(sticky);
  }

  /** Public alias for unlock check */
  public checkTaskIsUnlocked(task: Task, taskList: Task[]): boolean {
    return this.checkUnlocked(task, taskList);
  }

  /** Internal prereq-unlock check */
  private checkUnlocked(task: Task, list: Task[]): boolean {
    const done = new Set(list.filter(t => t.completed).map(t => t.uuid));
    return (task.unlock_after ?? []).every(pr => done.has(pr));
  }
}