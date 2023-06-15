import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StudyTasksService } from '../study-task/study-tasks.service';
import { UuidService } from '../uuid/uuid.service';
import { HttpClient } from '@angular/common/http';
import { Http } from '@capacitor-community/http';
import { StorageService } from '../storage/storage.service';
import { LogEvent, SurveyData } from 'src/app/interfaces/types';
import { Study } from 'src/app/interfaces/study';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private httpClient: HttpClient,
    private storage: StorageService,
    private platform: Platform,
    private uuidService: UuidService,
    private studyTasksService: StudyTasksService
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
   * Saves data to local storage
   *
   * @param key
   * @param data
   */
  async saveToLocalStorage(key: string, data: string) {
    return await this.storage.set(key, data);
  }

  /**
   * Saves data to local storage
   *
   * @param key
   * @param data
   */
  async getFromLocalStorage(key: string): Promise<any> {
    const data = await this.storage.get(key);
    return data;
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
      const studyJSON = JSON.parse(JSON.parse(JSON.stringify(values[0])));
      const uuid = values[1];

      const dataUuid = this.uuidService.generateUUID('pending-data');

      // create form data to store the survey data
      const bodyData = new FormData();
      bodyData.append('data_type', 'survey_response');
      bodyData.append('user_id', uuid.toString());
      bodyData.append('study_id', studyJSON?.properties.study_id);
      bodyData.append('module_index', String(surveyData.module_index));
      // Included module_id
      bodyData.append(
        'module_id',
        studyJSON?.modules[surveyData.module_index].id
      );
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
        studyJSON?.properties.post_url + '/response',
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
    ])
      .then((values) => {
        const studyJSON = JSON.parse(JSON.parse(JSON.stringify(values[0])));
        const uuid = values[1];
        const logUuid = this.uuidService.generateUUID('pending-log');

        // create form data to store the log data
        const bodyData = new FormData();
        bodyData.append('data_type', 'log');
        bodyData.append('user_id', uuid.toString());
        bodyData.append('study_id', studyJSON?.properties.study_id);
        bodyData.append('module_index', logEvent.module_index);
        // Included module_id
        bodyData.append(
          'module_id',
          studyJSON?.modules[Number(logEvent.module_index)].id
        );
        bodyData.append('page', logEvent.page);
        bodyData.append('event', logEvent.event);
        bodyData.append('timestamp', logEvent.timestamp);
        bodyData.append('timestamp_in_ms', String(logEvent.milliseconds));
        bodyData.append('platform', this.platform.platforms()[0]);

        return this.attemptHttpPost(
          studyJSON?.properties.post_url + '/log',
          bodyData
        )
          .then((postSuccessful) => {
            if (!postSuccessful) {
              const object: { [key: string]: FormDataEntryValue } = {};
              bodyData.forEach((value, key) => {
                object[key] = value;
              });
              const json = JSON.stringify(object);
              this.storage.set(logUuid, json);
            }
          })
          .catch((error) => {
            console.log('Error in attempt http post: ', error || '');
          });
      })
      .catch((error) => {
        console.log('Error in log Page Visit To Server: ', error.message || '');
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
            this.attemptHttpPost(data.post_url, bodyData).then(
              (postSuccessful) => {
                if (postSuccessful) {
                  this.storage.removeItem(pendingKey);
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
        },
        error: (e) => {
          console.log('Error in attempt http post: ', e || '');
          resolve(false);
        },
        complete: () => {
          resolve(true);
        },
      });
    });
  }
}
