// src/app/services/data/data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';      
import { lastValueFrom } from 'rxjs';                  
import { Platform } from '@ionic/angular';

import { StorageService } from '../storage/storage.service';
import { Log, Response } from 'src/app/interfaces/types';
import { Study } from 'src/app/interfaces/study';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(
    private storage: StorageService,
    private httpClient: HttpClient,   // ← renamed
    private platform: Platform
  ) {}

  /**
   * Downloads a study JSON from the given absolute URL.
   * Throws on HTTP errors or invalid format.
   * (Switched from Capacitor HTTP → Angular HttpClient for reliable JS errors.)
   */
  async downloadStudy(url: string): Promise<Study> {
    const study = await lastValueFrom(this.httpClient.get<Study>(url));
    if (!this.validateStudy(study)) {
      throw new Error('InvalidStudyError');
    }
    return study;
  }

  /** Stub validator—always true. Extend for real schema checks. */
  private validateStudy(study: any): study is Study {
    return true;
  }

  /**
   * Sends a completed task response.
   * Falls back to saving locally if POST fails.
   */
  async sendResponse(
    response: Response,
    type: 'survey_response' | 'pvt_response'
  ): Promise<void> {
    const study = await this.storage.getStudy();
    const form = new FormData();
    form.append('data_type', type);
    form.append('user_id', await this.storage.getUuid());
    form.append('study_id', study.properties.study_id);
    form.append('module_index', String(response.module_index));
    form.append('module_id', study.modules[response.module_index].id);
    form.append('module_name', study.modules[response.module_index].name);
    form.append('responses', JSON.stringify(response.data));
    form.append('response_time', response.response_time);
    form.append('response_time_in_ms', String(response.response_time_in_ms));
    form.append('alert_time', response.alert_time);
    form.append('platform', this.platform.platforms()[0]);

    try {
      this.postToServer(form, 'response');
    } catch {
      this.storage.saveResponse(response);
    }
  }

  /**
   * Sends a log event.
   * Falls back to saving locally if POST fails.
   */
  async sendLog(log: Log): Promise<void> {
    try {
      this.postToServer(log, 'log');
    } catch {
      this.storage.saveLog(log);
    }
  }

  /**
   * Retries uploading any pending logs or responses.
   * If a POST succeeds, it simply keeps going (old items remain until manual clear).
   */
  async uploadPendingData(dataType: 'log' | 'response'): Promise<void> {
    const pending =
      dataType === 'response'
        ? await this.storage.getPendingResponses()
        : await this.storage.getPendingLogs();

    for (const item of pending) {
      this.postToServer(item, dataType);
    }
  }

  /**
   * Internal POST helper: sends data to `<post_url>/<type>`.
   * Returns void; errors will be caught by callers.
   */
  private postToServer(data: any, type: 'log' | 'response'): void {
    this.storage.getStudy().then(study => {
      const base = study.properties.post_url.replace(/\/+$/, '');
      const url = `${base}/${type}`;
      this.httpClient.post(url, data).subscribe({
        next: () => {},
        error: () => { throw new Error('PostFailed'); }
      });
    });
  }
}