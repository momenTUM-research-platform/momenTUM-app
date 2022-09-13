import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyPage } from './survey.page';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

describe('SurveyPage', () => {
  let component: SurveyPage;
  let fixture: ComponentFixture<SurveyPage>;

  let angularStorageSpy: jasmine.SpyObj<Storage>;


  beforeEach(() => {

    const spyStorage = jasmine.createSpyObj('Storage', ['create', 'get', 'set']);

    TestBed.configureTestingModule({
      declarations: [SurveyPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: Storage,
          useValue: spyStorage
        },
        HttpClient,
        HttpHandler,
        HTTP,
        InAppBrowser
      ],

    }).compileComponents();

    fixture = TestBed.createComponent(SurveyPage);
    angularStorageSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
