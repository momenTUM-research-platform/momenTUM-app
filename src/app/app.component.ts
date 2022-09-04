import { Component, OnInit, NgZone } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { SurveyDataService } from './services/survey-data/survey-data.service';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
import { StorageService } from './services/storage/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  private readyApp!: () => void;
  private isAppInForeground: Promise<void> = Promise.resolve();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private localNotifications: LocalNotifications,
    private surveyDataService: SurveyDataService,
    private router: Router,
    private ngZone: NgZone,
    private alertCtrl: AlertController,
    private storage: StorageService
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
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

    // handle notification click
    this.localNotifications.on('click').subscribe(async (notification) => {
      await this.isAppInForeground;
      // log that the user clicked on this notification
      const logEvent = {
        timestamp: moment().format(),
        milliseconds: moment().valueOf(),
        page: 'notification-' + moment(notification.data.task_time).format(),
        event: 'click',
        module_index: notification.data.task_index,
      };
      this.surveyDataService.logPageVisitToServer(logEvent);
      this.router.navigate(['survey/' + notification.data.task_id]);
    });
    // wait for device ready and then fire any pending click events
    await this.isAppInForeground;
    this.localNotifications.fireQueuedEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      //this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
