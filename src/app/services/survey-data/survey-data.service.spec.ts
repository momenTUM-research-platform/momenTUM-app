import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage-angular';

import { SurveyDataService } from './survey-data.service';

describe('SurveyDataService', () => {
  let service: SurveyDataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient, HttpHandler, HTTP, Storage],
    });
    service = TestBed.inject(SurveyDataService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //getRemoteData(surveyURL: string)

  it('should get remote data from survey URL', () => {
    const mockURL =
      'http://tuspl22-momentum.srv.mwn.de/api/v1/study/mpi_melatonin_validation_2022';

    service
      .getRemoteData(mockURL)
      .then((file) => {
        expect(file).toBeTruthy();
        expect(file).toContain(
          "'properties': { 'study_name': 'Demo','study_id': '3ZDOGAH','created_by': 'Adrian Shatte','instructions': 'This is a demo study showing the features of schema','post_url': 'https://tuspl22-momentum.srv.mwn.de/post.php','empty_msg': 'You're all up to date','banner_url': 'https://getschema.app/img/schema_banner.png','support_url': 'https://getschema.app','support_email': 'hello@getschema.app','conditions': ['Control','Treatment'],'cache': false,'ethics': 'This study was approved by ethics body with approval #123456789','pls': 'https://getschema.app/pls-file-link.pdf'}"
        );

      })
      .catch((error) => {
        console.log(error);
      });

    const mockRequest = httpTestingController.expectOne(
      mockURL
    );

    // expect(mockRequest.request.method).toEqual('GET');

    // // Resolve with our mock data
    // mockRequest.flush(mockResponse);

  });

  //async saveToLocalStorage(key, data)

  //sendSurveyDataToServer(surveyData)

  //logPageVisitToServer(logEvent)

  //uploadPendingData(dataType)

  //attemptHttpPost(postURL, bodyData)
});
