import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Study } from 'src/app/interfaces/study';
import { LogEvent, Response } from 'src/app/interfaces/types';
import { UuidService } from '../uuid/uuid.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private nStorage: Storage;

  constructor(private storage: Storage, private uuidService: UuidService) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.nStorage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    return await this.nStorage.set(key, value);
  }

  public async get(key: string): Promise<any> {
    return await this.nStorage.get(key);
  }

  async removeItem(key: string) {
    return await this.nStorage.remove(key);
  }

  async clear() {
    return await this.nStorage.clear();
  }

  async keys() {
    return await this.nStorage.keys();
  }

  /**
   * Saves a Response to the local storage.
   * @param response The response to be saved.
   * @returns A Promise that resolves when the response is stored.
   */
  async saveResponse(response: Response) {
    const key = 'responses';
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
    const key = 'current-study';
    const value = JSON.stringify(study);
    await this.nStorage.set(key, value);

    // save the enrolment-date
    await this.nStorage.set('enrolment-date', new Date());

    // generate and save UUID for user
    const uuid = this.uuidService.generateUUID('');
    await this.nStorage.set('uuid', uuid);
    await this.nStorage.set('uuid-set', true);
    await this.nStorage.set('notifications-enabled', true);
  }

  /**
   * Saves a Log object to the local storage.
   * @param log The log to be stored.
   * @returns A Promise that resolves when the log is stored.
   */
  async saveLog(log: LogEvent) {
    const key = 'logs';
    const logs = await this.nStorage.get(key);
    logs.push(log);
    return await this.nStorage.set(key, logs);
  }

  /**
   * Saves the participants condition to the local storage.
   * @param condition The condition to be stored
   */
  async saveCondition(condition: string) {
    const key = 'condition';
    this.nStorage.set(key, condition);
  }

  /**
   * Retrieves the currently enrolled in study object from the storage.
   * @returns The study in which the participant is currently enrolled in. If there is none,
   */
  async getStudy(): Promise<Study> {
    const str = await this.nStorage.get('current-study');
    if (str === null) {
      return null;
    }
    const study = JSON.parse(str);
    return study as Study;
  }
}
