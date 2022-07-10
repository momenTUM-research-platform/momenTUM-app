import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage-angular';

import { SurveyDataService } from './survey-data.service';

describe('SurveyDataService', () => {
  let service: SurveyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, HTTP, Storage],
    });
    service = TestBed.inject(SurveyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
