import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import {
  AlertController,
  Platform,
  RefresherCustomEvent,
} from '@ionic/angular';

import { SurveyDataService } from '../../services/survey-data/data.service';
import { StudyTasksService } from '../../services/study-task/study-tasks.service';
import { SurveyCacheService } from '../../services/survey-cache/survey-cache.service';
import { UuidService } from '../../services/uuid/uuid.service';
import { LoadingService } from '../../services/loading/loading-service.service';
import { NotificationsService } from '../../services/notification/notifications.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage/storage.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Task, Translations } from 'src/app/interfaces/types';
import { Study } from 'src/app/interfaces/study';
import { reject } from 'cypress/types/bluebird';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Tracks whether the user is currently enrolled in a study, used for hiding DOM elements.
  isEnrolledInStudy = false;
  // stores the details of the study
  study: Study;
  // stores the list of tasks to be completed by the user
  task_list: Task[] = [];
  // the name of the theme toggle icon
  themeIconName: 'sunny' | 'moon';

  // Translatable text
  translations: Translations = {
    btn_cancel: 'Cancel',
    btn_dismiss: 'Dismiss',
    btn_enrol: 'Enrol',
    btn_enter_url: 'Enter URL',
    btn_study_id: 'Study ID',
    error_loading_qr_code:
      "We couldn't load your study. Please check your internet connection and ensure you are scanning the correct code.",
    error_loading_study:
      "We couldn't load your study. Please check your internet connection and ensure you are entering the correct URL.",
    heading_error: 'Oops...',
    label_loading: 'Loading...',
    msg_caching: 'Downloading media for offline use - please wait!',
    msg_camera:
      'Camera permission is required to scan QR codes. You can allow this permission in Settings.',
  };

  constructor(
    private surveyDataService: SurveyDataService,
    private notificationsService: NotificationsService,
    private surveyCacheService: SurveyCacheService,
    private studyTasksService: StudyTasksService,
    private uuidService: UuidService,
    private navController: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private platform: Platform,
    private loadingService: LoadingService,
    private alertController: AlertController,
    private storageService: StorageService,
    private translate: TranslateService
  ) {}

  /**
   * Angular component lifecycle method: [Docs](https://angular.io/guide/lifecycle-hooks).
   * Executed only once upon creation of the component but before rendering of the component.
   *
   * It performs the following tasks:
   * - Initialization of the theme toggle icon to match the current theme.
   * - Subscription to query params in the route to directly download a study if a study-link is present.
   */
  async ngOnInit() {
    // initialize theme toggle icon
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.themeIconName = prefersDark.matches ? 'moon' : 'sunny';

    // Subscribe to any query parameters
    this.route.queryParams.subscribe(async (params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        const url = this.router.getCurrentNavigation()?.extras.state.qrURL;
        await this.enrolInStudy(url);
      }
    });
  }

  /**
   * Angular component lifecycle method: [Docs](https://angular.io/guide/lifecycle-hooks).
   * Executed every time the component's view is entered.
   *
   * It performs the following tasks:
   * - Translates all text according to the chosen language.
   * -
   */
  async ionViewWillEnter() {
    // translate
    let key: keyof Translations;
    for (key in this.translations) {
      this.translate.get(key).subscribe((translated_text) => {
        this.translations[key] = translated_text;
      });
    }

    // Check notification permission
    this.notificationsService.requestPermissions();

    // set the isCaching flag to false
    this.loadingService.isCaching = false;

    // Present the loading dialog
    this.loadingService.present(this.translations.label_loading);

    // Check if a study exists
    const studyObject: any = await this.storageService.get('current-study');
    if (studyObject === null) {
      this.loadingService.dismiss();
      return;
    }
    this.isEnrolledInStudy = true;

    // convert the study to a JSON object
    this.study = JSON.parse(studyObject);

    // log the user visiting this tab
    this.surveyDataService.logPageVisitToServer({
      timestamp: moment().format(),
      milliseconds: moment().valueOf(),
      page: 'home',
      event: 'entry',
      module_index: -1,
    });

    // set up next round of notifications
    this.notificationsService.setNext30Notifications();

    // load the study tasks
    this.loadStudyDetails();

    // on first run, generate a UUID for the user
    // and set the notifications-enabled to true
    this.storageService.get('uuid-set').then((uuidSet) => {
      if (!uuidSet) {
        // set a UUID
        const uuid = this.uuidService.generateUUID('');
        this.storageService.set('uuid', uuid);
        // set a flag that UUID was set
        this.storageService.set('uuid-set', true);
        // set a flag that notifications are enabled
        this.storageService.set('notifications-enabled', true);
      }
    });
  }

  /**
   * Angular component lifecycle method: [Docs](https://angular.io/guide/lifecycle-hooks).
   * Executed each time the view of the home page is exited.
   */
  ionViewWillLeave() {
    if (this.isEnrolledInStudy) {
      // log the user exiting this tab
      this.surveyDataService.logPageVisitToServer({
        timestamp: moment().format(),
        milliseconds: moment().valueOf(),
        page: 'home',
        event: 'exit',
        module_index: -1,
      });
    }
  }

  /**
   * Handles the "Theme Toggle" button.
   * Performs a theme change,
   * read the [ionic docs](https://ionicframework.com/docs/theming/dark-mode) for how theme changes work in ionic.
   */
  async toggleTheme() {
    const toDark = this.themeIconName === 'sunny'; // Check if toggle from light to dark
    document.body.classList.toggle('dark'); // toggle
    this.themeIconName = toDark ? 'moon' : 'sunny'; // Update icon
    StatusBar.setStyle({ style: toDark ? Style.Dark : Style.Light }).catch(
      (e) => {
        console.log(e);
      }
    ); // Update statusbar
  }

  /**
   * Handles the "QR Code" button.
   */
  async scanQR() {
    return this.navController.navigateForward('/scanner');
  }

  /**
   * Attempt to download a study JSON object from the URL.
   *
   * @param url The URL to attempt to download a study from
   */
  async enrolInStudy(url: string) {
    // show loading bar
    this.loadingService.isCaching = false;
    await this.loadingService.present(this.translations.label_loading);

    try {
      // download the study
      const study: Study = await this.surveyDataService.downloadStudy(url);
      await this.storageService.saveStudy(study);

      // log the enrolment event
      this.surveyDataService.logPageVisitToServer({
        timestamp: moment().format(),
        milliseconds: moment().valueOf(),
        page: 'home',
        event: 'enrol',
        module_index: -1,
      });

      // cache all media files if this study has set this property to true
      if (study.properties.cache) {
        this.loadingService.dismiss().then(() => {
          this.loadingService.isCaching = true;
          this.loadingService.present(this.translations.msg_caching);
        });
        this.surveyCacheService.cacheAllMedia(this.study);
      }

      await this.studyTasksService.generateStudyTasks(this.study);
      await this.notificationsService.setNext30Notifications();
      await this.loadStudyDetails();
      await this.loadingService.dismiss();
      this.isEnrolledInStudy = true;
    } catch (error) {
      // handle download errors
      await this.loadingService.dismiss();
      const invalidJSONError = error === 'InvalidStudyError';
      const invalidHTTPError = !invalidJSONError;
      this.displayEnrolError(invalidJSONError, invalidHTTPError);
      return;
    }

    // setup the study task objects
  }

  /**
   * Handles the alert dialog to enrol via URL
   */
  async enterURL() {
    const alert = await this.alertController.create({
      header: this.translations.btn_enter_url,
      inputs: [
        {
          name: 'url',
          type: 'url',
          placeholder: 'e.g. https://bit.ly/2Q4O9jI',
        },
      ],
      buttons: [
        {
          text: this.translations.btn_cancel,
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: this.translations.btn_enrol,
          handler: (response) => {
            this.enrolInStudy(response.url);
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   *
   * Handles the alert dialog to enrol via Study ID
   */
  async enterStudyID() {
    const alert = await this.alertController.create({
      header: this.translations.btn_study_id,
      inputs: [
        {
          name: 'id',
          type: 'text',
          placeholder: 'e.g. STUDY01',
        },
      ],
      buttons: [
        {
          text: this.translations.btn_cancel,
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: this.translations.btn_enrol,
          handler: (response) => {
            // create URL for study
            const url =
              'https://tuspl22-momentum.srv.mwn.de/api/v1/studies/' +
              response.id;
            this.enrolInStudy(url);
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Loads the details of the current study, including overdue tasks
   */
  async loadStudyDetails() {
    await this.studyTasksService.getTaskDisplayList().then((tasks) => {
      this.task_list = tasks;

      for (const task of this.task_list) {
        task.moment = moment(new Date(task.time)).fromNow();
      }

      // reverse the order of the tasks list to show oldest first
      this.sortTasksList();

      // hide loading controller if not caching
      if (!this.loadingService.isCaching) {
        setTimeout(() => {
          if (this.loadingService) {
            // Added this condition
            this.loadingService.dismiss();
          }
        }, 1000);
      }
    });
  }

  /**
   * Displays an alert to indicate that something went wrong during study enrolment
   *
   * @param isQRCode Denotes whether the error was caused via QR code enrolment
   */
  async displayEnrolError(isJSONinvalid: boolean, isURLproblem: boolean) {
    let message = "We couldn't load your study.";

    if (isJSONinvalid && !isURLproblem) {
      message =
        "We couldn't load your study. The downloaded study has an invalid format.";
    } else if (!isJSONinvalid && isURLproblem) {
      message =
        "We couldn't load your study. The URL is invalid. Please ensure you are entering the correct URL.";
    }

    const alert = await this.alertController.create({
      header: 'Oops...',
      message: message,
      buttons: ['Dismiss'],
    });
    await alert.present();
  }

  /**
   * Displays a message when camera permission is not allowed
   */
  async displayBarcodeError() {
    const alert: HTMLIonAlertElement = await this.alertController.create({
      header: 'Permission Required',
      message: this.translations.msg_camera,
      buttons: ['Dismiss'],
    });
    await alert.present();
  }

  /**
   * Reverses the list of tasks for sorting purposes
   */
  sortTasksList() {
    this.task_list.reverse();
  }

  /**
   * Refreshes the list of tasks
   */
  async doRefresh(refresher) {
    if (!this.loadingService.isLoading) {
      this.ionViewWillEnter();
    }
    setTimeout(() => {
      refresher.target.complete();
    }, 250);
  }
}
