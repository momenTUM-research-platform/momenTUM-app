import { EmailComposer } from 'capacitor-email-composer';
import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { NotificationsService } from '../../services/notification/notifications.service';
import { Browser } from '@capacitor/browser';
import * as moment from 'moment';
import { TranslateConfigService } from '../../translate-config.service';
import { DataService } from '../../services/data/data.service';
import { StorageService } from '../../services/storage/storage.service';
import { Capacitor } from '@capacitor/core';
import { LoadingService } from 'src/app/services/loading/loading-service.service';
import { Study } from 'src/app/interfaces/study';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  // stores the user's UUID
  uuid: string;

  // flag to track whether the user is in a study
  isEnrolled = false;

  // flag to track whether notifications are enabled
  notificationsEnabled = true;

  // the current language of the device
  selectedLanguage: string;

  // store a reference to the study object
  // empty template used prior to loading data
  study: Study;

  constructor(
    private storage: StorageService,
    private navController: NavController,
    private alertController: AlertController,
    private notificationsService: NotificationsService,
    private translateConfigService: TranslateConfigService,
    private surveyDataService: DataService,
    private loadingService: LoadingService
  ) {
    // get the default language of the device
    this.selectedLanguage =
      this.translateConfigService.getDefaultLanguage() || 'en';
  }

  /**
   * Angular component lifecycle method: [Docs](https://angular.io/guide/lifecycle-hooks).
   *
   */
  async ionViewWillEnter() {
    this.isEnrolled = false;
    this.study = await this.storage.getStudy();
    this.uuid = await this.storage.getUuid();
    const notificationsEnabled = await this.storage.notificationsEnabled();
    if (this.study === null) {
      this.isEnrolled = false;
      return;
    }
    this.isEnrolled = true;

    // get the status of the notifications
    if (notificationsEnabled === null) {
      this.notificationsEnabled = false;
    } else {
      this.notificationsEnabled = notificationsEnabled;
    }
    if (this.isEnrolled) {
      this.surveyDataService.sendLog({
        timestamp: moment().format(),
        page: 'settings',
        event: 'entry',
      });
    }
  }

  ionViewWillLeave() {
    if (this.isEnrolled) {
      this.surveyDataService.sendLog({
        timestamp: moment().format(),
        page: 'settings',
        event: 'exit',
      });
    }
  }

  /**
   * Display a dialog to withdraw from the study
   */
  async withdrawFromStudy() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'By withdrawing, you will lose all progress.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Withdraw',
          handler: async () => {
            // log a withdraw event to the server
            this.loadingService.present('Withdrawing...');
            this.surveyDataService.sendLog({
              timestamp: moment().format(),
              page: 'settings',
              event: 'withdraw',
            });
            // upload any pending logs and data
            try {
              await this.surveyDataService.uploadPendingData('pending-log');
              await this.surveyDataService.uploadPendingData('pending-data');
            } catch {}
            await this.storage.clear();
            await this.notificationsService.cancelAll();
            await this.loadingService.dismiss();
            await this.navController.navigateRoot('/');
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Enables/disables the notifications
   */
  toggleNotifications() {
    // update the notifications flag
    this.storage.setNotificationsEnabled(this.notificationsEnabled);
    // set the next 30 notifications (cancels all notifications before setting them if enabled)
    this.notificationsService.setNext30Notifications();
  }

  /**
   * Opens the support website for the current study in a web browser
   *
   * @param support_url The current study's support website URL
   */

  openSupportURL(support_url: string) {
    if (Capacitor.isNativePlatform()) {
      // Return a Promise resolved with the result of calling the open method of the Browser object
      return Browser.open({ url: support_url, windowName: '_window' }).catch(
        (e) => {
          console.log(
            'ERROR in promise caught: settings.page.ts: Browser.open() threw: + ' +
              e
          );
        }
      );
    } else {
      // Return a Promise resolved with the result of calling the open method of the window object
      return Promise.resolve(window.open(support_url, '_blank'));
    }
  }

  /**
   * Opens a new email addressed to the current study's support email address
   *
   * @param support_email The current study's support email address
   * @param study_name The current study's name
   */
  openSupportEmail(support_email: string, study_name: string) {
    window.location.href =
      'mailto:' + support_email + '?subject=Support: ' + study_name;
    EmailComposer.open({
      to: [support_email],
      subject: 'Support: ' + study_name,
    }).catch((err) => {
      console.log(err);
    });
  }
}
