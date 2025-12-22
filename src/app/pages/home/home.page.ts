import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App as CapacitorApp } from '@capacitor/app';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

import { DataService } from '../../services/data/data.service';
import { StudyTasksService } from '../../services/study-tasks/study-tasks.service';
import { SurveyCacheService } from '../../services/survey-cache/survey-cache.service';
import { LoadingService } from '../../services/loading/loading-service.service';
import { NotificationsService } from '../../services/notification/notifications.service';
import { StorageService } from '../../services/storage/storage.service';
import { TranslateService } from '@ngx-translate/core';

import { Task } from 'src/app/interfaces/types';
import { Study } from 'src/app/interfaces/study';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showLogin = true;
  enrolled = false;
  tasks: Task[] = [];
  bannerURL = '';
  emptyMessage = '';
  showEmpty = false; // show when no tasks
  themeIconName: 'sunny' | 'moon';
  typeToIcon = { survey: 'checkmark-circle-outline', pvt: 'alarm-outline' };

  // Base URL parts for study API
  private readonly DOMAIN     = 'https://designer.momentumresearch.eu';
  private readonly API_PREFIX = '/api/v2/studies';

  constructor(
    private surveyDataService: DataService,
    private studyTasksService: StudyTasksService,
    private surveyCacheService: SurveyCacheService,
    private notificationsService: NotificationsService,
    private loadingService: LoadingService,
    private storageService: StorageService,
    private translate: TranslateService,
    private alertController: AlertController,
    private navController: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone                
  ) {}

  ngOnInit(): void {
    // 1) Whenever a notification is delivered in-app, refresh the home list
    this.notificationsService.onDelivered$.subscribe(() => {
      console.log('[HomePage] notification delivered → reloading tasks');
      this.initialize();
    });

    // 2) When the app returns from background (e.g. user tapped the notification),
    //    re-load tasks so new modules show up immediately.
    CapacitorApp.addListener('appStateChange', ({ isActive }) => {
      if (isActive) {
        console.log('[HomePage] app resumed → reloading tasks');
        this.ngZone.run(() => this.initialize());
      }
    });

    // Handle QR-scanner return
    this.route.queryParams.subscribe(() => {
      const nav = this.router.getCurrentNavigation();
      const raw = nav?.extras?.state?.qrURL as string;
      if (raw) {
        this.enrolInStudy(raw);
      }
    });
  }

  /** Debug helper: fire a test notification 5s from now */
  public async testImmediateNotif(): Promise<void> {
    await this.notificationsService.requestPermissions();
    await this.notificationsService.initialize();
    const at = new Date(Date.now() + 5000);
    await LocalNotifications.schedule({
      notifications: [{
        id: 9999,
        title: 'Test Notification',
        body: `Fired at ${at.toLocaleTimeString()}`,
        channelId: 'default',
        schedule: { at },
        extra: { test: true }
      }]
    });
    console.log('Scheduled test notification at', at);
  }

  async ionViewWillEnter(): Promise<void> {
    if (Capacitor.getPlatform() !== 'web') {
      try {
        await this.notificationsService.requestPermissions();
      } catch (e) {
        console.warn('Notifications plugin unavailable on web', e);
      }
    }

    await this.initialize();

    await this.notificationsService.setNext30Notifications();

    if (Capacitor.getPlatform() !== 'web') {
      try {
        await SplashScreen.hide();
        await StatusBar.setStyle({
          style: this.themeIconName === 'sunny' ? Style.Dark : Style.Light
        });
      } catch (e) {
        console.warn('StatusBar/SplashScreen plugin unavailable', e);
      }
    }
  }

  /** Load theme, banner, and pending tasks */
  private async initialize(): Promise<void> {
    // Set theme icon
    this.themeIconName = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'moon'
      : 'sunny';

    // Load saved study
    const study = await this.storageService.getStudy();
    if (!study) {
      this.enrolled = false;
      this.showLogin = true;
      this.tasks = [];
      return;
    }

    // Display banner & tasks
    this.bannerURL    = study.properties.banner_url;
    this.emptyMessage = study.properties.empty_msg;
    this.enrolled     = true;
    this.showLogin    = false;
    this.tasks        = await this.studyTasksService.getToDos();
    this.showEmpty    = this.tasks.length === 0;
  }

  /** Toggle dark/light mode */
  async toggleTheme(): Promise<void> {
    const toDark = this.themeIconName === 'sunny';
    document.body.classList.toggle('dark');
    this.themeIconName = toDark ? 'moon' : 'sunny';
    await StatusBar.setStyle({ style: toDark ? Style.Dark : Style.Light });
  }

  /** Go to QR scanner */
  scanQR(): Promise<boolean> {
    return this.navController.navigateForward('/scanner');
  }

  /** Prompt for full URL enrollment */
  async enterURL(): Promise<void> {
    const alert = await this.alertController.create({
      header: await this.translate.get('btn_enter_url').toPromise(),
      inputs: [{ name: 'url', type: 'url', placeholder: 'https://…' }],
      buttons: [
        { text: await this.translate.get('btn_cancel').toPromise(), role: 'cancel' },
        { text: await this.translate.get('btn_enrol').toPromise(),
          handler: data => this.enrolInStudy(data.url) }
      ]
    });
    await alert.present();
  }

  /** Prompt for Study ID enrollment */
  async enterStudyID(): Promise<void> {
    const alert = await this.alertController.create({
      header: await this.translate.get('btn_study_id').toPromise(),
      inputs: [{ name: 'id', type: 'text', placeholder: 'e.g. STUDY01' }],
      buttons: [
        { text: await this.translate.get('btn_cancel').toPromise(), role: 'cancel' },
        { text: await this.translate.get('btn_enrol').toPromise(),
          handler: data => this.enrolInStudy(data.id) }
      ]
    });
    await alert.present();
  }

  /** Enrollment flow */
  private async enrolInStudy(raw: string): Promise<void> {
    const url = this.normalizeUrl(raw);
    this.loadingService.isCaching = false;
    const label = await this.translate.get('label_loading').toPromise();
    await this.loadingService.present(label);

    try {
      const study: Study = await this.surveyDataService.downloadStudy(url);
      await this.storageService.saveStudy(study);
      await this.storageService.setEnrolmentDate(new Date());

      if (study.properties.cache) {
        this.loadingService.isCaching = true;
        await this.surveyCacheService.cacheAllMedia(study);
        this.loadingService.isCaching = false;
      }

      await this.studyTasksService.generateStudyTasks();
      await this.notificationsService.setNext30Notifications(true);
      await this.initialize();
    } catch (error: any) {
      const isURLproblem  = error.message !== 'InvalidStudyError';
      const isJSONinvalid = !isURLproblem;
      this.displayEnrolError(isJSONinvalid, isURLproblem);
    } finally {
      await this.loadingService.dismiss();
    }
  }

  /** Build full API URL */
  private normalizeUrl(raw: string): string {
    raw = (raw || '').trim();
    if (/^https?:\/\//i.test(raw)) return raw;
    if (raw.match(new RegExp(`^${this.API_PREFIX.replace('/', '\\/')}`, 'i'))) {
      return this.DOMAIN + (raw.startsWith('/') ? raw : `/${raw}`);
    }
    return `${this.DOMAIN}${this.API_PREFIX}/${raw.replace(/^\/+/, '')}`;
  }

  /** Show an error if enrollment fails */
  private async displayEnrolError(isJSONinvalid: boolean, isURLproblem: boolean): Promise<void> {
    let msg = "We couldn't load your study.";
    if (isJSONinvalid) msg = 'Invalid study format received.';
    else if (isURLproblem) msg = 'Invalid URL. Please check and try again.';
    const alert = await this.alertController.create({
      header: 'Oops…',
      message: msg,
      buttons: ['Dismiss']
    });
    await alert.present();
  }

  /** Navigate into a specific task */
  openTask(task: Task): void {
    this.navController.navigateRoot(`/${task.type}/${task.task_id}`);
  }

  /** Pull-to-refresh */
  refresh(event: any): void {
    setTimeout(async () => {
      await this.initialize();
      event.target.complete();
    }, 500);
  }
}