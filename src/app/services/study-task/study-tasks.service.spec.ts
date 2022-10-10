import { TestBed } from '@angular/core/testing';

import { StudyTasksService } from './study-tasks.service';
import { Storage } from '@ionic/storage-angular';
import { expect } from '@jest/globals';

describe('StudyTasksService', () => {
  let service: StudyTasksService;
  let angularStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    const spyStorage = jasmine.createSpyObj('Storage', [
      'create',
      'get',
      'set',
    ]);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Storage,
          useValue: spyStorage,
        },
      ],
    }).compileComponents();
    service = TestBed.inject(StudyTasksService);
    angularStorageSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should generate study tasks', async () => {
  //   const study: Study = JSON.parse(JSON.stringify(study_object));
  //   const stubValue = study;
  //   // returns a study task and also stores it in the storage
  //   const response: object[] = await service.generateStudyTasks(study);

  //   //angularStorageSpy.get.and.returnValue(Promise.resolve(stubValue));

  //   expect(response[0])
  //     .withContext('response was same as stubValue')
  //     .toEqual(jasmine.objectContaining(study_task_list[0]));
  // });

  // it('should get all tasks from storage', async () => {
  //   const stubValue: Task[] = JSON.parse(JSON.stringify( study_task_list)) ;

  //   angularStorageSpy.get.and.returnValue(Promise.resolve(stubValue));
  //   const response: Task[] = await service.getAllTasks();

  //   expect(angularStorageSpy.get.calls.count())
  //     .withContext('spy method was called once')
  //     .toBe(1);

  //   expect(response)
  //     .withContext('response was same as stub Value')
  //     .toBe(stubValue);
  // });

  // it('should get tasks display list from storage', async () => {

  //   await angularStorageSpy.get.and.returnValue(Promise.resolve(study_task_list));

  //   const response: any = await service.getTaskDisplayList();

  //   expect(angularStorageSpy.get.calls.count())
  //     .withContext('spy method was called once')
  //     .toBe(1);

  //   expect(response)
  //     .withContext('response was same as study_object')
  //     .toEqual(study_object.modules[0].unlock_after);
  // });
});
