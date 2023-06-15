import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AlertController, Platform } from '@ionic/angular';

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
import { Task } from 'src/app/interfaces/types';
import { Study } from 'src/app/interfaces/study';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showLogin = true; // Used for showing / hiding elements depending on whether the user is enrolled in a study or not
  study: Study; // stores the details of the study
  tasks: Task[]; // stores the list of tasks to be completed by the user
  themeIconName: 'sunny' | 'moon'; // the name of the theme toggle icon

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
    this.route.queryParams.subscribe(async () => {
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
   * - Hides the SplashScreen if it's present.
   * - Requests permission for notifications.
   * - Checks if a study is present and if yes loads all the study tasks
   */
  async ionViewWillEnter() {
    SplashScreen.hide();
    this.notificationsService.requestPermissions();
    if ((await this.storageService.getStudy()) === null) return;

    // load the tasks
    this.loadingService.isCaching = false;
    this.loadingService.present(
      await this.translate.get('label_loading').toPromise()
    );
    this.showLogin = false;
    this.notificationsService.setNext30Notifications();
    this.tasks = await this.studyTasksService.getTaskDisplayList();
    this.loadingService.dismiss();

    // log the user visiting this tab
    this.surveyDataService.logPageVisitToServer({
      timestamp: moment().format(),
      milliseconds: moment().valueOf(),
      page: 'home',
      event: 'entry',
      module_index: -1,
    });
  }

  /**
   * Angular component lifecycle method: [Docs](https://angular.io/guide/lifecycle-hooks).
   * Executed each time the view of the home page is exited.
   *
   * It logs the page exit event if currently enrolled.
   */
  ionViewWillLeave() {
    if (!this.showLogin) {
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
    await this.loadingService.present(
      await this.translate.get('label_loading').toPromise()
    );

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
        this.loadingService.dismiss().then(async () => {
          this.loadingService.isCaching = true;
          this.loadingService.present(
            await this.translate.get('label_loading').toPromise()
          );
        });
        this.surveyCacheService.cacheAllMedia(study);
      }

      await this.studyTasksService.generateStudyTasks(study);
      await this.notificationsService.setNext30Notifications();
      this.tasks = await this.studyTasksService.getTaskDisplayList();
      await this.loadingService.dismiss();
      this.showLogin = false;
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
      header: await this.translate.get('btn_enter_url').toPromise(),
      inputs: [
        {
          name: 'url',
          type: 'url',
          placeholder: 'e.g. https://bit.ly/2Q4O9jI',
        },
      ],
      buttons: [
        {
          text: await this.translate.get('btn_cancel').toPromise(),
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: await this.translate.get('btn_enrol').toPromise(),
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
      header: await this.translate.get('btn_study_id').toPromise(),
      inputs: [
        {
          name: 'id',
          type: 'text',
          placeholder: 'e.g. STUDY01',
        },
      ],
      buttons: [
        {
          text: await this.translate.get('btn_cancel').toPromise(),
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: await this.translate.get('btn_enrol').toPromise(),
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
      message: await this.translate.get('msg_camera').toPromise(),
      buttons: ['Dismiss'],
    });
    await alert.present();
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
