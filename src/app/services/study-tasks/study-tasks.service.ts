import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Task } from 'src/app/interfaces/types';
import { Study, Alerts } from 'src/app/interfaces/study';
import { RRule } from 'rrule';

@Injectable({ providedIn: 'root' })
export class StudyTasksService {
  private readonly MAX_OCCURRENCES = 60;

  constructor(private storageService: StorageService) {}

  /** Generate & save all tasks from the current study */
  async generateStudyTasks(): Promise<void> {
    const study: Study | null = await this.storageService.getStudy();
    if (!study) {
      console.warn('No study found, aborting task generation.');
      return;
    }

    // 1) Randomize participant condition
    const conditions = study.properties.conditions;
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    console.log(`Selected condition: ${condition}`, conditions);
    await this.storageService.saveCondition(condition);

    const tasks: Task[] = [];
    let nextId = 101;

    // 2) For each module matching the condition, build dates + times
    for (const [idx, mod] of (study.modules || []).entries()) {
      if (mod.condition !== '*' && mod.condition !== condition) continue;

      console.log(`Generating dates for module ${mod.id}`, mod.alerts);
      const dates = this.generateTaskDates(mod.alerts);
      console.log(` → raw dates (${dates.length}):`, dates);

      let stickyCount = 0;
      for (const dt of dates) {
        this.pushTask(mod, idx, dt, stickyCount++, nextId++, tasks);
        for (const hhmm of mod.alerts.times ?? []) {
          const extraDate = this.mergeDateTime(dt, hhmm);
          this.pushTask(mod, idx, extraDate, stickyCount++, nextId++, tasks);
        }
      }
    }

    // 3) Sort, log, & save
    tasks.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    console.log(`Final tasks (${tasks.length}):`, tasks.map(t => t.time));
    await this.storageService.saveTasks(tasks);
  }

  /** Build array of Dates from alerts.startDateTime + repeat/interval/until */
  private generateTaskDates(alerts: Alerts): Date[] {
    const { startDateTime, repeat, interval, until } = alerts;
    const dtstart = new Date(startDateTime);
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
      // if no until provided, we’ll stop after 30 occurrences
      until: until
        ? new Date(until + 'T23:59:59')
        : undefined,
      count: until
        ? undefined
        : 60
    };

    try {
      const rule = new RRule(opts);
      if (!until) {
        // cap unbounded recurrences
        return rule.all((_, i) => i < this.MAX_OCCURRENCES);
      }
      return rule.all();
    } catch (e) {
      console.error('RRule error with options', opts, e);
      return [];
    }
  }

  /**
   * Push a single Task into the list, applying random offset if needed.
   */
  private pushTask(
    mod: Study['modules'][0],
    modIndex: number,
    date: Date,
    stickyCount: number,
    idNum: number,
    out: Task[]
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
      hidden: !(mod.alerts.sticky && stickyCount === 0),
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
    });
  }

  /** Merge a Date’s YYYY-MM-DD with an “HH:mm” or “HH:mm:ss” string */
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

  /** Retrieve all tasks (raw) */
  async getAllTasks(): Promise<Task[]> {
    return (await this.storageService.getTasks()) ?? [];
  }

/** Retrieve only unlocked, non-expired tasks */
async getToDos(): Promise<Task[]> {
  const tasks = (await this.storageService.getTasks()) ?? [];
  const now = new Date();
  const sticky: any[] = [];
  const timed: any[] = [];
  let lastLabel = '';

  for (const t of tasks) {
    const alertTime = new Date(t.time);
    if (!this.checkUnlocked(t, tasks) || alertTime > now) continue;

    if (t.sticky) {
      // ← skip sticky tasks that are already completed
      if (t.completed) continue;

      if (!t.hidden) {
        if (lastLabel !== t.sticky_label) {
          sticky.push({ type: 'header', label: t.sticky_label });
          lastLabel = t.sticky_label;
        }
        sticky.push(t);
      }
    } else {
      if (t.completed) continue;   // ← non-sticky also skip completed
      if (t.timeout) {
        const expire = new Date(alertTime.getTime() + t.timeout_after);
        if (now < expire) timed.push(t);
      } else {
        timed.push(t);
      }
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
    const done = new Set(list.filter((t) => t.completed).map((t) => t.uuid));
    return (task.unlock_after ?? []).every((pr) => done.has(pr));
  }
}