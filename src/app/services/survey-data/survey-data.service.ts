import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';
import { StudyTasksService } from '../study-task/study-tasks.service';
import { UuidService } from '../uuid/uuid.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { LogEvent, Study, SurveyData } from 'types';

@Injectable({
  providedIn: 'root',
})
export class SurveyDataService {
  constructor(
    private httpClient: HttpClient,
    private httpClient2: HttpClient,
    private http2: HTTP,
    private storage: Storage,
    private platform: Platform,
    private uuidService: UuidService,
    private studyTasksService: StudyTasksService
  ) {}

  /**
   * Downloads a survey from a remote URL
   *
   * @param surveyURL The web URL where a survey is hosted.
   */
  getRemoteData(surveyURL: string) {
    return new Promise((resolve, reject) => {
      this.httpClient2
        .get(surveyURL, { headers: new HttpHeaders({ timeout: `${20000}` }) })
        .subscribe({
          next: (v) => {
            resolve(v);
            console.log('Remote data: ' + v);
          },
          error: (error) => {
            console.log('Error in get Remote Data ' + error || '');
            resolve(false);
            console.log('Error message:' + error);
            reject(error);
          },
          complete: () => {
            console.log('Complete');
            resolve(true);
          },
        });
    });
  }

  /**
   * Saves data to local storage
   *
   * @param key
   * @param data
   */
  async saveToLocalStorage(key: string, data: string) {
    this.storage.set(key, data);
  }

  /**
   * Attempts to submit a survey response to the server, and if unsuccessful saves it for later attempts
   *
   * @param surveyData An object containing all metadata about a survey response
   */
  sendSurveyDataToServer(surveyData: SurveyData) {
    return Promise.all([
      this.storage.get('current-study'),
      this.storage.get('uuid'),
      this.studyTasksService.getAllTasks(),
    ]).then((values) => {
      const studyJSON = JSON.parse(values[0]);
      const uuid = values[1];
      const tasks = values[2];
      const dataUuid = this.uuidService.generateUUID('pending-data');

      // create form data to store the survey data
      const bodyData = new FormData();
      bodyData.append('data_type', 'survey_response');
      bodyData.append('user_id', uuid);
      bodyData.append('study_id', studyJSON?.properties.study_id);
      bodyData.append('module_index', String(surveyData.module_index));
      bodyData.append('module_name', surveyData.module_name);
      'responses' in surveyData &&
        bodyData.append('responses', JSON.stringify(surveyData.responses));
      bodyData.append('response_time', surveyData.response_time);
      bodyData.append(
        'response_time_in_ms',
        String(surveyData.response_time_in_ms)
      );
      bodyData.append('alert_time', surveyData.alert_time);
      bodyData.append('platform', this.platform.platforms()[0]);

      return this.attemptHttpPost(
        studyJSON?.properties.post_url,
        bodyData
      ).then((postSuccessful) => {
        if (!postSuccessful) {
          const object: { [key: string]: FormDataEntryValue } = {};
          bodyData.forEach((value, key) => {
            object[key] = value;
          });
          const json = JSON.stringify(object);
          this.storage.set(dataUuid, json);
        }
      });
    });
  }

  /**
   * Attempts to send a log (e.g. page visit) to the server, and if unsuccessful saves it for later attempts
   *
   * @param logEvent An object containing metadata about a log event
   */
  logPageVisitToServer(logEvent: LogEvent) {
    return Promise.all([
      this.storage.get('current-study'),
      this.storage.get('uuid'),
    ]).then((values) => {
      const studyJSON = JSON.parse(values[0]);
      const uuid = values[1];
      const logUuid = this.uuidService.generateUUID('pending-log');

      // create form data to store the log data
      const bodyData = new FormData();
      bodyData.append('data_type', 'log');
      bodyData.append('user_id', uuid);
      bodyData.append('study_id', studyJSON?.properties.study_id);
      bodyData.append('module_index', logEvent.module_index);
      bodyData.append('page', logEvent.page);
      bodyData.append('event', logEvent.event);
      bodyData.append('timestamp', logEvent.timestamp);
      bodyData.append('timestamp_in_ms', String(logEvent.milliseconds));
      bodyData.append('platform', this.platform.platforms()[0]);

      return this.attemptHttpPost(
        studyJSON?.properties.post_url,
        bodyData
      ).then((postSuccessful) => {
        if (!postSuccessful) {
          const object: { [key: string]: FormDataEntryValue } = {};
          bodyData.forEach((value, key) => {
            object[key] = value;
          });
          const json = JSON.stringify(object);
          this.storage.set(logUuid, json);
        }
      });
    });
  }

  /**
   * Attempts to upload any logs/data that was unsuccessfully sent to the server on previous attempts
   *
   * @param dataType The type of data to attempt to upload, e.g. 'pending-logs' (log events) or 'pending-data' (survey responses)
   */
  uploadPendingData(dataType: 'pending-log' | 'pending-data') {
    return Promise.all([this.storage.get('current-study'), this.storage.keys()])
      .then((values) => {
        const studyJSON = JSON.parse(values[0]);
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
            const logJSONObj = JSON.parse(log);
            const bodyData = new FormData();
            for (const key in logJSONObj) {
              if (logJSONObj.hasOwnProperty(key)) {
                bodyData.append(key, logJSONObj[key]);
              }
            }
            this.attemptHttpPost(data.post_url, bodyData).then(
              (postSuccessful) => {
                if (postSuccessful) {
                  this.storage.remove(pendingKey);
                }
              }
            );
          });
        });
      });
  }

  /**
   * Attempts to send the survey data via POST to a server
   *
   * @param postURL The URL for a study's data collection server
   * @param bodyData The data to send to that server
   */
  attemptHttpPost(postURL: string, bodyData: FormData) {
    return new Promise((resolve) => {
      this.httpClient.post(postURL, bodyData).subscribe({
        next: (v) => {
          resolve(v);
          console.log('Notice Survey: ' + v);
        },
        error: (e) => {
          console.info('Error in attemptHttpPost ' + e || '');
          resolve(false);
        },
        complete: () => {
          console.info('Complete');
          resolve(true);
        },
      });
    });
  }
}
