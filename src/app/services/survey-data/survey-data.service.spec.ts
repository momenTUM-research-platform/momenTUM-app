import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SurveyDataService } from './survey-data.service';
import study_tasks from '../../../../cypress/fixtures/study_tasks.json';
import { StorageService } from '../storage/storage.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { BarcodeService } from '../barcode/barcode.service';

describe('SurveyDataService', () => {
  let service: SurveyDataService;
  let httpClientSpy: Spy<HttpClient>;
  let httpTestingController: HttpTestingController;
  let StorageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageServiceeSpy', [
      'init',
      'set',
      'get',
      'keys',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        BarcodeService,
        { provide: StorageService, useValue: storageSpy },
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
      ],
    });
    service = TestBed.inject(SurveyDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
    StorageServiceSpy = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;

    httpClientSpy = TestBed.inject<any>(HttpClient);
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

  it('should attempt to http post', async () => {
    const url = 'http://localhost:3001/api/surveys/study_for_ios';
    const bodyData = new FormData();
    bodyData.append('TestKey', 'TestValue');

    httpClientSpy.post.and.nextWith(bodyData);
    const result: any = await service.attemptHttpPost(url, bodyData);
    expect(bodyData)
      .withContext('making sure the post body data is the same')
      .toEqual(result);
    expect(httpClientSpy.post.calls.count())
      .withContext('Has the same post count')
      .toBe(1);
  });

  it('should send survery data to the server', async () => {
    const stubValueTasks: string = JSON.stringify(study_tasks.tasks);
    const stubValueuuid: string = JSON.stringify('study_tasks.uuid');
    const stubValueStudy: string = JSON.stringify(study_tasks.study);
    const bodyData = new FormData();
    httpClientSpy.post.and.nextWith(bodyData);
    // Making the return value of the get function call to be stubValue
    await StorageServiceSpy.get.and.returnValue(
      Promise.resolve(stubValueTasks)
    );
    await StorageServiceSpy.get.and.returnValue(Promise.resolve(stubValueuuid));
    await StorageServiceSpy.get.and.returnValue(
      Promise.resolve(stubValueStudy)
    );

    const response: Responses = {};

    const data1: SurveyData = {
      module_index: 1,
      module_name: 'string',
      responses: response,
      response_time: 'string',
      response_time_in_ms: 1,
      alert_time: 'string',
    };

    const data2: SurveyData = {
      module_index: 2,
      module_name: 'string',
      entries: [2, 4, 6],
      response_time: 'string',
      response_time_in_ms: 2,
      alert_time: 'string',
    };

    expect(service.sendSurveyDataToServer(data1))
      .withContext('data is responses to questions')
      .toBeTruthy();

    expect(service.sendSurveyDataToServer(data2))
      .withContext('data is pvt entries')
      .toBeTruthy();

  });

  it('should log page visit to the server', async () => {
    const stubValueStudy: string = JSON.stringify(study_tasks.study);
    const bodyData = new FormData();
    httpClientSpy.post.and.nextWith(bodyData);
    await StorageServiceSpy.get.and.returnValue(
      Promise.resolve(stubValueStudy)
    );
    const log: LogEvent = {
      timestamp: 'string',
      milliseconds: 2,
      page: 'string',
      event: 'string',
      module_index: 1,
    } as LogEvent;

    expect(service.logPageVisitToServer(log)).toBeTruthy();
  });

  it('should upload pending data to the server and also locally', async () => {
    const stubValue: string = JSON.stringify(study_tasks.study);
    const bodyData = new FormData();
    httpClientSpy.post.and.nextWith(bodyData);
    // Making the return value of the get function call to be stubValue
    await StorageServiceSpy.get.and.returnValue(Promise.resolve(stubValue));
    await StorageServiceSpy.keys.and.returnValue(
      Promise.resolve(['1', '2', '3'])
    );

    const dataType1 = 'pending-log';
    const dataType2 = 'pending-data';

    expect(service.uploadPendingData(dataType1))
      .withContext('data type is "pending-log"')
      .toBeTruthy();

    expect(service.uploadPendingData(dataType2))
      .withContext('data type is "pending-data"')
      .toBeTruthy();
  });
});
