import { IonicModule } from '@ionic/angular';
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

import { HomePage } from './home.page';
import { BarcodeService } from '../../services/barcode/barcode.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let SurveyDataServiceSpy: jasmine.SpyObj<SurveyDataService>;

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
        BarcodeService,
        { provide: SurveyDataService, useValue: surveySpy },
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
    // Jasmine Implmentation
    // Inject both the service-to-test and its (spy) dependency
    SurveyDataServiceSpy = TestBed.inject(
      SurveyDataService
    ) as jasmine.SpyObj<SurveyDataService>;

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
