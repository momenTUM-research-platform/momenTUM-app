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
      providers: [ HTTP, Storage],
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
    const mockResponse = {
      properties: {
        study_id: 'mpi_melatonin_validation_2022',
        study_name: 'MPI melatonin validation study',
        instructions: '',
        banner_url:
          'https://www.mpg.de/assets/og-logo-8216b4912130f3257762760810a4027c063e0a4b09512fc955727997f9da6ea3.jpg',
        support_email: '',
        support_url: '',
        ethics: '',
        pls: '',
        empty_msg: 'No tasks available.',
        post_url: 'https://tuspl22-momentum.srv.mwn.de/api/v1/response',
        conditions: ['Default'],
        cache: false,
        created_by: 'Study for the MPI melatonin validation study',
      }
    };

    service
      .getRemoteData(mockURL)
      .then((res: any) => {
        expect(res).toBeTruthy();
        expect(res.properties).toBe(mockResponse.properties);
      })
      .catch((error) => {
        console.log(error);
      });

    const mockRequest = httpTestingController.expectOne(
      mockURL
    );

    expect(mockRequest.request.method).toEqual('GET');

    // Resolve with our mock data
    mockRequest.flush(mockResponse);
  });

  //async saveToLocalStorage(key, data)

  //sendSurveyDataToServer(surveyData)

  //logPageVisitToServer(logEvent)

  //uploadPendingData(dataType)

  //attemptHttpPost(postURL, bodyData)
});
