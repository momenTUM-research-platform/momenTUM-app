import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ProgressPage } from './progress.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  DEFAULT_LANGUAGE,
  TranslateLoader,
  TranslateModule,
  USE_DEFAULT_LANG,
  USE_EXTEND,
  USE_STORE,
} from '@ngx-translate/core';
import { LanguageLoader } from '../../app.module';

describe('ProgressPage', () => {
  let component: ProgressPage;
  let fixture: ComponentFixture<ProgressPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressPage],
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
        HttpClient,
        Storage,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
