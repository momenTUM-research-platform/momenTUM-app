import { IonicModule } from '@ionic/angular';

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';

import { Tab2Page } from './tab2.page';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import {
  DEFAULT_LANGUAGE,
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateParser,
  TranslateService,
  TranslateStore,
  USE_DEFAULT_LANG,
  USE_EXTEND,
  USE_STORE,
} from '@ngx-translate/core';
import { TranslateConfigService } from '../translate-config.service';
import { InjectionToken } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageLoader } from '../app.module';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab2Page],
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
        // TranslateService,
        // TranslateStore,
        // TranslateLoader,
        // TranslateCompiler,
        // TranslateParser,
        // MissingTranslationHandler,
        // TranslateConfigService,
        HttpClient,
        Storage,
        HTTP,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
