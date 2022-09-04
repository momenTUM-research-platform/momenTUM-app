import { Injectable } from '@angular/core';
import { Plugin } from '@capacitor/core';
import { Task } from '../../models/types';
import { StorageService } from '../storage/storage.service';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';


@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    private storage: StorageService,
    private localNotificatins: LocalNotifications
  ) {}

  /**
   * Schedules a notification, taking parameters from a task
   *
   * @param task The task that the notification is for
   */
  scheduleDummyNotification() {
    this.localNotificatins.schedule({
      title: 'Hello',
      text: 'World',
      foreground: true,
      trigger: { at: new Date(new Date().getTime() + 10000) },
      smallIcon: 'res://notification_icon',
      icon: 'res//notification_icon',
      data: { task_index: 0 },
      launch: true,
      wakeup: true,
      priority: 2,
    });
  }

  /**
   * Schedules a notification, takoing parameters from a task
   *
   * @param task The task that the notification is for
   */
  scheduleNotification(task: Task) {
    this.localNotificatins.schedule({
      id: task.task_id,
      title: task.alert_title,
      text: task.alert_message,
      foreground: true,
      trigger: { at: new Date(Date.parse(task.time)) },
      smallIcon: 'res://notification_icon',
      icon: 'res//notification_icon',
      data: {
        task_index: task.index,
        task_id: task.task_id,
        task_time: task.time,
      },
      launch: true,
      wakeup: true,
      priority: 2,
    });
  }

  /**
   * Cancels all notifications that have been set
   */
  cancelAllNotifications() {
    this.localNotificatins.cancelAll();
  }

  /**
   * Sets the next 30 notifications based on the next 30 tasks
   */
  async setNext30Notifications() {
    await this.localNotificatins.cancelAll();

    const notificationsEnabled = await this.storage.get(
      'notifications-enabled'
    );

    if (notificationsEnabled) {
      const tasks: Task[] = JSON.parse((await this.storage.get('study-tasks')).toString());
      if (tasks !== null) {
        let alertCount = 0;
        for (const task of tasks) {
          const alertTime = new Date(Date.parse(task.time));

          if (alertTime > new Date()) {
            if (this.checkTaskIsUnlocked(task, tasks)) {
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

    /*LocalNotifications.cancelAll().then(() => {
      this.storage.get('notifications-enabled').then(notificationsEnabled => {
        if (notificationsEnabled) {
          this.storage.get('study-tasks').then((tasks) => {
            if (tasks !== null) {
              var alertCount = 0;
              for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                var alertTime = new Date(Date.parse(task.time));

                if (alertTime > new Date()) {
                  if (this.checkTaskIsUnlocked(task, tasks)) {
                    this.scheduleNotification(task);
                    alertCount++;
                  }
                }

                // only set 30 alerts into the future
                if (alertCount === 30) break;
              }
            }
          });
        }
      });
    });*/
  }

  /**
   *
   * @param task
   * @param study_tasks
   */
  checkTaskIsUnlocked(task: Task, study_tasks: Task[]) {
    // get a set of completed task uuids
    const completedUUIDs = new Set();
    for (const t of study_tasks) {
      if (t.completed) {
        completedUUIDs.add(t.uuid);
      }
    }

    // get the list of prereqs from the task
    const prereqs = task.unlock_after;
    let unlock = true;
    for (const prereq of prereqs) {
      if (!completedUUIDs.has(prereq)) {
        unlock = false;
        break;
      }
    }

    return unlock;
  }
}
