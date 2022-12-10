import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { LoadingService } from '../loading/loading-service.service';

@Injectable({
  providedIn: 'root',
})
export class StudyTasksService {
  constructor(
    private storageService: StorageService,
    private loadingService: LoadingService
  ) {}

  /**
   * Creates a list of tasks (e.g. surveys, interventions) based on their
   * alert schedules
   *
   * @param studyObject A JSON object that contains all data about a study
   */
  async generateStudyTasks(studyObject: Study) {
    // allocate the participant to a study condition
    const min = 1;
    const max: number = studyObject.properties.conditions.length;
    const condition_index: number =
      Math.floor(Math.random() * (max - min + 1)) + min - 1;
    const condition: string =
      studyObject.properties.conditions[condition_index];

    const study_tasks: Task[] = new Array();

    // the ID for a task. Is this a sensible starting point?
    let task_ID = 101;

    // loop through all of the modules in this study
    // and create the associated study tasks based
    // on the alert schedule
    for (const [i, mod] of studyObject.modules.entries()) {
      // if the module is assigned to the participant's condition
      // add it to the list, otherwise just skip it
      if (mod.condition === condition || mod.condition === '*') {
        const module_uuid = mod.id;
        const module_duration = mod.alerts.duration;
        const module_offset = mod.alerts.start_offset;
        const module_unlock_after =
          mod.unlock_after === undefined ? [] : mod.unlock_after;
        const module_random = mod.alerts.random;
        const module_sticky = mod.alerts.sticky;
        const module_sticky_label = mod.alerts.sticky_label;
        const module_timeout = mod.alerts.timeout;
        const module_timeout_after = mod.alerts.timeout_after;
        const module_randomInterval = mod.alerts.random_interval;
        const module_times = mod.alerts.times;
        const alert_title = mod.alerts.title;
        const alert_message = mod.alerts.message;

        const typeToIcon: { [type: string]: string } = {
          survey: 'checkmark-circle-outline',
          video: 'film-outline',
          audio: 'headset-outline',
          info: 'bulb-outline',
          pvt: 'alarm-outline',
        };
        const module_type = typeToIcon[mod.type] || 'default';

        const module_name = mod.name;
        const module_index = i;

        const startDay = new Date(); // set a date object for today
        startDay.setHours(0, 0, 0, 0); // set the time to midnight

        // add offset days to get first day of alerts
        startDay.setDate(startDay.getDate() + module_offset);

        // counter to be used when scheduling sticky tasks with notifications
        let sticky_count = 0;

        for (let numDays = 0; numDays < module_duration; numDays++) {
          // for each alert time, get the hour and minutes and if necessary randomise it
          module_times.forEach((module) => {
            const taskTime = new Date(startDay.getTime());
            taskTime.setHours(module.hours);
            taskTime.setMinutes(module.minutes);

            if (module_random) {
              // remove the randomInterval from the time
              taskTime.setMinutes(
                taskTime.getMinutes() - module_randomInterval
              );

              // calc a random number between 0 and (randomInterval * 2)
              // to account for randomInterval either side
              const randomMinutes = Math.random() * (module_randomInterval * 2);

              // add the random number of minutes to the dateTime
              taskTime.setMinutes(taskTime.getMinutes() + randomMinutes);
            }

            // create a task object
            const options = {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            } as const;
            const task_obj: Task = {
              uuid: module_uuid,
              index: module_index,
              task_id: task_ID,
              name: module_name,
              type: module_type,
              hidden: !(module_sticky && sticky_count === 0),
              unlock_after: module_unlock_after,
              sticky: module_sticky,
              sticky_label: module_sticky_label,
              alert_title,
              alert_message,
              timeout: module_timeout,
              timeout_after: module_timeout_after,
              time: taskTime.toString(),
              locale: taskTime.toLocaleString('en-US', options),
              completed: false,
            };

            study_tasks.push(task_obj);

            // increment task id
            task_ID++;

            // increment the sticky count
            sticky_count++;
          });

          // as a final step increment the date by 1 to set for next day
          startDay.setDate(startDay.getDate() + 1);
        }
      }
    }

    study_tasks.sort((a: Task, b: Task) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);

      return dateA.getTime() - dateB.getTime();
    });

    // save tasks and condition to storage
    this.storageService.set('condition', condition);
    // show loading bar
    this.loadingService.isCaching = false;
    this.loadingService.present('Loading...');
    await this.storageService.set('study-tasks', JSON.stringify(study_tasks));
    this.loadingService.dismiss();
    return study_tasks;
  }

  /**
   * Returns all the tasks that have been created for a study
   */
  async getAllTasks(): Promise<Task[]> {
    const tasks: any = await this.storageService.get('study-tasks');
    const task_list: Task[] = JSON.parse(tasks);
    return task_list;
  }

  /**
   * Gets the tasks that are currently available for the user to complete
   */
  async getTaskDisplayList(): Promise<Task[]> {
    const storage_tasks: any = await this.storageService.get('study-tasks');
    const study_tasks: Task[] = JSON.parse(storage_tasks);
    let tasks_to_display = [];
    const sticky_tasks = [];
    const time_tasks = [];
    let last_header = '';
    for (const task of study_tasks) {
      // check if task has a pre_req
      const unlocked = this.checkTaskIsUnlocked(task, study_tasks);
      const alertTime = new Date(Date.parse(task.time));
      const now = new Date();

      if (now > alertTime && unlocked) {
        if (task.sticky) {
          if (!task.hidden) {
            if (last_header !== task.sticky_label) {
              // push a new header into the sticky_tasks array
              const header = { type: 'header', label: task.sticky_label };
              sticky_tasks.push(header);
              last_header = task.sticky_label;
            }
            // push the sticky task
            sticky_tasks.push(task);
          }
        } else {
          // check if task is set to timeout
          if (task.timeout) {
            let timeoutTime = new Date(Date.parse(task.time));
            timeoutTime = new Date(timeoutTime.getTime() + task.timeout_after);

            if (now < timeoutTime && !task.completed) {
              time_tasks.push(task);
            }
          } else if (!task.completed) {
            time_tasks.push(task);
          }
        }
      }
    }
    // reverse the time_tasks list so newest is displayed first
    if (time_tasks.length > 0) {
      time_tasks.reverse();
      const header_1 = { type: 'header', label: 'Recent' };
      time_tasks.unshift(header_1);
    }
    // merge the time_tasks array with the sticky_tasks array
    tasks_to_display = time_tasks.concat(sticky_tasks);
    // return the tasks list reversed to ensure correct order
    return tasks_to_display.reverse();
  }

  /**
   *
   * @param task
   * @param study_tasks
   */
  checkTaskIsUnlocked(task: Task, study_tasks: Task[]) {
    // get a set of completed task uuids
    const completedUUIDs = new Set();
    for (const study_task of study_tasks) {
      if (study_task.completed) {
        completedUUIDs.add(study_task.uuid);
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
