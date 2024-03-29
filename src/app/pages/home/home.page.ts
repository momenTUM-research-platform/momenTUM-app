import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AlertController } from '@ionic/angular';
import { DataService } from '../../services/data/data.service';
import { StudyTasksService } from '../../services/study-tasks/study-tasks.service';
import { SurveyCacheService } from '../../services/survey-cache/survey-cache.service';
import { LoadingService } from '../../services/loading/loading-service.service';
import { NotificationsService } from '../../services/notification/notifications.service';
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
  showLogin = true; // Used for showing / hiding elements
  enrolled = false; // Used for determining whether the user is enrolled in a study or not
  tasks: Task[] = []; // Stores the list of tasks to be completed by the user
  bannerURL: string; // The URL from which the banner is loaded
  emptyMessage: string; // A message that is shown if no tasks are available
  themeIconName: 'sunny' | 'moon'; // the name of the theme toggle icon
  typeToIcon = {
    survey: 'checkmark-circle-outline',
    pvt: 'alarm-outline',
  };

  constructor(
    private surveyDataService: DataService,
    private notificationsService: NotificationsService,
    private surveyCacheService: SurveyCacheService,
    private studyTasksService: StudyTasksService,
    private navController: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private alertController: AlertController,
    private storageService: StorageService,
    private translate: TranslateService
  ) {}

  /**
   * Angular component lifecycle method: [Docs](https://angular.io/guide/lifecycle-hooks).
   * Executed only once upon creation of the component but before rendering of the component.
   *
   * Subscribes to a queryParameter event, such that when the Barcode page sends the URL it logs into the study.
   */
  async ngOnInit() {
    // needed for the barcode page to communicate a study link
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
   */
  async ionViewWillEnter() {
    await this.notificationsService.requestPermissions();
    await this.initialize();
    SplashScreen.hide();

    // Log page visit
    if (!this.enrolled) return;
  }

  /**
   * Initializes the variables.
   */
  async initialize() {
    // set theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.themeIconName = prefersDark.matches ? 'moon' : 'sunny';

    // check whether enrolled or not
    const study = await this.storageService.getStudy();

    // set state variables if not enrolled
    if (study === null) {
      this.enrolled = false;
      this.showLogin = true;
      this.tasks = [];
      this.bannerURL = '';
      this.emptyMessage = '';
      return;
    }

    // set state variables if enrolled
    await this.loadingService.present(
      await this.translate.get('label_loading').toPromise()
    );
    this.bannerURL = study.properties.banner_url;
    this.emptyMessage = study.properties.empty_msg;
    this.enrolled = true;
    this.showLogin = false;
    this.tasks = await this.studyTasksService.getToDos();
    await this.loadingService.dismiss();
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
   * Handles the enrol buttons.
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
      await this.storageService.setEnrolmentDate(new Date());

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
      await this.studyTasksService.generateStudyTasks();
      await this.notificationsService.setNext30Notifications();
      await this.initialize();
      await this.loadingService.dismiss();
    } catch (error) {
      // handle download errors
      await this.loadingService.dismiss();
      const invalidHTTPError = error !== 'InvalidStudyError';
      const invalidJSONError = !invalidHTTPError;
      this.displayEnrolError(invalidJSONError, invalidHTTPError);
      console.log(error);
      return;
    }
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
   * Handler for when a user clicks on a specific task.
   * Opens the task page for a specific task.
   * @param task
   */
  async openTask(task: Task) {
    const route = `/${task.type}/${task.task_id}`;
    this.navController.navigateRoot(route);
  }

  /**
   * Refreshes the state variables.
   */
  async refresh(event: any) {
    setTimeout(async () => {
      await this.initialize();
      event.target.complete();
    }, 500);
  }
}
