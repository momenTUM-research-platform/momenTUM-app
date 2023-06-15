import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { LoadingService } from '../loading/loading-service.service';
import { Study } from 'src/app/interfaces/study';
import { Task } from 'src/app/interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class StudyTasksService {
  constructor(
    private storageService: StorageService,
    private loadingService: LoadingService
  ) {}

  /**
   * Generates all the tasks (interventions) from the study.
   * - assigns the current participant to one of the random conditions.
   * - iterates through all modules and
   *
   * @param study A JSON object that contains all data about a study
   */
  async generateStudyTasks() {
    // get study from storage
    const study = await this.storageService.getStudy();
    if (study === null) return;

    // allocate the participant to a study condition
    const conditions = study.properties.conditions;
    const random_index = Math.floor(Math.random() * conditions.length);
    const condition: string = conditions[random_index];
    this.storageService.saveCondition(condition);

    // generate study tasks
    const tasks: Task[] = [];
    let task_id = 101;

    for (const [i, mod] of study.modules.entries()) {
      if (mod.condition === condition || mod.condition === '*') {
        const module_duration = mod.alerts.duration;
        const module_offset = mod.alerts.start_offset;
        const module_random = mod.alerts.random;
        const module_randomInterval = mod.alerts.random_interval;
        const module_times = mod.alerts.times;
        const typeToIcon: { [type: string]: string } = {
          survey: 'checkmark-circle-outline',
          video: 'film-outline',
          audio: 'headset-outline',
          info: 'bulb-outline',
          pvt: 'alarm-outline',
        };
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
              uuid: mod.id,
              index: i,
              task_id: task_id,
              name: mod.name,
              type: typeToIcon[mod.body.type] || 'default',
              hidden: !(mod.alerts.sticky && sticky_count === 0),
              unlock_after:
                mod.unlock_after === undefined ? [] : mod.unlock_after,
              sticky: mod.alerts.sticky,
              sticky_label: mod.alerts.sticky_label,
              alert_title: mod.alerts.title,
              alert_message: mod.alerts.message,
              timeout: mod.alerts.timeout,
              timeout_after: mod.alerts.timeout_after,
              time: taskTime.toString(),
              locale: taskTime.toLocaleString('en-US', options),
              completed: false,
            };

            tasks.push(task_obj);

            // increment task id
            task_id++;

            // increment the sticky count
            sticky_count++;
          });

          // as a final step increment the date by 1 to set for next day
          startDay.setDate(startDay.getDate() + 1);
        }
      }
    }

    // sort the tasks
    tasks.sort((a: Task, b: Task) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);

      return dateA.getTime() - dateB.getTime();
    });

    // save the tasks
    await this.storageService.saveTasks(tasks);
  }

  /**
   * Returns all the tasks that have been created for a study
   */
  async getAllTasks(): Promise<Task[]> {
    const tasks: Task[] = await this.storageService.getTasks();
    return tasks;
  }

  /**
   * Gets the tasks that are currently available for the user to complete
   */
  async getToDos(): Promise<Task[]> {
    const tasks: Task[] = await this.storageService.getTasks();
    let todos = [];
    const sticky_tasks = [];
    const time_tasks = [];
    let last_header = '';
    for (const task of tasks) {
      // check if task has a pre_req
      const unlocked = this.checkTaskIsUnlocked(task, tasks);
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
    todos = time_tasks.concat(sticky_tasks);
    // return the tasks list reversed to ensure correct order
    return todos.reverse();
  }

  /**
   * Checks if this task has already been unlocked.
   * A task is unlocked, once all the required tasks are completed.
   *
   * @param task
   * @param taskList
   */
  checkTaskIsUnlocked(task: Task, taskList: Task[]) {
    // get a set of completed task uuids
    const completedUUIDs = new Set();
    for (const study_task of taskList) {
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
