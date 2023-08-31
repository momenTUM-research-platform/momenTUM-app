import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, InjectionToken } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UrlSerializer } from '@angular/router';
import {
  DEFAULT_LANGUAGE,
  TranslateLoader,
  TranslateModule,
  USE_DEFAULT_LANG,
  USE_EXTEND,
  USE_STORE,
} from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LanguageLoader } from '../../app.module';
import { SettingsPage } from './settings.page';
import { StorageService } from 'src/app/services/storage/storage.service';
import study_tasks from '../../../../cypress/fixtures/study_tasks.json';
import { DataService } from 'src/app/services/data/data.service';
import { MockAlert, MockAlertController } from 'test-config/mocks-ionic';
import { NotificationsService } from 'src/app/services/notification/notifications.service';
import { Browser } from '@capacitor/browser';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;
  let browserSpy: jasmine.SpyObj<typeof Browser>;

  beforeEach(() => {
    browserSpy = jasmine.createSpyObj('Browser', ['open']);

    // Set up the spy to return null whenever it's called
    browserSpy.open.and.callFake(() => null);

    TestBed.configureTestingModule({
      declarations: [SettingsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
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
        { provide: USE_DEFAULT_LANG, useValue: true },
        { provide: USE_STORE, useValue: true },
        { provide: USE_EXTEND, useValue: true },
        { provide: DEFAULT_LANGUAGE, useValue: 'en' },
        { provide: AlertController, useValue: new MockAlertController() },
        { provide: Browser, useValue: browserSpy },
        Storage,
        UrlSerializer,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Testing functions', async () => {
    let spyStorageGet;
    let spylogPageVisitToServer;
    let spyUploadPendingData;
    let spyStorageRemoveItem;
    let spyNotificationCancelAll;
    let spyNavigateRoot;
    let spySetNext30Notifications;
    let spyStorageSet;

    beforeEach(async () => {
      const stubValueStudy: string = JSON.stringify(study_tasks.study);
      const stubValue: string = JSON.stringify(study_tasks.tasks_display);
      const stubValueTask: Task[] = JSON.parse(
        JSON.stringify(study_tasks.tasks)
      );
      const uniqueId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);

      const storageServiceCtrl =
        fixture.debugElement.injector.get(StorageService);
      const surveyDataService = fixture.debugElement.injector.get(DataService);
      const notificationService =
        fixture.debugElement.injector.get(NotificationsService);
      const navController = fixture.debugElement.injector.get(NavController);

      spylogPageVisitToServer = spyOn(
        surveyDataService,
        'logPageVisitToServer'
      ).and.returnValue(Promise.resolve());

      spyStorageGet = spyOn(storageServiceCtrl, 'get').and.callFake((param) => {
        if (param === 'current-study') {
          return Promise.resolve(stubValueStudy);
        }
        if (param === 'uuid') {
          return Promise.resolve(uniqueId);
        }
        if (param === 'uuid-set') {
          return Promise.resolve(false);
        }
        if (param === 'notifications-enabled') {
          return Promise.resolve(true);
        }
        if (param === 'study-tasks') {
          return Promise.resolve(JSON.stringify(stubValueTask));
        }
        return null;
      });
      spyStorageRemoveItem = spyOn(
        storageServiceCtrl,
        'removeItem'
      ).and.callFake((param) => {
        if (param === 'current-study') {
          return Promise.resolve(stubValueStudy);
        }
        if (param === 'study-tasks') {
          return Promise.resolve(JSON.stringify(stubValueTask));
        }
        return null;
      });
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

      spyNotificationCancelAll = spyOn(
        notificationService,
        'cancelAll'
      ).and.callThrough();

      spyNavigateRoot = spyOn(navController, 'navigateRoot').and.returnValue(
        Promise.resolve(true)
      );
      spySetNext30Notifications = spyOn(
        notificationService,
        'setNext30Notifications'
      ).and.returnValue(Promise.resolve());
      spyStorageSet = spyOn(storageServiceCtrl, 'set').and.callFake((param) => {
        if (param === 'notifications-enabled') {
          return Promise.resolve();
        }
        return null;
      });
    });
    it('should call ionViewWillEnter', async () => {
      component.ionViewWillEnter();
      fixture.detectChanges();
      await fixture.whenStable();
      expect(spyStorageGet).toHaveBeenCalledTimes(3);
      expect(component.isEnrolled).toBe(true);
      expect(component.notificationsEnabled).toBe(true);
      expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
    });
    it('should call ionViewWillLeave', async () => {
      component.isEnrolled = true;
      expect(component.isEnrolled).toBe(true);
      component.ionViewWillLeave();
      expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
    });
    it('should call withdrawFromStudy', async () => {
      const mockAlertController = fixture.debugElement.injector.get(
        AlertController
      ) as any as MockAlertController;
      const alertSpy = jasmine.createSpyObj(MockAlert, ['present']);
      const alertControllerStub = spyOn(
        mockAlertController,
        'create'
      ).and.returnValue(Promise.resolve(alertSpy));

      await component.withdrawFromStudy();
      expect(alertControllerStub).toHaveBeenCalledTimes(1);
      expect(alertSpy.present).toHaveBeenCalledTimes(1);
      const [alertArg] = alertControllerStub.calls.mostRecent().args;
      alertArg.buttons[1].handler();
      await fixture.whenStable();
      expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
      expect(spyUploadPendingData).toHaveBeenCalledTimes(2);
      expect(spyStorageRemoveItem).toHaveBeenCalledTimes(2);
      expect(spyNotificationCancelAll).toHaveBeenCalledTimes(1);
      expect(spyNavigateRoot).toHaveBeenCalledTimes(1);
      expect(spyNavigateRoot).toHaveBeenCalledWith('/');
    });
    it('should toggle Notifications', async () => {
      await component.toggleNotifications();
      expect(spySetNext30Notifications).toHaveBeenCalledTimes(1);
      expect(spyStorageSet).toHaveBeenCalledTimes(1);
    });
  });
});

/**
 * openSupportEmail
 * openSupportURL
 *    End-to-End testing
 */
