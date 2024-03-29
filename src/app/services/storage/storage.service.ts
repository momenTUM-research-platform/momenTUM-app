import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Module, Study } from 'src/app/interfaces/study';
import { Log, Response, Task } from 'src/app/interfaces/types';
import { UuidService } from '../uuid/uuid.service';

/**
 * This service was implemented using ionic/storage-angular.
 * Please read the documentation of [ionic/storage-angular](https://github.com/ionic-team/ionic-storage)
 * for further information.
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private nStorage: Storage;
  readonly keys = {
    study: 'current-study',
    tasks: 'study-tasks',
    responses: 'responses',
    logs: 'logs',
    enrolment_date: 'enrolment-date',
    uuid: 'uuid',
    uuid_set: 'uuid-set',
    condition: 'condition',
    notifications_enabled: 'notifications_enabled',
  };

  constructor(private storage: Storage, private uuidService: UuidService) {
    this.init();
  }

  /**
   * Initializes the storage.
   */
  async init() {
    const storage = await this.storage.create();
    this.nStorage = storage;
  }

  /**
   * Removes everything from the local storage.
   */
  async clear() {
    return await this.nStorage.clear();
  }

  /**
   * Gets all current keys which hold a value in the local storage.
   * @returns A list of keys.
   */
  async getKeys() {
    return await this.nStorage.keys();
  }

  /**
   * Saves the complete task list to the local storage.
   * @param tasks The tasks to be stored.
   */
  async saveTasks(tasks: Task[]) {
    const key = this.keys.tasks;
    const value = JSON.stringify(tasks);
    await this.nStorage.set(key, value);
  }

  /**
   * Saves a task in the storage.
   * If a task with the same task_id exists, it will be overwritten.
   * @param taskID The task to be stored.
   */
  async saveTask(task: Task) {
    const tasks = await this.getTasks();
    let index = 0;
    for (const t of tasks) {
      if (t.task_id === task.task_id) {
        tasks[index] = task;
        this.saveTasks(tasks);
        return;
      }
      index++;
    }
    tasks.push(task);
    this.saveTasks(tasks);
  }

  /**
   * Saves a Response to the local storage.
   * @param response The response to be saved.
   * @returns A Promise that resolves when the response is stored.
   */
  async saveResponse(response: Response) {
    const key = this.keys.responses;
    const responses = await this.nStorage.get(key);
    responses.push(response);
    return await this.nStorage.set(key, responses);
  }

  /**
   * Saves a Study object to the local storage.
   * @param study The study to be stored.
   * @returns A Promise that resolves when the study is stored
   */
  async saveStudy(study: Study) {
    // save the study object as JSON string
    let key = this.keys.study;
    const value = JSON.stringify(study);
    await this.nStorage.set(key, value);

    // generate and save UUID for user
    key = this.keys.uuid;
    const uuid = this.uuidService.generateUUID('');
    await this.nStorage.set(key, uuid);

    key = this.keys.uuid_set;
    await this.nStorage.set(key, true);
  }

  /**
   * Saves a Log object to the local storage.
   * @param log The log to be stored.
   * @returns A Promise that resolves when the log is stored.
   */
  async saveLog(log: Log) {
    const key = this.keys.logs;
    const logs = await this.nStorage.get(key);
    logs.push(log);
    return await this.nStorage.set(key, logs);
  }

  /**
   * Saves the participants condition to the local storage.
   * @param condition The condition to be stored
   */
  async saveCondition(condition: string) {
    const key = this.keys.condition;
    this.nStorage.set(key, condition);
  }

  /**
   *
   * @param date The date of enrolment
   */
  async setEnrolmentDate(date: Date) {
    const key = this.keys.enrolment_date;
    await this.nStorage.set(key, new Date());
  }

  /**
   *
   * @param value The value to which the notifications-enabled flag should be set to.
   */
  async setNotificationsEnabled(value: boolean) {
    const key = this.keys.notifications_enabled;
    await this.nStorage.set(key, value);
  }

  /**
   * Retrieves the currently enrolled in study object from the storage.
   * @returns The study in which the participant is currently enrolled in.
   * If there is none, it returns null.
   */
  async getStudy(): Promise<Study> {
    const key = this.keys.study;
    const str = await this.nStorage.get(key);
    if (str === null) return null;
    const study = JSON.parse(str);
    return study as Study;
  }

  /**
   *
   * @returns The enrolment date as Date object
   */
  async getEnrolmentDate(): Promise<Date> {
    const key = this.keys.enrolment_date;
    const enrolment_date = await this.nStorage.get(key);
    return enrolment_date as Date;
  }

  /**
   * Retrieves all tasks from the storage.
   * @returns An array containing all tasks.
   * If there is none, it returns null.
   */
  async getTasks(): Promise<Task[]> {
    const key = this.keys.tasks;
    const str = await this.nStorage.get(key);
    if (str === null) return null;
    const tasks = JSON.parse(str);
    return tasks as Task[];
  }

  /**
   * Retrieves the UUID that has been given to the participant from the storage.
   * @returns A string containing the UUID.
   * If there is none, it returns null.
   */
  async getUuid(): Promise<string> {
    const key = this.keys.uuid;
    const uuid = await this.nStorage.get(key);
    return uuid;
  }

  /**
   * Gets a task by its task_id from the local storage.
   * @returns The task object if found, else null.
   */
  async getTaskByID(task_id: string): Promise<Task> {
    const key = this.keys.tasks;
    const str = await this.nStorage.get(key);
    if (str === null) return null;
    const tasks = JSON.parse(str);
    for (const task of tasks) {
      if (task.task_id === task_id) return task as Task;
    }
    throw new Error('TaskNotFoundError');
  }

  /**
   * Gets the module params for the module with the matching ID from the study in the local storage.
   * @returns The params object if found, else null.
   */
  async getModuleByID(ID: string): Promise<Module> {
    const key = this.keys.study;
    const str = await this.nStorage.get(key);
    if (str === null) return null;
    const study = JSON.parse(str) as Study;
    for (const module of study.modules) {
      if (module.id === ID) return module as Module;
    }
    throw new Error('ModuleNotFoundError');
  }

  /**
   * @returns A boolean value indicating whether the notifications have are enabled or not.
   */
  async notificationsEnabled() {
    const key: string = this.keys.notifications_enabled;
    const notificationsEnabled: boolean = await this.nStorage.get(key);
    return notificationsEnabled;
  }

  /**
   *
   * @returns An array containing all the pending responses.
   */
  async getPendingResponses() {
    const key = this.keys.responses;
    const responses: Response[] = await this.nStorage.get(key);
    return responses;
  }

  /**
   *
   * @returns An array containing all the pending logs.
   */
  async getPendingLogs() {
    const key = this.keys.logs;
    const logs: Log[] = await this.nStorage.get(key);
    return logs;
  }

  /**
   * Retrieves the parameters of a specific module through a given task id.
   * @param taskID
   */
  async getModuleParamsByTaskId(taskID: string) {
    const task: Task = await this.getTaskByID(taskID);
    const moduleID = task.uuid;
    const module: Module = await this.getModuleByID(moduleID);
    return module.params;
  }
}
