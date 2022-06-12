import { TestBed } from '@angular/core/testing';

import { StudyTasksService } from './study-tasks.service';

describe('StudyTasksService', () => {
 

  let service: StudyTasksService;
  let storageMock: Storage;

  beforeEach(() => {

    const storageIonicMock: any = {
      get: () => new Promise<any>((resolve, reject) => resolve('Demo Test User')),
      set: () => new Promise<any>((resolve, reject) => resolve('Demo Test User')),
     };


    TestBed.configureTestingModule({
      imports: [Storage],
      providers: [
        {
          provide: Storage,
          useValue: storageIonicMock
        }
      ]
    }).compileComponents();
    service = TestBed.inject(StudyTasksService);
    storageMock = TestBed.inject(Storage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});