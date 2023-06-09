import { EmailComposer } from 'capacitor-email-composer';
import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { NotificationsService } from '../../services/notification/notifications.service';
import { Browser } from '@capacitor/browser';
import * as moment from 'moment';
import { TranslateConfigService } from '../../translate-config.service';
import { SurveyDataService } from '../../services/survey-data/survey-data.service';
import { StorageService } from '../../services/storage/storage.service';
import { Capacitor } from '@capacitor/core';

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
  study: any = {
    properties: {
      study_name: '',
      instructions: '',
      support_email: '',
      support_url: '',
      ethics: '',
      pls: '',
    },
  };

  constructor(
    private storage: StorageService,
    private navController: NavController,
    private alertController: AlertController,
    private notificationsService: NotificationsService,
    private translateConfigService: TranslateConfigService,
    private surveyDataService: SurveyDataService
  ) {
    // get the default language of the device
    this.selectedLanguage =
      this.translateConfigService.getDefaultLanguage() || 'en';
  }

  ionViewWillEnter() {
    this.isEnrolled = false;

    Promise.all([
      this.storage.get('current-study'),
      this.storage.get('uuid'),
      this.storage.get('notifications-enabled'),
    ]).then((values) => {
      // check if user is currently enrolled in study
      // to show/hide additional options
      const studyObject: string = values[0];

      if (studyObject !== null) {
        this.isEnrolled = true;
        this.study = JSON.parse(studyObject);
      } else {
        this.isEnrolled = false;
      }

      // get the uuid from storage to display in the list
      this.uuid = values[1].toString();

      // get the status of the notifications
      const notificationsEnabled = values[2] as unknown as boolean;
      if (notificationsEnabled === null) {
        this.notificationsEnabled = false;
      } else {
        this.notificationsEnabled = notificationsEnabled;
      }
      if (this.isEnrolled) {
        // log the user visiting this tab
        this.surveyDataService.logPageVisitToServer({
          timestamp: moment().format(),
          milliseconds: moment().valueOf(),
          page: 'settings',
          event: 'entry',
          module_index: -1,
        });
      }
    });
  }

  ionViewWillLeave() {
    if (this.isEnrolled) {
      this.surveyDataService.logPageVisitToServer({
        timestamp: moment().format(),
        milliseconds: moment().valueOf(),
        page: 'settings',
        event: 'exit',
        module_index: -1,
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
            this.surveyDataService.logPageVisitToServer({
              timestamp: moment().format(),
              milliseconds: moment().valueOf(),
              page: 'settings',
              event: 'withdraw',
              module_index: -1,
            });
            // upload any pending logs and data
            await this.surveyDataService.uploadPendingData('pending-log');
            await this.surveyDataService.uploadPendingData('pending-data');
            await this.storage.removeItem('current-study');
            await this.storage.removeItem('study-tasks');
            await this.notificationsService.cancelAll();
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
    this.storage.set('notifications-enabled', this.notificationsEnabled);
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
