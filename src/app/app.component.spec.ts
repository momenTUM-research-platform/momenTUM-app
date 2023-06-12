import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@ionic/storage-angular';
import { SurveyDataService } from './services/survey-data/data.service';
import { Router } from '@angular/router';
import { BarcodeService } from './services/barcode/barcode.service';
import study_tasks from '../../cypress/fixtures/study_tasks.json';
import { NotificationsService } from './services/notification/notifications.service';
import { StorageService } from './services/storage/storage.service';
import {
  ActionPerformed,
  LocalNotificationSchema,
} from '@capacitor/local-notifications';
import { of, Subscription } from 'rxjs';

describe('AppComponent', () => {
  let platformReadySpy;
  let platformSpy;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router;

  beforeEach(waitForAsync(() => {
    platformReadySpy = Promise.resolve();
    platformSpy = {
      ...jasmine.createSpyObj('Platform', { ready: platformReadySpy }),
      pause: of(),
      resume: of(),
    };
    router = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [AppRoutingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: Router, useValue: router },
        Storage,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInIt', async () => {
    const barcodeService = fixture.debugElement.injector.get(BarcodeService);
    const platformService = fixture.debugElement.injector.get(Platform);
    const notificationService =
      fixture.debugElement.injector.get(NotificationsService);
    const storageService = fixture.debugElement.injector.get(StorageService);

    const spyInit = spyOn(storageService, 'init').and.returnValue(
      Promise.resolve()
    );

    const spyPlatformPause = spyOn(
      platformService.pause,
      'subscribe'
    ).and.callThrough();
    const spyPlatformResume = spyOn(
      platformService.resume,
      'subscribe'
    ).and.callThrough();
    const spyBarcodeCheck = spyOn(
      barcodeService,
      'checkPermission'
    ).and.returnValue(Promise.resolve());
    const spyAddListenerOnClick = spyOn(
      notificationService,
      'addListenerOnClick'
    ).and.returnValue(Promise.resolve());
    const spyFireQueuedEvents = spyOn(
      notificationService,
      'fireQueuedEvents'
    ).and.returnValue(Promise.resolve());
    await fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(spyInit).toHaveBeenCalledTimes(1);
      expect(platformSpy.ready).toHaveBeenCalled();
      expect(spyPlatformPause).toHaveBeenCalledTimes(1);
      expect(spyPlatformResume).toHaveBeenCalledTimes(1);
      expect(spyBarcodeCheck).toHaveBeenCalledTimes(1);
      expect(spyAddListenerOnClick).toHaveBeenCalledTimes(1);
      expect(spyFireQueuedEvents).toHaveBeenCalledTimes(1);
    });
  });

  it('should initialize the app', async () => {
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
  });

  it('should add a listener to the Functions', async () => {
    const surveyDataService =
      fixture.debugElement.injector.get(SurveyDataService);
    const barcodeService = fixture.debugElement.injector.get(BarcodeService);
    spyOn(barcodeService, 'checkPermission').and.returnValue(Promise.resolve());
    const spylogPageVisitToServer = spyOn(
      surveyDataService,
      'logPageVisitToServer'
    ).and.returnValue(Promise.resolve());
    const stubValueTasks: Task[] = JSON.parse(
      JSON.stringify(study_tasks.tasks)
    );
    const notification = {
      title: stubValueTasks[0].alert_title,
      body: stubValueTasks[0].alert_message,
      id: stubValueTasks[0].task_id,
      smallIcon: 'res://notification_icon',
      largeIcon: 'res//notification_icon',
      largeBody: stubValueTasks[0].alert_message,
      summaryText: stubValueTasks[0].alert_title,
      extra: {
        task_index: stubValueTasks[0].index,
        task_id: stubValueTasks[0].task_id,
        task_time: stubValueTasks[0].time,
      },
      ongoing: false,
      autoCancel: false,
      schedule: {
        at: new Date(Date.parse(stubValueTasks[0].time)),
      },
    } as LocalNotificationSchema;

    const notificationAction = {
      actionId: 'id',
      inputValue: 'test',
      notification,
    } as ActionPerformed;

    await component.listenerFunc(notificationAction);
    await fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(spylogPageVisitToServer).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalled();
    });
  });
});
