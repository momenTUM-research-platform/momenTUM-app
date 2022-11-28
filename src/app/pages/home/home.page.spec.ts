import { IonicModule, IonIcon } from '@ionic/angular';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { SurveyDataService } from '../../services/survey-data/survey-data.service';
import {
  DEFAULT_LANGUAGE,
  TranslateLoader,
  TranslateModule,
  USE_DEFAULT_LANG,
  USE_EXTEND,
  USE_STORE,
} from '@ngx-translate/core';
import { LanguageLoader } from '../../app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { HomePage } from './home.page';
import { BarcodeService } from '../../services/barcode/barcode.service';
import { StatusBar, StatusBarPlugin } from '@capacitor/status-bar';
import { ChangeTheme } from '../../shared/change-theme';
import { LoadingService } from '../../services/loading/loading-service.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import study_tasks from '../../../../cypress/fixtures/study_tasks.json';
import { NotificationsService } from '../../services/notification/notifications.service';
import { EmptyError } from 'rxjs';
import { StudyTasksService } from '../../services/study-task/study-tasks.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    const statusBarSpy = jasmine.createSpyObj<StatusBarPlugin>('StatusBar', [
      'setStyle',
      'setBackgroundColor',
    ]);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        IonicModule.forRoot(),
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: LanguageLoader,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [
        BarcodeService,
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: USE_DEFAULT_LANG, useValue: true },
        { provide: USE_STORE, useValue: true },
        { provide: USE_EXTEND, useValue: true },
        { provide: DEFAULT_LANGUAGE, useValue: 'en' },
        Storage,
        File,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme and change status bar', async () => {
    const statusBarSpy = jasmine.createSpyObj<StatusBarPlugin>('StatusBar', [
      'setStyle',
      'setBackgroundColor',
    ]);

    Object.getOwnPropertyDescriptor(
      statusBarSpy,
      'setStyle'
    ).value.and.callThrough();
    Object.getOwnPropertyDescriptor(
      statusBarSpy,
      'setBackgroundColor'
    ).value.and.callThrough();

    const el = document.querySelector('ion-icon');
    expect(el).toBeDefined();
    expect(el.getAttribute('name')).toEqual('moon');

    const el_body = document.body;
    expect(el_body).toBeDefined();
    expect(el_body.getAttribute('color-theme')).toEqual('light');

    // Because statusbar is not implemented on web
    await component.toggleTheme().then(() => {
      expect(statusBarSpy.setStyle).not.toHaveBeenCalled();
      expect(statusBarSpy.setBackgroundColor).not.toHaveBeenCalled();
    });

    await fixture.whenRenderingDone();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.getAttribute('name')).toEqual('sunny');
      expect(el_body.getAttribute('color-theme')).toEqual('dark');
    });
  });

  it('should call ngOnInIt', () => {
    fixture.whenStable().then(async () => {
      // Check assignment
      fixture.detectChanges();
      expect(ChangeTheme.preferenceColor).toBeDefined();
    });
  });
  describe('ionViewWillEnter testing', async () => {
    let spyStorageGet;
    let spyStorageSet;
    let spyStorageInit;
    let spyLoadingService;
    let spylogPageVisitToServer;
    let spyrequestPermissions;
    let spySetNext30Notifications;
    let spyUploadPendingData;
    let spyGetTaskDisplayList;

    beforeEach(async () => {
      const stubValueStudy: string = await JSON.stringify(study_tasks.study);
      const stubValue: string = JSON.stringify(study_tasks.tasks_display);
      const uniqueId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
      const studyTaskServiceCtrl =
        fixture.debugElement.injector.get(StudyTasksService);
      const storageServiceCtrl =
        fixture.debugElement.injector.get(StorageService);
      const surveyDataService =
        fixture.debugElement.injector.get(SurveyDataService);
      const notificationService =
        fixture.debugElement.injector.get(NotificationsService);
      const loadCtrl = fixture.debugElement.injector.get(LoadingService);

      spyGetTaskDisplayList = spyOn(
        studyTaskServiceCtrl,
        'getTaskDisplayList'
      ).and.returnValue(Promise.resolve(JSON.parse(stubValue)));

      spyLoadingService = spyOn(loadCtrl, 'present').and.callThrough();

      spylogPageVisitToServer = spyOn(
        surveyDataService,
        'logPageVisitToServer'
      ).and.returnValue(Promise.resolve());
      spyrequestPermissions = spyOn(
        notificationService,
        'requestPermissions'
      ).and.returnValue(Promise.resolve());
      spySetNext30Notifications = spyOn(
        notificationService,
        'setNext30Notifications'
      ).and.returnValue(Promise.resolve());
      spyUploadPendingData = spyOn(
        surveyDataService,
        'uploadPendingData'
      ).and.callFake((dataType) => {
        if (dataType === 'pending-log') {
          return Promise.resolve();
        }
        if (dataType === 'pending-data') {
          return Promise.resolve();
        }
        return null;
      });

      spyStorageSet = spyOn(storageServiceCtrl, 'set').and.returnValue(
        Promise.resolve()
      );

      spyStorageInit = spyOn(storageServiceCtrl, 'init').and.callThrough();

      spyStorageGet = spyOn(storageServiceCtrl, 'get').and.callFake((param) => {
        if (param === 'current-study') {
          return Promise.resolve(stubValueStudy);
        }
        if (param === 'uuid') {
          // throw EmptyError;
          return Promise.resolve(uniqueId);
        }
        if (param === 'uuid-set') {
          return Promise.resolve(false);
        }

        return null;
      });
    });

    it('should call ionViewWillEnter', async () => {
      // Check assignment
      await component.ionViewWillEnter();
      expect(component.darkMode).toBeDefined();
      expect(spyrequestPermissions).toHaveBeenCalledTimes(1);
      expect(spyLoadingService).toHaveBeenCalledTimes(1);
      expect(component.hideEnrolOptions).toBe(true);
      expect(component.isEnrolledInStudy).toBe(false);
      expect(spyStorageGet).toHaveBeenCalledTimes(3);
      expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
      expect(spyGetTaskDisplayList).toHaveBeenCalledTimes(1);
      expect(spySetNext30Notifications).toHaveBeenCalledTimes(1);
      expect(spyStorageSet).toHaveBeenCalledTimes(3);
    });
  });

  /**
   * ngOnInit()
   * async ionViewWillEnter()
   * ionViewWillLeave()
   * async attemptToDownloadStudy(
   * async scanBarcode()
   * async enterURL()
   * async enterStudyID()
   * async enrolInStudy(study: Study)
   * async loadStudyDetails()
   * async displayEnrolError(
   * async displayBarcodeError()
   * sortTasksList()
   * doRefresh(refresher: RefresherCustomEvent)
   *
   */

  // Jasmine Implmentation
  // it('another Jasmine waitForAsync should log page visit to server', waitForAsync(() => {
  //   const data = {
  //     timestamp: moment().format(),
  //     milliseconds: moment().valueOf(),
  //     page: 'home',
  //     event: 'enrol',
  //     module_index: -1
  //   };

  //   // Service and Function
  //   SurveyDataServiceSpy.logPageVisitToServer.and.returnValue(Promise.resolve());
  //   component.isEnrolledInStudy = true;
  //   component.ionViewWillLeave();

  //   fixture.whenStable().then(() => {
  //     expect(component.data).toBe(data);
  //   });
  // }));
});
