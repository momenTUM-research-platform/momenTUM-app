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
import { SurveyDataService } from './data.service';
import study_tasks from '../../../../cypress/fixtures/study_tasks.json';
import { StorageService } from '../storage/storage.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { BarcodeService } from '../barcode/barcode.service';
import { StudyTasksService } from '../study-task/study-tasks.service';
import { UuidService } from '../uuid/uuid.service';

describe('SurveyDataService', () => {
  let service: SurveyDataService;
  let httpClientSpy: Spy<HttpClient>;
  let httpTestingController: HttpTestingController;
  let StorageServiceSpy: jasmine.SpyObj<StorageService>;
  let studyTaskServiceSpy: jasmine.SpyObj<StudyTasksService>;
  let uuidServiceSpy: jasmine.SpyObj<UuidService>;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageService', [
      'init',
      'set',
      'get',
      'keys',
    ]);
    const studyTaskSpy = jasmine.createSpyObj('StudyTasksService', [
      'getAllTasks',
    ]);
    const uuidSpy = jasmine.createSpyObj('UuidService', ['generateUUID']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        BarcodeService,
        { provide: StorageService, useValue: storageSpy },
        { provide: UuidService, useValue: uuidSpy },
        { provide: StudyTasksService, useValue: studyTaskSpy },
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
      ],
    });
    service = TestBed.inject(SurveyDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
    StorageServiceSpy = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;
    studyTaskServiceSpy = TestBed.inject(
      StudyTasksService
    ) as jasmine.SpyObj<StudyTasksService>;
    uuidServiceSpy = TestBed.inject(UuidService) as jasmine.SpyObj<UuidService>;
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
    const data = 'Data';
    const key = 'Test';
    StorageServiceSpy.set
      .withArgs(key, data)
      .and.returnValue(Promise.resolve());
    await service.saveToLocalStorage(key, data);
    expect(StorageServiceSpy.set).toHaveBeenCalledWith(key, data);
    expect(StorageServiceSpy.set).toHaveBeenCalledTimes(1);
  });

  it('should save to local storage and get it', async () => {
    const data = 'Data';
    const key = 'Test';
    StorageServiceSpy.get.withArgs(key).and.returnValue(Promise.resolve(data));
    const value: any = await service.getFromLocalStorage(key);
    expect(StorageServiceSpy.get).toHaveBeenCalledTimes(1);
    expect(value).toBe(data);
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
    const stubValueStudy: string = JSON.stringify(study_tasks.study);
    const uniqueId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    const bodyData = new FormData();
    studyTaskServiceSpy.getAllTasks.and.returnValue(
      Promise.resolve(JSON.parse(stubValueTasks))
    );

    httpClientSpy.post.and.nextWith(bodyData);
    uuidServiceSpy.generateUUID.and.returnValue(uniqueId);
    StorageServiceSpy.get.and.callFake((param) => {
      if (param === 'current-study') {
        return Promise.resolve(stubValueStudy);
      }
      if (param === 'uuid') {
        return Promise.resolve(uniqueId);
      }
      return null;
    });

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

    // data is responses to questions
    await service.sendSurveyDataToServer(data1);
    // data is pvt entries
    await service.sendSurveyDataToServer(data2);

    expect(studyTaskServiceSpy.getAllTasks).toHaveBeenCalledTimes(2);
    expect(httpClientSpy.post).toHaveBeenCalledTimes(2);
    expect(uuidServiceSpy.generateUUID).toHaveBeenCalledTimes(2);
    expect(StorageServiceSpy.get).toHaveBeenCalledTimes(4);
  });

  it('should log page visit to the server', async () => {
    const stubValueStudy: string = JSON.stringify(study_tasks.study);
    const bodyData = new FormData();
    const uniqueId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);
    httpClientSpy.post.and.nextWith(bodyData);
    uuidServiceSpy.generateUUID.and.returnValue(uniqueId);
    StorageServiceSpy.get.and.callFake((param) => {
      if (param === 'current-study') {
        return Promise.resolve(stubValueStudy);
      }
      if (param === 'uuid') {
        return Promise.resolve(uniqueId);
      }
      return null;
    });
    const log: LogEvent = {
      timestamp: 'string',
      milliseconds: 2,
      page: 'string',
      event: 'string',
      module_index: 1,
    } as LogEvent;
    await service.logPageVisitToServer(log);
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
    expect(uuidServiceSpy.generateUUID).toHaveBeenCalledTimes(1);
    expect(StorageServiceSpy.get).toHaveBeenCalledTimes(2);
  });

  it('should upload pending data to the server and also locally', async () => {
    const stubValue: string = JSON.stringify(study_tasks.study);
    const bodyData = new FormData();
    httpClientSpy.post.and.nextWith(bodyData);
    // Making the return value of the get function call to be stubValue
    StorageServiceSpy.get.and.returnValue(Promise.resolve(stubValue));
    StorageServiceSpy.keys.and.returnValue(Promise.resolve(['1', '2', '3']));

    const dataType1 = 'pending-log';
    const dataType2 = 'pending-data';

    //data type is "pending-log"
    await await service.uploadPendingData(dataType1);

    //data type is "pending-data"
    await await service.uploadPendingData(dataType2);

    expect(StorageServiceSpy.get).toHaveBeenCalledTimes(2);
    expect(StorageServiceSpy.keys).toHaveBeenCalledTimes(2);
  });
});
