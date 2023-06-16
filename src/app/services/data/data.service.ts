import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StudyTasksService } from '../study-tasks/study-tasks.service';
import { UuidService } from '../uuid/uuid.service';
import { Http } from '@capacitor-community/http';
import { StorageService } from '../storage/storage.service';
import { Log, Response } from 'src/app/interfaces/types';
import { Study } from 'src/app/interfaces/study';
import { post } from 'cypress/types/jquery';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private storage: StorageService) {}

  /**
   * Downloads a study from a remote URL.
   * Checks if the downloaded object is a valid study.
   *
   * @param url The web URL where a study is hosted.
   * @returns A Promise that resolves if the study is valid.
   * If the study is invalid it throws an InvalidStudyError.
   * If the link is invalid it throws an HTTP error.
   */
  async downloadStudy(url: string): Promise<Study> {
    // TODO: implement this function
    function isValidStudy(object: any): object is Study {
      return true;
    }

    const options = {
      url: url,
      headers: {},
      connectTimeout: 60000,
    };

    // HTTP GET request
    const result = await Http.get(options);
    const object = result.data;
    if (isValidStudy(object)) return object;
    else throw Error('InvalidStudyError');
  }

  /**
   * Use this method to send any task response to the server.
   * If there is a problem with the HTTP POST request,
   * the response will be saved in the local storage for a later try.
   *
   * @param task The task that has been completed.
   */
  async sendResponse(response: Response) {
    this.postToServer(response);
  }

  /**
   * Use this method to send any logs to the server.
   * If there is a problem with the HTTP POST request,
   * the log will be saved in the local storage for a later try.
   *
   * @param log An object containing metadata about a log event
   */
  async sendLog(log: Log) {}

  /**
   * Use this method to send all stored responses and logs whose transmission failed in previous attempts.
   * If it still fails, it will keep them in the storage.
   * If it sends them successfully, it will clear them from the storage.
   *
   * @param dataType The type of data to attempt to upload, e.g. 'pending-logs' (log events) or 'pending-data' (survey responses)
   */
  uploadPendingData(dataType: 'pending-log' | 'pending-data') {
    return Promise.all([this.storage.get('current-study'), this.storage.keys()])
      .then((values) => {
        const studyJSON = JSON.parse(JSON.parse(JSON.stringify(values[0])));
        const keys = values[1];

        const pendingLogKeys = [];
        for (const key of keys) {
          if (key.startsWith(dataType)) {
            pendingLogKeys.push(key);
          }
        }
        return {
          pendingLogKeys,
          post_url: studyJSON?.properties.post_url,
        };
      })
      .then((data) => {
        data.pendingLogKeys.map((pendingKey) => {
          this.storage.get(pendingKey).then((log) => {
            const logJSONObj = JSON.parse(log.toString());
            const bodyData = new FormData();
            for (const key in logJSONObj) {
              if (logJSONObj.hasOwnProperty(key)) {
                bodyData.append(key, logJSONObj[key]);
              }
            }
          });
        });
      });
  }

  /**
   * Sends an HTTP POST request to the server.
   * This method is supposed to be used within this service only.
   *
   * @param data The data to append in the body
   */
  private async postToServer(data: any) {
    const url = (await this.storage.getStudy()).properties.post_url;

    Http.post({
      url,
      data,
    });
  }
}
