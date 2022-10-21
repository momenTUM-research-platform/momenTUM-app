import { Injectable } from '@angular/core';
import {
  Attachment,
  LocalNotifications,
  LocalNotificationSchema,
  Channel,
  ScheduleEvery,
  CancelOptions,
  PendingLocalNotificationSchema,
  ListChannelsResult,
  ActionPerformed,
} from '@capacitor/local-notifications';
import { StorageService } from '../storage/storage.service';
import { StudyTasksService } from '../study-task/study-tasks.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    private storage: StorageService,
    private studyTasksService: StudyTasksService
  ) {}

  async createChannel(channel: Channel): Promise<void> {
    return await LocalNotifications.createChannel(channel);
  }

  async deleteChannel(channel: Channel): Promise<void> {
    return await LocalNotifications.deleteChannel(channel);
  }

  async listChannels(): Promise<ListChannelsResult> {
    return await LocalNotifications.listChannels();
  }

  async fireQueuedEvents() {
    // To be implmented
    // Fire queued events once the device is ready and all listeners are registered.
    // throw new Error('Feature to fire queued events not available.');
  }

  async addListenerOnClick(listenerFunction: any) {
    LocalNotifications.addListener(
      'localNotificationActionPerformed',
      listenerFunction
    );
  }

  showLocalNotification(
    title: string,
    body: string,
    at: Date,
    smallIcon: string,
    largeIcon: string,
    largeBody: string,
    summaryText: string,
    attachments: Attachment[],
    extra: any,
    ongoing: boolean,
    autoCancel: boolean,
    id: number = Math.floor(Math.random() * 1000) + 1,
    repeats: boolean,
    every: ScheduleEvery,
    count: number,
    on: any
  ): void {
    LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id,
          smallIcon,
          largeIcon,
          largeBody,
          summaryText,
          attachments,
          extra,
          ongoing,
          autoCancel,
          schedule: {
            at,
            repeats,
            every,
            count,
            on,
          },
        },
      ],
    });
  }

  /**
   * Schedules a notification, takoing parameters from a task
   *
   * @param task The task that the notification is for
   */
  scheduleNotification(task: Task) {
    LocalNotifications.schedule({
      notifications: [
        {
          title: task.alert_title,
          body: task.alert_message,
          id: task.task_id,
          smallIcon: 'res://notification_icon',
          largeIcon: 'res//notification_icon',
          largeBody: task.alert_message,
          summaryText: task.alert_title,
          extra: {
            task_index: task.index,
            task_id: task.task_id,
            task_time: task.time,
          },
          ongoing: false,
          autoCancel: false,
          schedule: {
            at: new Date(Date.parse(task.time)),
          },
        },
      ],
    });
  }

  /**
   * Cancels all notifications that have been set
   */
  async cancelAll(): Promise<void> {
    LocalNotifications.removeAllDeliveredNotifications();
    const pendingNotifications = await this.getPending();
    if (pendingNotifications != null) {
      const cancelOptions: CancelOptions = {
        notifications: pendingNotifications,
      };
      LocalNotifications.cancel(cancelOptions);
    }
  }

  /**
   * Get a list of pending notifications.
   */
  async getPending(): Promise<LocalNotificationSchema[]> {
    const pendingList: PendingLocalNotificationSchema[] = await (
      await LocalNotifications.getPending()
    ).notifications;
    if (pendingList != null) {
      return null;
    } else {
      return pendingList as LocalNotificationSchema[];
    }
  }

  /**
   * Request permissions for notifications
   */
  async requestPermissions() {
    const status: string = (await LocalNotifications.checkPermissions())
      .display;
    console.log('Status is: ' + status);
    if (status.endsWith('granted')) {
      // Do nothing
    } else {
      await LocalNotifications.requestPermissions();
    }
  }

  /**
   * Sets the next 30 notifications based on the next 30 tasks
   */
  async setNext30Notifications() {
    await this.cancelAll();

    const notificationsEnabled = await this.storage.get(
      'notifications-enabled'
    );

    if (notificationsEnabled) {
      const storage_tasks: any = await this.storage.get('study-tasks');
      const tasks: Task[] = JSON.parse(storage_tasks);
      if (tasks !== null) {
        let alertCount = 0;
        for (const task of tasks) {
          const alertTime = new Date(Date.parse(task.time));

          if (alertTime > new Date()) {
            if (this.studyTasksService.checkTaskIsUnlocked(task, tasks)) {
              this.scheduleNotification(task);
              alertCount++;
            }
          }

          // only set 30 alerts into the future
          if (alertCount === 30) {
            break;
          }
        }
      }
    }
  }
}
