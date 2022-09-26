import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';

import { SurveyDataService } from './survey-data.service';

describe('SurveyDataService', () => {
  let service: SurveyDataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let angularStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    const spyStorage = jasmine.createSpyObj('Storage', [
      'create',
      'get',
      'set',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: Storage,
          useValue: spyStorage,
        },
      ],
    });
    service = TestBed.inject(SurveyDataService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    angularStorageSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // //getRemoteData(surveyURL: string)
  // it('should get remote data from survey URL', () => {
  //   const mockURL =
  //     'http://tuspl22-momentum.srv.mwn.de/api/v1/study/mpi_melatonin_validation_2022';
  //   const mockResponse = {
  //     properties: {
  //       study_id: 'mpi_melatonin_validation_2022',
  //       study_name: 'MPI melatonin validation study',
  //       instructions: '',
  //       banner_url:
  //         'https://www.mpg.de/assets/og-logo-8216b4912130f3257762760810a4027c063e0a4b09512fc955727997f9da6ea3.jpg',
  //       support_email: '',
  //       support_url: '',
  //       ethics: '',
  //       pls: '',
  //       empty_msg: 'No tasks available.',
  //       post_url: 'https://tuspl22-momentum.srv.mwn.de/api/v1/response',
  //       conditions: ['Default'],
  //       cache: false,
  //       created_by: 'Study for the MPI melatonin validation study',
  //     },
  //   };

  //   service
  //     .getRemoteData(mockURL)
  //     .then((res: any) => {
  //       expect(res).toBeTruthy();
  //       expect(res.properties).toBe(mockResponse.properties);
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });

  //   const mockRequest = httpTestingController.expectOne(
  //     mockURL + '?seed=f2d91e73'
  //   );

  //   expect(mockRequest.request.method).toEqual('GET');

  //   // Resolve with our mock data
  //   mockRequest.flush(mockResponse);
  // });

  // //async saveToLocalStorage(key, data)
  // it('should get save and get data from local storage', async () => {
  //   const key = 'KEY';
  //   const data = 'DATA';

  //   const res: any = await service.saveToLocalStorage(key, data);
  //   const saved: any = await service.getFromLocalStorage(key);

  //   expect(res).toBe(saved);
  // });

  // //sendSurveyDataToServer(surveyData)
  // it('should send survey data to the server', async () => {
  //   const current_study_key = 'current-study';
  //   const uuid_key = 'uuid';
  //   const surveyData = {
  //     module_index: 1,
  //     module_name: 'Test',
  //     responses: {
  //       ['id']: 'Test',
  //     },
  //     response_time: 'Test',
  //     response_time_in_ms: 1,
  //     alert_time: 'Test',
  //   };

  //   const saved_study: any = await service.saveToLocalStorage(
  //     current_study_key,
  //     'data'
  //   );
  //   const uuid_study: any = await service.saveToLocalStorage(
  //     current_study_key,
  //     'data'
  //   );
  //   const saved_s: any = await service.getFromLocalStorage(current_study_key);
  //   const saved_u: any = await service.sendSurveyDataToServer(uuid_study);


  //   expect(saved_study).toBe(saved_s);
  //   expect(uuid_study).toBe(saved_u);



  // });

  // //logPageVisitToServer(logEvent)

  // //uploadPendingData(dataType)

  // //attemptHttpPost(postURL, bodyData)
  // it('should attempt HTTP post', async () => {
  //   //await service.attemptHttpPost();
  // });
});
