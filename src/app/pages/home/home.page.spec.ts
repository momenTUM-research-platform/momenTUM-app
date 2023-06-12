import { IonicModule, IonIcon, AlertController } from '@ionic/angular';
import { RefresherCustomEvent } from '@ionic/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { SurveyDataService } from '../../services/survey-data/data.service';
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
import { StatusBar, StatusBarPlugin } from '@capacitor/status-bar';
import { ChangeTheme } from '../../shared/change-theme';
import { LoadingService } from '../../services/loading/loading-service.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import study_tasks from '../../../../cypress/fixtures/study_tasks.json';
import { NotificationsService } from '../../services/notification/notifications.service';
import { EmptyError } from 'rxjs';
import { StudyTasksService } from '../../services/study-task/study-tasks.service';
import { SurveyCacheService } from 'src/app/services/survey-cache/survey-cache.service';
import { MockAlert, MockAlertController } from 'test-config/mocks-ionic';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockRefresher } from '../../../../test-config/mocks-ionic';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let statusBarSpy: jasmine.SpyObj<StatusBarPlugin>;

  beforeEach(waitForAsync(() => {
    statusBarSpy = jasmine.createSpyObj<StatusBarPlugin>('StatusBar', [
      'setStyle',
      'setBackgroundColor',
    ]);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: LanguageLoader,
            deps: [HttpClient],
          },
        }),
        IonicModule.forRoot({
          _testing: true,
        }),
      ],
      providers: [
        { provide: AlertController, useValue: new MockAlertController() },
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
    statusBarSpy = jasmine.createSpyObj<StatusBarPlugin>('StatusBar', [
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
    expect(el.getAttribute('name')).toEqual('sunny');

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

  describe('Testing functions', async () => {
    let spyStorageGet;
    let spyStorageSet;
    let spyStorageInit;
    let spyLoadingServicePresent;
    let spyLoadingServiceDismiss;
    let spylogPageVisitToServer;
    let spyrequestPermissions;
    let spySetNext30Notifications;
    let spyUploadPendingData;
    let spyGetTaskDisplayList;
    let spyCacheAllMedia;
    let spyGenerateStudyTasks;
    let spyGetRemoteData;

    beforeEach(async () => {
      const stubValueStudy: string = await JSON.stringify(study_tasks.study);
      const stubValue: string = JSON.stringify(study_tasks.tasks_display);
      const stubValueTask: Task[] = JSON.parse(
        JSON.stringify(study_tasks.tasks)
      );
      const uniqueId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
      const studyTaskServiceCtrl =
        fixture.debugElement.injector.get(StudyTasksService);
      const storageServiceCtrl =
        fixture.debugElement.injector.get(StorageService);
      const surveyDataService =
        fixture.debugElement.injector.get(SurveyDataService);
      const surveyCacheService =
        fixture.debugElement.injector.get(SurveyCacheService);
      const notificationService =
        fixture.debugElement.injector.get(NotificationsService);
      const loadCtrl = fixture.debugElement.injector.get(LoadingService);

      spyGetTaskDisplayList = spyOn(
        studyTaskServiceCtrl,
        'getTaskDisplayList'
      ).and.returnValue(Promise.resolve(JSON.parse(stubValue)));

      spyGenerateStudyTasks = spyOn(
        studyTaskServiceCtrl,
        'generateStudyTasks'
      ).and.returnValue(Promise.resolve(stubValueTask));

      spyCacheAllMedia = spyOn(
        surveyCacheService,
        'cacheAllMedia'
      ).and.callThrough();

      spyLoadingServicePresent = spyOn(loadCtrl, 'present').and.callThrough();
      spyLoadingServiceDismiss = spyOn(loadCtrl, 'dismiss').and.callThrough();
      spylogPageVisitToServer = spyOn(
        surveyDataService,
        'logPageVisitToServer'
      ).and.returnValue(Promise.resolve());
      spyGetRemoteData = spyOn(
        surveyDataService,
        'getRemoteData'
      ).and.returnValue(Promise.resolve(JSON.parse(stubValueStudy)));
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

      spyStorageSet = spyOn(storageServiceCtrl, 'set').and.callFake((param) => {
        if (param === 'condition') {
          return Promise.resolve();
        }
        if (param === 'study-tasks') {
          return Promise.resolve();
        }
        if (param === 'current-study') {
          return Promise.resolve();
        }
        if (param === 'enrolment-date') {
          return Promise.resolve();
        }
        return null;
      });

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
        if (param === 'notifications-enabled') {
          return Promise.resolve(false);
        }
        if (param === 'study-tasks') {
          return Promise.resolve(JSON.stringify(stubValueTask));
        }

        return null;
      });
    });

    it('should call ionViewWillEnter', async () => {
      // Check assignment
      await component.ionViewWillEnter();
      expect(component.darkMode).toBeDefined();
      expect(spyrequestPermissions).toHaveBeenCalledTimes(1);
      expect(spyLoadingServicePresent).toHaveBeenCalledTimes(1);
      expect(component.hideEnrolOptions).toBe(true);
      expect(component.isEnrolledInStudy).toBe(false);
      expect(spyStorageGet).toHaveBeenCalledTimes(3);
      expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
      expect(spyGetTaskDisplayList).toHaveBeenCalledTimes(1);
      expect(spySetNext30Notifications).toHaveBeenCalledTimes(1);
      expect(spyUploadPendingData).toHaveBeenCalledTimes(2);
      expect(spyStorageSet).toHaveBeenCalledTimes(3);
    });

    it('should call attempt To Download Study', async () => {
      const stubValueStudy: Study = JSON.parse(
        JSON.stringify(study_tasks.study)
      );
      // Check assignment
      const localURL = 'http://localhost:3001/api/surveys/study_for_ios.json';
      await component.attemptToDownloadStudy(localURL, false, false);
      await fixture.whenStable();
      expect(component.isEnrolledInStudy).toBe(true);
      expect(component.hideEnrolOptions).toBe(true);
      expect(spyStorageSet).toHaveBeenCalledTimes(2);
      expect(spyGetRemoteData).toHaveBeenCalledTimes(1);
      expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
      expect(spyLoadingServiceDismiss).toHaveBeenCalledTimes(1);
      expect(spyLoadingServicePresent).toHaveBeenCalled();
      expect(component.study).toEqual(stubValueStudy);
      expect(spyGenerateStudyTasks).toHaveBeenCalledTimes(1);
      expect(spySetNext30Notifications).toHaveBeenCalledTimes(1);
      expect(spyGetTaskDisplayList).toHaveBeenCalledTimes(1);
    });

    it('should call attempt To Enroll in a study', async () => {
      const stubValueStudy: Study = JSON.parse(
        JSON.stringify(study_tasks.study)
      );
      await component.enrolInStudy(stubValueStudy);
      await fixture.whenStable();
      expect(component.isEnrolledInStudy).toBe(true);
      expect(component.hideEnrolOptions).toBe(true);
      expect(component.study).toEqual(stubValueStudy);
      expect(spyStorageSet).toHaveBeenCalledTimes(2);
      expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
      expect(spyLoadingServiceDismiss).toHaveBeenCalledTimes(1);
      expect(spyCacheAllMedia).toHaveBeenCalledTimes(1);
      expect(spyGenerateStudyTasks).toHaveBeenCalledTimes(1);
      expect(spySetNext30Notifications).toHaveBeenCalledTimes(1);
      //expect(spyGetTaskDisplayList).toHaveBeenCalledTimes(1);
    });
    it('should call ionViewWillLeave', async () => {
      // Check assignment
      component.isEnrolledInStudy = true;
      expect(component.isEnrolledInStudy).toBe(true);
      await component.ionViewWillLeave();
      expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
      expect(spyUploadPendingData).toHaveBeenCalledTimes(2);
    });
    it('should call attempt to enter URL', async () => {
      const localURL = 'http://localhost:3001/api/surveys/study_for_ios.json';
      const stubValueStudy: Study = JSON.parse(
        JSON.stringify(study_tasks.study)
      );
      const mockAlertController = fixture.debugElement.injector.get(
        AlertController
      ) as any as MockAlertController;
      const alertSpy = jasmine.createSpyObj(MockAlert, ['present']);
      const alertControllerStub = spyOn(
        mockAlertController,
        'create'
      ).and.returnValue(Promise.resolve(alertSpy));

      await component.enterURL();
      expect(alertControllerStub).toHaveBeenCalledTimes(1);
      expect(alertSpy.present).toHaveBeenCalledTimes(1);
      const [alertArg] = alertControllerStub.calls.mostRecent().args;
      alertArg.buttons[1].handler(localURL);
      await fixture.whenStable();
      expect(component.isEnrolledInStudy).toBe(true);
      expect(component.hideEnrolOptions).toBe(true);
      expect(spyStorageSet).toHaveBeenCalledTimes(2);
      expect(spyGetRemoteData).toHaveBeenCalledTimes(1);
      expect(spyLoadingServicePresent).toHaveBeenCalledTimes(1);
      expect(component.study).toEqual(stubValueStudy);
    });
    it('should call attempt to enter Study ID', async () => {
      const ID = '3ZDOGRH';
      const mockAlertController = fixture.debugElement.injector.get(
        AlertController
      ) as any as MockAlertController;
      const alertSpy = jasmine.createSpyObj(MockAlert, ['present']);
      const alertControllerStub = spyOn(
        mockAlertController,
        'create'
      ).and.returnValue(Promise.resolve(alertSpy));
      await component.enterStudyID();
      await fixture.whenStable();
      expect(alertControllerStub).toHaveBeenCalledTimes(1);
      expect(alertSpy.present).toHaveBeenCalledTimes(1);
      const [alertArg] = alertControllerStub.calls.first().args;
      alertArg.buttons[1].handler(ID);
      expect(spyGetRemoteData).toHaveBeenCalledTimes(1);
    });
    it('should call load Study Details', async () => {
      await component.loadStudyDetails();
      expect(component.isEnrolledInStudy).toBe(true);
      expect(component.hideEnrolOptions).toBe(true);
      expect(spyGetTaskDisplayList).toHaveBeenCalledTimes(1);
    });
  });

  it('should call attempt display enrol error', async () => {
    const mockAlertController = fixture.debugElement.injector.get(
      AlertController
    ) as any as MockAlertController;
    const alert = jasmine.createSpyObj(MockAlert, ['present']);
    const alertControllerStub = spyOn(
      mockAlertController,
      'create'
    ).and.returnValue(Promise.resolve(alert));
    await component.displayEnrolError(true, true, true, true);
    expect(alertControllerStub).toHaveBeenCalledTimes(1);
    expect(alert.present).toHaveBeenCalledTimes(1);
    const [alertArg] = alertControllerStub.calls.mostRecent().args;
    expect(alertArg.header).toBe('Oops...');
  });
  it('should call attempt to display barcode error', async () => {
    const mockAlertController = fixture.debugElement.injector.get(
      AlertController
    ) as any as MockAlertController;

    const alert = {
      header: 'Permission Required',
      message:
        'Camera permission is required to scan QR codes. You can allow this permission in Settings.',
      buttons: ['Dismiss'],
    } as MockAlert;

    const alertSpy = jasmine.createSpyObj(MockAlert, ['present']);
    const alertControllerStub = spyOn(
      mockAlertController,
      'create'
    ).and.returnValue(Promise.resolve(alertSpy));

    await component.displayBarcodeError();
    expect(alertControllerStub).toHaveBeenCalledTimes(1);
    expect(alertControllerStub).toHaveBeenCalledWith(alert);
    expect(alertSpy.present).toHaveBeenCalledTimes(1);
    const [alertArg] = alertControllerStub.calls.mostRecent().args;
    expect(alertArg.header).toBe(alert.header);
  });

  it('should call attempt to sort Task List', async () => {
    const stubValueTask: Task[] = JSON.parse(JSON.stringify(study_tasks.tasks));

    component.task_list = stubValueTask;
    expect(component.task_list).toEqual(stubValueTask);
    component.sortTasksList();
    expect(component.task_list[0].index).toEqual(stubValueTask[0].index);
  });

  it('should call ionViewWillEnter and complete the refresher after a delay', (done) => {
    const myRefresherElement = jasmine.createSpyObj<HTMLIonRefresherElement>(
      'HTMLIonRefresherElement',
      ['complete']
    );
    const refresher = new MockRefresher(myRefresherElement);
    spyOn(component, 'ionViewWillEnter');

    component.doRefresh(refresher);
    expect(component.ionViewWillEnter).toHaveBeenCalled();

    setTimeout(() => {
      expect(refresher.target.complete).toHaveBeenCalled();
      done();
    }, 250);
  });
});
