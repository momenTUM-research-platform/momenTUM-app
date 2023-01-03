import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import {
  AlertController,
  Platform,
  RefresherCustomEvent,
} from '@ionic/angular';

import { SurveyDataService } from '../../services/survey-data/survey-data.service';
import { StudyTasksService } from '../../services/study-task/study-tasks.service';
import { SurveyCacheService } from '../../services/survey-cache/survey-cache.service';
import { UuidService } from '../../services/uuid/uuid.service';
import { LoadingService } from '../../services/loading/loading-service.service';
import { NotificationsService } from '../../services/notification/notifications.service';
import * as moment from 'moment';
import { ChangeTheme } from '../../shared/change-theme';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage/storage.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // resume event subscription
  resumeEvent: any;
  // flag to display enrol options
  hideEnrolOptions = true;
  // track whether the user is currently enrolled in a study
  isEnrolledInStudy = false;
  // stores the details of the study
  study: Study | null = null;
  // stores the list of tasks to be completed by the user
  task_list: Array<any> = new Array();
  // dark mode
  darkMode = false;
  //image
  tum_image = 'assets/imgs/tum-icon.png';

  //translations loaded from the appropriate language file
  // defaults are provided but will be overridden if language file
  // is loaded successfully
  translations: Translations = {
    btn_cancel: 'Cancel',
    btn_dismiss: 'Dismiss',
    btn_enrol: 'Enrol',
    'btn_enter-url': 'Enter URL',
    'btn_study-id': 'Study ID',
    'error_loading-qr-code':
      "We couldn't load your study. Please check your internet connection and ensure you are scanning the correct code.",
    'error_loading-study':
      "We couldn't load your study. Please check your internet connection and ensure you are entering the correct URL.",
    heading_error: 'Oops...',
    label_loading: 'Loading...',
    msg_caching: 'Downloading media for offline use - please wait!',
    msg_camera:
      'Camera permission is required to scan QR codes. You can allow this permission in Settings.',
  };

  safeURL: string;

  // the current language of the device
  selectedLanguage: string;

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

  // Async method because every method that is called from the status bar are also Asynchronus methods
  async toggleTheme() {
    if (ChangeTheme.getTheme() === 'light') {
      await StatusBar.setBackgroundColor({ color: '#000000' }).catch((e) => {
        console.log('StatusBar.setBackgroundColor(): ' + e);
      });
      await StatusBar.setStyle({ style: Style.Dark }).catch((e) => {
        console.log('StatusBar.setStyle(): ' + e);
      });
      ChangeTheme.setTheme(true);
      this.darkMode = true;
    } else {
      await StatusBar.setBackgroundColor({ color: '#FFFFFF' }).catch((e) => {
        console.log('StatusBar.setBackgroundColor(): ' + e);
      });
      await StatusBar.setStyle({ style: Style.Light }).catch((e) => {
        console.log('StatusBar.setStyle(): ' + e);
      });
      ChangeTheme.setTheme(false);
      this.darkMode = false;
    }
  }

  ngOnInit() {
    // Initialize theme, toggle icon, and StatusBar accordingly
    ChangeTheme.initializeTheme();
    if (ChangeTheme.getTheme() === 'light') {
      StatusBar.setBackgroundColor({ color: '#FFFFFF' }).catch((e) => {
        console.log('StatusBar.setBackgroundColor(): ' + e);
      });
      StatusBar.setStyle({ style: Style.Light }).catch((e) => {
        console.log('StatusBar.setStyle(): ' + e);
      });
      this.darkMode = false;
    } else {
      StatusBar.setBackgroundColor({ color: '#000000' }).catch((e) => {
        console.log('StatusBar.setBackgroundColor(): ' + e);
      });
      StatusBar.setStyle({ style: Style.Dark }).catch((e) => {
        console.log('StatusBar.setStyle(): ' + e);
      });
      this.darkMode = true;
    }

    // need to subscribe to this event in order
    // to ensure that the page will refresh every
    // time it is navigated to because ionViewWillEnter()
    // is not called when navigating here from other pages
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/') {
          if (!this.loadingService.isLoading) {
            this.ionViewWillEnter();
          }
        }
      }
    });

    // trigger this to run every time the app is resumed from the background
    this.resumeEvent = this.platform.resume.subscribe(() => {
      if (this.router.url === '/tabs/tab1') {
        if (!this.loadingService.isLoading) {
          this.ionViewWillEnter();
        }
      }
    });

    // Need to make sure data from QR code scanner arrived or not
    this.route.queryParams.subscribe(async (params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        const url = this.router.getCurrentNavigation()?.extras.state.qrURL;
        await this.attemptToDownloadStudy(url, true, false);
      }
    });
  }

  async ionViewWillEnter() {
    this.darkMode = ChangeTheme.getTheme() === 'dark';
    // translate
    let key: keyof Translations;
    // eslint-disable-next-line guard-for-in
    for (key in this.translations) {
      this.translate.get(key).subscribe((translated_text) => {
        this.translations[key] = translated_text;
      });
    }

    this.notificationsService.requestPermissions();

    this.loadingService.isCaching = false;
    this.loadingService.present(this.translations.label_loading);

    this.hideEnrolOptions = true;
    this.isEnrolledInStudy = false;

    // check if user is currently enrolled in study
    try {
      await this.storageService.get('uuid');
    } catch {
      console.log('Storage did not exist, creating');
      await this.storageService.init();
    }
    Promise.all([this.storageService.get('current-study')]).then((values) => {
      const studyObject: any = values[0];
      if (studyObject !== null) {
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

        // attempt to upload any pending logs and survey data
        this.surveyDataService.uploadPendingData('pending-log');
        this.surveyDataService.uploadPendingData('pending-data');

        // set up next round of notifications
        this.notificationsService.setNext30Notifications();

        // load the study tasks
        this.loadStudyDetails();
      } else {
        this.hideEnrolOptions = false;
        if (this.loadingService) {
          // Added this condition
          this.loadingService.dismiss();
        }
      }
    });

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
   * Lifecycle event called when the current page is about to become paused/closed
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

      // attempt to upload any pending logs and survey data
      this.surveyDataService.uploadPendingData('pending-log');
      this.surveyDataService.uploadPendingData('pending-data');
    }
  }

  /**
   * ScanQR Code router
   */

  async scanQR() {
    return this.navController.navigateForward('/scanner');
  }

  /**
   * Attempt to download a study from the URL scanned/entered by a user
   *
   * @param url The URL to attempt to download a study from
   */
  async attemptToDownloadStudy(
    url: string,
    isQRCode: boolean,
    isStudyID: boolean
  ) {
    // show loading bar
    this.loadingService.isCaching = false;
    this.loadingService.present(this.translations.label_loading);

    try {
      const result = await this.surveyDataService.getRemoteData(url);

      // check if the data received from the URL contains JSON properties/modules
      // in order to determine if it's a schema study before continuing
      let validStudy = false;

      const study: Study = JSON.parse(JSON.stringify(result));

      // checks if the returned text is parseable as JSON, and whether it contains
      // some of the key fields used by schema so it can determine whether it is
      // actually a schema study URL
      // @ts-ignore

      validStudy =
        study.properties !== undefined && // @ts-ignore
        study.modules !== undefined && // @ts-ignore
        study.properties.study_id !== undefined;

      if (validStudy) {
        this.enrolInStudy(study);
      } else {
        if (this.loadingService) {
          // Added this condition
          this.loadingService.dismiss();
        }
        this.displayEnrolError(isQRCode, true, true, isStudyID);
      }
    } catch (e: any) {
      console.log('Enrolling exception: ' + e);
      if (this.loadingService) {
        // Added this condition
        this.loadingService.dismiss();
      }
      switch (e.name) {
        // ERROR in the JSON
        case 'SyntaxError':
          this.displayEnrolError(isQRCode, true, false, isStudyID);
          break;
        // Error in the URL and request
        case 'HttpErrorResponse':
          this.displayEnrolError(isQRCode, false, true, isStudyID);
          break;

        // Error in the URL and request
        case 'TypeError':
          this.displayEnrolError(isQRCode, true, true, isStudyID);
          break;

        default:
          this.displayEnrolError(isQRCode, true, true, isStudyID);
          break;
      }
      // This means invalid URL
    }
  }

  /**
   * Handles the alert dialog to enrol via URL
   */
  async enterURL() {
    const alert = await this.alertController.create({
      header: this.translations['btn_enter-url'],
      inputs: [
        {
          name: 'url',
          type: 'url',
          placeholder: 'e.g. https://bit.ly/2Q4O9jI',
          value: 'https://',
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
            this.attemptToDownloadStudy(response.url, false, false);
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
      header: this.translations['btn_study-id'],
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
            this.attemptToDownloadStudy(url, false, true);
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Enrols the user in the study, sets up notifications and tasks
   *
   * @param data A data object returned from the server to represent a study object
   */
  async enrolInStudy(study: Study) {
    this.isEnrolledInStudy = true;
    this.hideEnrolOptions = true;

    // convert received data to JSON object
    this.study = study;

    // set the enrolled date
    this.storageService.set('enrolment-date', new Date());

    // set an enrolled flag and save the JSON for the current study
    this.storageService
      .set('current-study', JSON.stringify(this.study))
      .then(async () => {
        // log the enrolment event
        this.surveyDataService.logPageVisitToServer({
          timestamp: moment().format(),
          milliseconds: moment().valueOf(),
          page: 'home',
          event: 'enrol',
          module_index: -1,
        });

        // cache all media files if this study has set this property to true
        if (this.study?.properties.cache) {
          this.loadingService.dismiss().then(() => {
            this.loadingService.isCaching = true;
            this.loadingService.present(this.translations.msg_caching);
          });
          this.surveyCacheService.cacheAllMedia(this.study);
        }
        // setup the study task objects
        const tasks = this.study
          ? await this.studyTasksService.generateStudyTasks(this.study)
          : [];
        // setup the notifications
        await this.notificationsService.setNext30Notifications();
        await this.loadStudyDetails();
      });
  }

  /**
   * Loads the details of the current study, including overdue tasks
   */
  async loadStudyDetails() {
    this.studyTasksService.getTaskDisplayList().then((tasks) => {
      this.task_list = tasks;

      for (const task of this.task_list) {
        task.moment = moment(new Date(task.time)).fromNow();
      }

      // show the study tasks
      this.isEnrolledInStudy = true;
      this.hideEnrolOptions = true;

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
  async displayEnrolError(
    isQRCode: boolean,
    isJSONinvalid: boolean,
    isURLproblem: boolean,
    isStudyID: boolean
  ) {
    let msg = "We couldn't load your study.";

    /**
     * Is Only QRCode
     */
    if (isQRCode && !isJSONinvalid && !isURLproblem) {
      msg =
        "We couldn't load your study. Please check your internet connection and ensure you are scanning the correct code.";
    }
    /**
     * Is QRCode and JSON Invalid format
     */
    if (isQRCode && isJSONinvalid && !isURLproblem) {
      msg =
        "We couldn't load your study. The downloaded study is an invalid format. Please ensure you are scanning the correct code.";
    }
    /**
     * Is Only JSON Invalid format
     */
    if (!isQRCode && isJSONinvalid && !isURLproblem) {
      if (isStudyID) {
        msg =
          "We couldn't load your study. The downloaded study is an invalid format. Please ensure you are entering the correct ID.";
      } else {
        msg =
          "We couldn't load your study. The downloaded study is an invalid format. Please ensure you are entering the correct URL.";
      }
    }
    /**
     * Is JSON Invalid format and is URL Problem
     */
    if (!isQRCode && isJSONinvalid && isURLproblem) {
      if (isStudyID) {
        msg =
          "We couldn't load your study. The URL is the problem or the downloaded study is an invalid format.\
       Please ensure you are entering the correct ID.";
      } else {
        msg =
          "We couldn't load your study. The URL is the problem or the downloaded study is an invalid format.\
       Please ensure you are entering the correct URL.";
      }
    }
    /**
     * Is only URL Problem
     */
    if (!isQRCode && !isJSONinvalid && isURLproblem) {
      if (isStudyID) {
        msg =
          "We couldn't load your study. The URL is invalid. Please ensure you are entering the correct ID.";
      } else {
        msg =
          "We couldn't load your study. The URL is invalid. Please ensure you are entering the correct URL.";
      }
    }
    /**
     * Is URL Problem and QRCode
     */
    if (isQRCode && !isJSONinvalid && isURLproblem) {
      msg =
        "We couldn't load your study. The URL is invalid. Please ensure you are scanning the correct code.";
    }
    /**
     * All three is the problem
     */
    if (isQRCode && isJSONinvalid && isURLproblem) {
      msg =
        "We couldn't load your study. The downloaded study is invalid. Please check your internet connection and ensure \
      you are scanning the correct code.";
    }

    if (isStudyID) {
      msg =
        "We couldn't load your study. The study ID is an invalid or doesn't exist. Please check your internet connection and ensure \
      you entered the correct study ID.";
    }

    const alert = await this.alertController.create({
      header: 'Oops...',
      message: msg,
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
  async doRefresh(refresher: RefresherCustomEvent) {
    if (!this.loadingService.isLoading) {
      this.ionViewWillEnter();
    }
    setTimeout(() => {
      refresher.target.complete();
    }, 250);
  }
}
