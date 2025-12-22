import { Injectable, NgZone } from '@angular/core';
import {
  LocalNotifications,
  LocalNotificationSchema,
  PendingLocalNotificationSchema,
  ActionPerformed,
  CancelOptions,
} from '@capacitor/local-notifications';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { StudyTasksService } from '../study-tasks/study-tasks.service';
import { Task } from 'src/app/interfaces/types';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly CHANNEL_ID = 'default';
  private readonly MAX_SCHEDULE = 64;

  // Base notifications use Number(task.task_id).
  // Reminders: baseId * REMINDER_MULTIPLIER + i
  private readonly REMINDER_MULTIPLIER = 100;

  // Immediate catch-up pings: baseId * IMMEDIATE_OFFSET + 1
  private readonly IMMEDIATE_OFFSET = 1000;

  private deliveredSub = new Subject<void>();
  public onDelivered$ = this.deliveredSub.asObservable();

  constructor(
    private storage: StorageService,
    private studyTasks: StudyTasksService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.initialize();

    LocalNotifications.addListener('localNotificationReceived', () => {
      this.ngZone.run(() => {
        console.log('[Notif] delivered');
        this.deliveredSub.next();
      });
    });
  }

  public async initialize(): Promise<void> {
    await this.requestPermissions();
    await LocalNotifications.createChannel({
      id: this.CHANNEL_ID,
      name: 'Default Notifications',
      importance: 5,
      visibility: 1,
    });
    this.addListenerOnClick();
  }

  public async requestPermissions(): Promise<void> {
    const perm = await LocalNotifications.checkPermissions();
    if (perm.display !== 'granted') {
      await LocalNotifications.requestPermissions();
    }
  }

  private jitter(date: Date, minutes: number): Date {
    if (!minutes || minutes <= 0) return date;
    const d = new Date(date);
    const delta = Math.floor(Math.random() * (minutes * 2 + 1)) - minutes; // [-m..+m]
    d.setMinutes(d.getMinutes() + delta);
    return d;
  }

  private addListenerOnClick(): void {
    LocalNotifications.removeAllListeners();
    LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (action: ActionPerformed) => {
        const extra = action.notification.extra as {
          task_id?: string;
          task_type?: 'survey' | 'pvt';
        };
        const id = extra?.task_id;
        const type = extra?.task_type;
        if (!id) return;

        this.ngZone.run(() => {
          if (type === 'pvt') {
            this.router.navigateByUrl(`/pvt/${id}`);
          } else {
            this.router.navigateByUrl(`/survey/${id}`);
          }
        });
      }
    );
  }

  /**
   * Cancel pending notifications (base + reminders) for a single task.
   * Matches by extra.task_id to catch base and reminder IDs.
   */
  public async cancelPendingForBaseTask(taskId: string): Promise<number> {
    try {
      const { notifications } = await LocalNotifications.getPending();
      const toCancel = notifications
        .filter(n => String((n as any)?.extra?.task_id) === String(taskId))
        .map(n => ({ id: n.id }));

      if (!toCancel.length) return 0;
      await LocalNotifications.cancel({ notifications: toCancel } as CancelOptions);
      return toCancel.length;
    } catch (err) {
      console.error('[Notif] cancelPendingForBaseTask failed for', taskId, err);
      return 0;
    }
  }

  /** Schedule one base notification for a task. */
  private async scheduleNotification(task: Task): Promise<void> {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Number(task.task_id),
            title: task.alert_title,
            body: task.alert_message,
            smallIcon: 'res://notification_icon',
            largeIcon: 'res://notification_icon',
            extra: {
              task_id: task.task_id,
              task_type: task.type,
            },
            ongoing: false,
            autoCancel: true,
            channelId: this.CHANNEL_ID,
            schedule: {
              at: new Date(task.time),
              allowWhileIdle: true,
            },
          },
        ],
      });
    } catch (err) {
      console.error('Failed to schedule notification for task', task.task_id, err);
    }
  }

  /**
   * For sticky tasks: schedule reminder pings for the same task.
   * Uses unique IDs (baseId*REMINDER_MULTIPLIER + i).
   */
  private async scheduleStickyReminders(task: Task, remainingSlots: number): Promise<number> {
    if (!task.sticky || !task.reminder_times?.length) return 0;
  
    const baseDate = new Date(task.time);
    const baseId = Number(task.task_id);
    const now = Date.now();
    const jitterMinutes = task.random ? (task.random_interval ?? 0) : 0;
  
    const notifs: LocalNotificationSchema[] = [];
    for (let i = 0; i < task.reminder_times.length; i++) {
      if (notifs.length >= remainingSlots) break;
  
      const hm = task.reminder_times[i];
      let at = this.combineDateWithHM(baseDate, hm);
  
      // apply jitter to reminder time (if enabled)
      if (jitterMinutes > 0) {
        at = this.jitter(at, jitterMinutes);
      }
  
      if (at.getTime() <= now) continue; // don’t schedule past times
  
      notifs.push({
        id: baseId * this.REMINDER_MULTIPLIER + (i + 1),
        title: task.alert_title,
        body: task.alert_message,
        smallIcon: 'res://notification_icon',
        largeIcon: 'res://notification_icon',
        extra: { task_id: task.task_id, task_type: task.type },
        ongoing: false,
        autoCancel: true,
        channelId: this.CHANNEL_ID,
        schedule: { at, allowWhileIdle: true },
      });
    }
  
    if (!notifs.length) return 0;
    try {
      await LocalNotifications.schedule({ notifications: notifs });
      return notifs.length;
    } catch (err) {
      console.error('Failed to schedule sticky reminders for task', task.task_id, err);
      return 0;
    }
  }

  /** Fire a single immediate notification for an overdue task. */
  private async scheduleImmediatePing(task: Task): Promise<void> {
    const baseId = Number(task.task_id);
    const at = new Date(Date.now() + 1000);

    await LocalNotifications.schedule({
      notifications: [{
        id: baseId * this.IMMEDIATE_OFFSET + 1,
        title: task.alert_title,
        body: task.alert_message,
        smallIcon: 'res://notification_icon',
        largeIcon: 'res://notification_icon',
        extra: { task_id: task.task_id, task_type: task.type },
        ongoing: false,
        autoCancel: true,
        channelId: this.CHANNEL_ID,
        schedule: { at, allowWhileIdle: true },
      }],
    });
  }

  /** Cancel all pending notifications. */
  public async cancelAll(): Promise<void> {
    const pending = await this.getPending();
    if (pending.length) {
      await LocalNotifications.cancel({
        notifications: pending.map((n) => ({ id: n.id })),
      } as CancelOptions);
    }
  }

  /** Get pending (scheduled but not yet delivered) notifications. */
  public async getPending(): Promise<LocalNotificationSchema[]> {
    const { notifications } = await LocalNotifications.getPending();
    return notifications.map((p: PendingLocalNotificationSchema) => ({
      id: p.id,
      title: p.title,
      body: p.body,
      schedule: p.schedule,
      extra: p.extra,
    }));
  }

  /**
   * Clear pending, then schedule up to MAX_SCHEDULE future alerts.
   * - Non-sticky: each task is its own alert.
   * - Sticky: schedule base + same-day reminders.
   * - If fireOverdueNow is true, also emit one immediate ping per module for the latest overdue task.
   */
  public async setNext30Notifications(fireOverdueNow = false): Promise<void> {
    console.log('[Notif] setNext30Notifications', { fireOverdueNow });
    await this.cancelAll();

    if (!(await this.storage.notificationsEnabled())) {
      console.log('[Notif] disabled in app settings');
      return;
    }

    const perm = await LocalNotifications.checkPermissions();
    if (perm.display !== 'granted') {
      console.warn('[Notif] OS permission denied');
      return;
    }

    const tasks = (await this.storage.getTasks()) ?? [];
    const now = Date.now();
    let scheduled = 0;

    // Immediate catch-up for overdue tasks (one per module)
    if (fireOverdueNow) {
      const latestOverdueByModule = new Map<string, Task>();
      for (const t of tasks) {
        if (t.hidden) continue;
        if (t.completed) continue;
        if (!this.studyTasks.checkTaskIsUnlocked(t, tasks)) continue;

        const ms = new Date(t.time).getTime();
        if (ms > now) continue;

        const prev = latestOverdueByModule.get(t.uuid);
        if (!prev || new Date(prev.time).getTime() < ms) {
          latestOverdueByModule.set(t.uuid, t);
        }
      }

      for (const t of latestOverdueByModule.values()) {
        if (scheduled >= this.MAX_SCHEDULE) break;
        console.log(`[Notif] immediate catch-up for overdue ${t.task_id}`);
        await this.scheduleImmediatePing(t);
        scheduled++;
      }
    }

    // Future notifications (base + optional reminders)
    const now2 = Date.now();
    for (const t of tasks) {
      if (t.completed) continue;
      if (t.hidden) continue;
      if (!this.studyTasks.checkTaskIsUnlocked(t, tasks)) continue;
      if (scheduled >= this.MAX_SCHEDULE) break;

      const baseMs = new Date(t.time).getTime();

      if (!t.sticky) {
        // Non-sticky: only schedule if the task time is in the future
        if (baseMs <= now2) continue;

        console.log(`[Notif] scheduling base ${t.task_id} @ ${t.time}`);
        await this.scheduleNotification(t);
        scheduled++;
        continue;
      }

      // Sticky:
      if (baseMs > now2) {
        // Base time still in the future → schedule base + reminders
        console.log(`[Notif] scheduling base (sticky) ${t.task_id} @ ${t.time}`);
        await this.scheduleNotification(t);
        scheduled++;

        if (scheduled < this.MAX_SCHEDULE) {
          const room = this.MAX_SCHEDULE - scheduled;
          const added = await this.scheduleStickyReminders(t, room);
          scheduled += added;
        }
      } else {
        // Base time already passed → schedule *reminders only* that are still in the future
        if (scheduled < this.MAX_SCHEDULE) {
          const room = this.MAX_SCHEDULE - scheduled;
          const added = await this.scheduleStickyReminders(t, room);
          if (added > 0) {
            console.log(`[Notif] scheduled ${added} sticky reminders for overdue ${t.task_id}`);
          }
          scheduled += added;
        }
      }
    }

    const pendingCount = (await this.getPending()).length;
    console.log(`[Notif] pending after schedule: ${pendingCount}`);
  }

  /** Combine Y-M-D from base with HH:mm string. */
  private combineDateWithHM(base: Date, hm: string): Date {
    const [h, m] = (hm || '').split(':').map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return new Date(base);
    const d = new Date(base);
    d.setHours(h, m, 0, 0);
    return d;
  }
}