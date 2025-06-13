import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Task } from 'src/app/interfaces/types';
import { RRule } from 'rrule';
import { Alerts } from 'src/app/interfaces/study';

@Injectable({
  providedIn: 'root',
})
export class StudyTasksService {
  constructor(private storageService: StorageService) {}

  /**
   * Generates dates for tasks based on the new 'repeat' and 'interval' fields,
   * and logs the resulting dates for debugging.
   */
  private generateTaskDates(alerts: Alerts): Date[] {
    if (!alerts.startDateTime) {
      console.log('generateTaskDates: no startDateTime, returning []');
      return [];
    }
    const dtstart = new Date(alerts.startDateTime);

    if (alerts.repeat === 'never') {
      console.log('generateTaskDates (never):', dtstart);
      return [dtstart];
    }

    const ruleOptions: any = {
      dtstart,
      freq: RRule[alerts.repeat.toUpperCase()],
      interval: alerts.interval ?? 1,
      until: alerts.until ? new Date(alerts.until) : undefined,
    };

    if (alerts.repeat === 'weekly') {
      const weekdays = ['SU','MO','TU','WE','TH','FR','SA'];
      ruleOptions.byweekday = [RRule[weekdays[dtstart.getUTCDay()]]];
    } else if (alerts.repeat === 'monthly') {
      ruleOptions.bymonthday = [dtstart.getUTCDate()];
    } else if (alerts.repeat === 'yearly') {
      ruleOptions.bymonth = [dtstart.getUTCMonth() + 1];
      ruleOptions.bymonthday = [dtstart.getUTCDate()];
    }

    const rule = new RRule(ruleOptions);
    const allDates = rule.all((_, i) => i < 30);
    console.log('generateTaskDates (' + alerts.repeat + '):', allDates);
    return allDates;
  }

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
        const dates = this.generateTaskDates(mod.alerts);
        let stickyCount = 0;

        for (const taskTime of dates) {
          const scheduledTime = new Date(taskTime);
          if (mod.alerts.random) {
            scheduledTime.setMinutes(scheduledTime.getMinutes() - mod.alerts.randomInterval);
            const randomOffset = Math.random() * (mod.alerts.randomInterval * 2);
            scheduledTime.setMinutes(scheduledTime.getMinutes() + randomOffset);
          }
          const localeOpts = {
            weekday: 'short', year: 'numeric', month: 'long',
            day: 'numeric', hour: 'numeric', minute: 'numeric'
          } as const;

          const taskObj: Task = {
            uuid: mod.id,
            index: i,
            task_id: String(task_id++),
            name: mod.name,
            type: mod.params.type,
            hidden: !(mod.alerts.sticky && stickyCount === 0),
            unlock_after: mod.unlock_after || [],
            sticky: mod.alerts.sticky,
            sticky_label: mod.alerts.stickyLabel,
            alert_title: mod.alerts.title,
            alert_message: mod.alerts.message,
            timeout: mod.alerts.timeout,
            timeout_after: mod.alerts.timeoutAfter,
            time: scheduledTime.toString(),
            locale: scheduledTime.toLocaleString('en-US', localeOpts),
            completed: false,
          };
          tasks.push(taskObj);
          stickyCount++;
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
    return todos;
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
