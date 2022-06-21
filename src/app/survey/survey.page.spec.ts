import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyPage } from './survey.page';
import { Storage } from '@ionic/storage-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

describe('SurveyPage', () => {
  let component: SurveyPage;
  let fixture: ComponentFixture<SurveyPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        Storage,
        StatusBar,
        HttpClient,
        HttpHandler,
        HTTP,
        InAppBrowser,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
