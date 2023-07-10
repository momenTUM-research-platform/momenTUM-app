import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { Log, Response, Task } from 'src/app/interfaces/types';
import { Study } from 'src/app/interfaces/study';
import moment from 'moment';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private storage: StorageService,
    private http: HttpClient,
    private platform: Platform
  ) {}

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
    const options = {
      url: url,
      headers: {},
      connectTimeout: 60000,
    };

    // HTTP GET request
    const result = await Http.get(options);
    const object = result.data;
    if (this.validateStudy(object)) return object;
    else throw Error('InvalidStudyError');
  }

  validateStudy(study: any): study is Study {
    return true;
  }

  /**
   * Use this method to send any task response to the server.
   * If there is a problem with the HTTP POST request,
   * the response will be saved in the local storage for a later try.
   *
   * @param task The task that has been completed.
   */
  async sendResponse(
    response: Response,
    type: 'survey_response' | 'pvt_response'
  ) {
    const study = await this.storage.getStudy();
    const bodyData = new FormData();

    bodyData.append('data_type', type);
    bodyData.append('user_id', await this.storage.getUuid());
    bodyData.append('study_id', study.properties.study_id);
    bodyData.append('module_index', String(response.module_index));
    bodyData.append('module_id', study.modules[response.module_index].id);
    bodyData.append('module_name', study.modules[response.module_index].name);
    bodyData.append('responses', JSON.stringify(response.data));
    bodyData.append('response_time', response.response_time);
    bodyData.append(
      'response_time_in_ms',
      String(response.response_time_in_ms)
    );
    bodyData.append('alert_time', response.alert_time);
    bodyData.append('platform', this.platform.platforms()[0]);

    // HTTP POST
    const success = this.postToServer(bodyData, 'response');
    if (success) return;
    console.log('unsuccessfull');

    // Save the response in the local storage for a later try
    this.storage.saveResponse(response);
  }

  /**
   * Use this method to send any logs to the server.
   * If there is a problem with the HTTP POST request,
   * the log will be saved in the local storage for a later try.
   *
   * @param log An object containing metadata about a log event
   */
  async sendLog(log: Log) {
    const success = this.postToServer(log, 'log');
    if (success) return;

    this.storage.saveLog(log);
  }

  /**
   * Use this method to send all stored responses and logs whose transmission failed in previous attempts.
   * If it still fails, it will keep them in the storage.
   * If it sends them successfully, it will clear them from the storage.
   *
   * @param dataType The type of data to attempt to upload, e.g. 'pending-logs' (log events) or 'pending-data' (survey responses)
   */
  async uploadPendingData(dataType: 'log' | 'response') {
    let data: Response[] | Log[];

    if (dataType === 'response') {
      data = await this.storage.getPendingResponses();
    } else {
      data = await this.storage.getPendingLogs();
    }

    for (const obj of data) {
      this.postToServer(obj, dataType);
    }
  }

  /**
   * Sends an HTTP POST request to the server.
   * This method is supposed to be used within this service only.
   *
   * @param data The data to append in the body
   * @returns A boolean value indicating whether status code 200 has been received.
   */
  async postToServer(data: any, type: 'log' | 'response') {
    const postUrl = (await this.storage.getStudy()).properties.post_url;
    this.http.post(postUrl + '/' + type, data).subscribe((response) => {
      return response;
    });
  }
}
