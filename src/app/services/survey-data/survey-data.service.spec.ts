import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Study } from 'src/app/models/types';
import { SurveyDataService } from './survey-data.service';
import study_tasks from '../../../../cypress/fixtures/study_tasks.json';
import { StorageService } from '../storage/storage.service';

describe('SurveyDataService', () => {
  let service: SurveyDataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let StorageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageServiceeSpy', [
      'init',
      'set',
      'get',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: StorageService, useValue: storageSpy },
      ],
    });
    service = TestBed.inject(SurveyDataService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    StorageServiceSpy = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get remote data from a URL', async () => {
    const localURL = 'http://localhost:3001/api/surveys/study_for_ios.json';
    const data: any = await service.getRemoteData(localURL);
    const parsedData: Study = JSON.parse(JSON.stringify(data));
    const study: Study = JSON.parse(JSON.stringify(study_tasks.study));
    expect(parsedData.properties.study_id)
      .withContext('Making sure we have the same count')
      .toEqual(study.properties.study_id);
  });

  it('should save to local storage and get it', async () => {
    const study: Study = JSON.parse(JSON.stringify(study_tasks.study));
    const data = 'Data';
    await StorageServiceSpy.init();
    await service.saveToLocalStorage('Test', data);
    StorageServiceSpy.get.and.returnValue(Promise.resolve(data));
    const value: any = await service.getFromLocalStorage('Test');
    expect(data)
      .withContext('Making sure we have the same count')
      .toEqual(value);
  });


  /**
  sendSurveyDataToServer
  logPageVisitToServer
  uploadPendingData
  attemptHttpPost
   */
});
