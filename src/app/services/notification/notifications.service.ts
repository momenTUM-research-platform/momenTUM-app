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
  private readonly MAX_SCHEDULE = 30;
  
  private deliveredSub = new Subject<void>();

  public onDelivered$ = this.deliveredSub.asObservable();

  constructor(
    private storage: StorageService,
    private studyTasks: StudyTasksService,
    private router: Router,
    private ngZone: NgZone
  ) {
    // Auto-start: ask for permissions, create channel, and hook tap-handler
    this.initialize();

    // listen for delivery (fired when a local notification actually appears)
    LocalNotifications.addListener(
      'localNotificationReceived',
      () => {
        // run inside Angular zone so subscribers see the update
        this.ngZone.run(() => {
          console.log('[Notif] → delivered one');
          this.deliveredSub.next();
        });
      }
    );
  }

  /**
   * 1) Ask OS for notification permission
   * 2) Create Android channel
   * 3) Wire up tap handler
   */
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

  /** Ask the user (iOS & Android 13+) for notification permission */
  public async requestPermissions(): Promise<void> {
    const perm = await LocalNotifications.checkPermissions();
    if (perm.display !== 'granted') {
      await LocalNotifications.requestPermissions();
    }
  }

  /**
   * When the user taps a notification:
   * └─ we read both task_id and task_type and navigate accordingly
   * └─ run inside Angular’s zone so the UI actually updates
   */
  private addListenerOnClick(): void {
    LocalNotifications.removeAllListeners();
    LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (action: ActionPerformed) => {
        const extra = action.notification.extra as {
          task_id?: string;
          task_type?: 'survey' | 'pvt';
        };
        const id   = extra.task_id;
        const type = extra.task_type;

        if (!id) {
          return; // nothing to navigate to
        }

        this.ngZone.run(() => {
          if (type === 'pvt') {
            // route into your PVT page
            this.router.navigateByUrl(`/pvt/${id}`);
          } else {
            // default to survey
            this.router.navigateByUrl(`/survey/${id}`);
          }
        });
      }
    );
  }

  /**
   * Schedule one notification.
   * autoCancel: true → clears only that one when tapped
   */
  public async scheduleNotification(task: Task): Promise<void> {
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
              task_id:   task.task_id,
              task_type: task.type
            },
            ongoing:    false,
            autoCancel: true,
            channelId:  this.CHANNEL_ID,
            schedule: {
              at:              new Date(task.time),
              allowWhileIdle:  true,
            },
          },
        ],
      });
    } catch (err) {
      console.error('Failed to schedule notification for task', task.task_id, err);
    }
  }

  /**
   * Cancel *only* pending notifications.
   * Delivered ones remain in the shade until the user taps them.
   */
  public async cancelAll(): Promise<void> {
    const pending = await this.getPending();
    if (pending.length) {
      await LocalNotifications.cancel({
        notifications: pending.map((n) => ({ id: n.id })),
      } as CancelOptions);
    }
  }

  /** Return the array of pending (scheduled but not yet delivered) notifications */
  public async getPending(): Promise<LocalNotificationSchema[]> {
    const { notifications } = await LocalNotifications.getPending();
    return notifications.map((p: PendingLocalNotificationSchema) => ({
      id:       p.id,
      title:    p.title,
      body:     p.body,
      schedule: p.schedule,
      extra:    p.extra,
    }));
  }

  /**
   * Main entry: clear pending, then schedule up to MAX_SCHEDULE future alerts
   * for any unlocked tasks whose time is still in the future.
   */
  public async setNext30Notifications(): Promise<void> {
    console.log('[Notif] setNext30Notifications');
    await this.cancelAll();

    if (!(await this.storage.notificationsEnabled())) {
      console.log('[Notif] in-app notifications disabled');
      return;
    }

    const perm = await LocalNotifications.checkPermissions();
    if (perm.display !== 'granted') {
      console.warn('[Notif] OS permission denied');
      return;
    }

    const tasks     = (await this.storage.getTasks()) ?? [];
    let scheduled   = 0;
    const now       = Date.now();

    for (const t of tasks) {
      const ms = new Date(t.time).getTime();
      if (ms <= now) continue;
      if (!this.studyTasks.checkTaskIsUnlocked(t, tasks)) continue;

      console.log(`[Notif] scheduling ${t.task_id} @ ${t.time}`);
      await this.scheduleNotification(t);
      if (++scheduled >= this.MAX_SCHEDULE) break;
    }

    console.log(`[Notif] pending after schedule: ${(await this.getPending()).length}`);
  }
}