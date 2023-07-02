import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { Router } from '@angular/router';
import { SurveyDataService } from './services/survey-data/survey-data.service';
import * as moment from 'moment';
import { StorageService } from './services/storage/storage.service';
import { NotificationsService } from './services/notification/notifications.service';
import { ActionPerformed } from '@capacitor/local-notifications';
import { BarcodeService } from './services/barcode/barcode.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  private readyApp!: () => void;
  private isAppInForeground: Promise<void> = Promise.resolve();

  constructor(
    private platform: Platform,
    private notificationsService: NotificationsService,
    private surveyDataService: SurveyDataService,
    private router: Router,
    private barcodeScannerService: BarcodeService,
    private storage: StorageService
  ) {
    this.initializeApp();
  }

  async ngOnInit() {

    await this.barcodeScannerService.checkPermission().catch((err) => {
      console.log('Barcode Scanner: ' + err.message);
    });

    await this.platform.ready();

    await this.storage.init();

    this.platform.pause.subscribe(() => {
      this.isAppInForeground = new Promise((resolve) => {
        this.readyApp = resolve;
      });
    });

    this.platform.resume.subscribe(() => {
      this.readyApp();
    });

    this.notificationsService.addListenerOnClick(this.listenerFunc);

    // wait for device ready and then fire any pending click events
    await this.isAppInForeground;
    this.notificationsService.fireQueuedEvents().catch(() => {
      console.log('ERROR caught: fireQueuedEvents is not yet implemented.');
    });
  }

  async listenerFunc(notificationAction: ActionPerformed) {
    await this.isAppInForeground;
    // log that the user clicked on this notification
    const logEvent = {
      timestamp: moment().format(),
      milliseconds: moment().valueOf(),
      page:
        'notification-' +
        moment(notificationAction.notification.extra.task_time).format(),
      event: 'click',
      module_index: notificationAction.notification.extra.task_index,
    };
    this.surveyDataService.logPageVisitToServer(logEvent);
    this.router.navigate([
      'survey/' + notificationAction.notification.extra.task_id,
    ]);
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      await StatusBar.setOverlaysWebView({ overlay: false }).catch((e) => {
        console.log('StatusBar error with setOverlaysWebView(): ' + e);
      });
      SplashScreen.hide();
    });
  }
}
