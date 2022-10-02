import { IonicModule } from '@ionic/angular';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HTTP } from '@ionic-native/http/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SurveyDataService } from '../../services/survery-data/survey-data.service';
import { StudyTasksService } from '../../services/study-task/study-tasks.service';
import { SurveyCacheService } from '../../services/survery-cache/survey-cache.service';
import { UuidService } from '../../services/uuid/uuid.service';
import { LoadingService } from '../../services/loading/loading-service.service';
import { NotificationsService } from '../../services/notification/notifications.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationStart } from '@angular/router';
import { TranslateConfigService } from '../../translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import * as moment from 'moment';

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

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let BarcodeScannerSpy: jasmine.SpyObj<BarcodeScanner>;
  let SurveyDataServiceSpy: jasmine.SpyObj<SurveyDataService>;
  let NotificationsServiceSpy: jasmine.SpyObj<NotificationsService>;
  let SurveyCacheServiceSpy: jasmine.SpyObj<SurveyCacheService>;
  let StudyTasksServiceSpy: jasmine.SpyObj<StudyTasksService>;
  let UuidServiceSpy: jasmine.SpyObj<UuidService>;
  let RouterSpy: jasmine.SpyObj<Router>;
  let PlatformSpy: jasmine.SpyObj<Platform>;
  let StatusBarSpy: jasmine.SpyObj<StatusBar>;
  let LoadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let AlertControllerSpy: jasmine.SpyObj<AlertController>;
  let LocalNotificationsSpy: jasmine.SpyObj<LocalNotifications>;
  let StorageSpy: jasmine.SpyObj<Storage>;
  let TranslateConfigServiceSpy: jasmine.SpyObj<TranslateConfigService>;
  let TranslateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(waitForAsync(() => {
    const surveySpy = jasmine.createSpyObj('SurveyDataServiceSpy', [
      'logPageVisitToServer',
      'uploadPendingData',
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
        { provide: SurveyDataService, useValue: surveySpy },
        { provide: USE_DEFAULT_LANG, useValue: true },
        { provide: USE_STORE, useValue: true },
        { provide: USE_EXTEND, useValue: true },
        { provide: DEFAULT_LANGUAGE, useValue: 'en' },
        BarcodeScanner,
        HTTP,
        Storage,
        LocalNotifications,
        FileTransfer,
        File,
        StatusBar,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Jasmine Implmentation
    // Inject both the service-to-test and its (spy) dependency
    SurveyDataServiceSpy = TestBed.inject(
      SurveyDataService
    ) as jasmine.SpyObj<SurveyDataService>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
