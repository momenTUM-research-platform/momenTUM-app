import { TestBed } from '@angular/core/testing';
import { StudyTasksService } from './study-tasks.service';
import study_tasks from '../../../../cypress/fixtures/study_tasks.json';
import { StorageService } from '../storage/storage.service';
import { BarcodeService } from '../../services/barcode/barcode.service';

describe('StudyTasksService', () => {
  let service: StudyTasksService;
  let StorageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageServiceeSpy', [
      'init',
      'set',
      'get',
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: StorageService, useValue: storageSpy },
        BarcodeService,
      ],
    }).compileComponents();
    service = TestBed.inject(StudyTasksService);

    // Jasmine Implmentation
    // Inject both the service-to-test and its (spy) dependency
    StorageServiceSpy = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate study tasks', async () => {
    await StorageServiceSpy.init();
    const study: Study = JSON.parse(JSON.stringify(study_tasks.study));
    const tasks: Task[] = JSON.parse(JSON.stringify(study_tasks.tasks));

    // returns a study task and also stores it in the storage
    const response: Task[] = await service.generateStudyTasks(study);

    //jasmine.objectContaining()
    expect(response.length)
      .withContext('response length was same as tasks')
      .toEqual(tasks.length);
  });

  // For testing JSONs jasmine.objectContaining(
  it('should get all tasks from storage', async () => {
    const stubValue: string = JSON.stringify(study_tasks.tasks);
    // Making the return value of the get function call to be stubValue
    StorageServiceSpy.get.and.returnValue(Promise.resolve(stubValue));
    const response: Task[] = await service.getAllTasks();

    expect(StorageServiceSpy.get.calls.count())
      .withContext('spy method was called once')
      .toBe(1);

    expect(response)
      .withContext('response was same as stubValue')
      .toEqual(JSON.parse(stubValue));
  });

  it('should get tasks display list from storage', async () => {
    const stubValue: string = JSON.stringify(study_tasks.tasks);
    const stubDisplayValue: Task[] = JSON.parse(
      JSON.stringify(study_tasks.tasks_display)
    );
    // Making the return value of the get function call to be stubValue
    StorageServiceSpy.get.and.returnValue(Promise.resolve(stubValue));
    const response: Task[] = await service.getTaskDisplayList();
    expect(StorageServiceSpy.get.calls.count())
      .withContext('spy method was called once')
      .toBe(1);

    expect(response.length)
      .withContext(
        'There are 3 different types, so with headers, 6 items are to be displayed'
      )
      .toBe(6);
    expect(response)
      .withContext('Expected to be mostly the same values')
      .toEqual(stubDisplayValue);
  });
});
