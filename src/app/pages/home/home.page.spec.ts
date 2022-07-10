import { IonicModule } from '@ionic/angular';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Storage } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { RouterTestingModule } from '@angular/router/testing';

import { StatusBar } from '@ionic-native/status-bar/ngx';
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

  beforeEach(waitForAsync(() => {
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
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
