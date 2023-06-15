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
import { Task } from 'src/app/interfaces/types';
import moment from 'moment';
import { Route, Router } from '@angular/router';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    private storage: StorageService,
    private studyTasksService: StudyTasksService,
    private router: Router,
    private dataService: DataService
  ) {}

  /**
   * Adds a listener to a notification click.
   * Navigates the user to the right task.
   * Logs the noticification-click.
   * @param notificationAction The event that triggered this handler function.
   */
  async addListenerOnClick() {
    LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (notificationAction: ActionPerformed) => {
        // log that the user clicked on this notification
        const logEvent = {
          timestamp: moment().format(),
          milliseconds: moment().valueOf(),
          page:
            'notification-' +
            moment(notificationAction.notification.extra.task_time).format(),
          event: 'click',
          module_index: notificationAction.notification.extra.task_index,
        };
        this.dataService.logPageVisitToServer(logEvent);
        this.router.navigate([
          'survey/' + notificationAction.notification.extra.task_id,
        ]);
      }
    );
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
    if (!status.endsWith('granted')) {
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
