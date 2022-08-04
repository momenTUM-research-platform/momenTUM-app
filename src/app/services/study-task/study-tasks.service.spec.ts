import { TestBed } from '@angular/core/testing';

import { StudyTasksService } from './study-tasks.service';
import { Storage } from '@ionic/storage-angular';

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

  it('should get all tasks from storage', async () => {
    const stubValue = 'study-tasks';

    angularStorageSpy.get.and.returnValue(Promise.resolve(stubValue));
    const response: string = await service.getAllTasks();

    expect(angularStorageSpy.get.calls.count())
      .withContext('spy method was called once')
      .toBe(1);

    expect(response)
      .withContext('response was same as stubValue')
      .toBe(stubValue);
  });



  it('should get tasks display list from storage', async () => {

    const study_object = {
      properties: {
        study_name: 'Demo',
        study_id: '3ZDOGAH',
        created_by: 'Adrian Shatte',
        instructions: 'This is a demo study showing the features of schema',
        post_url: 'https://getschema.app/demo_post.php',
        empty_msg: "You're all up to date",
        banner_url: 'https://getschema.app/img/schema_banner.png',
        support_url: 'https://getschema.app',
        support_email: 'hello@getschema.app',
        conditions: ['Control', 'Treatment'],
        cache: false,
        ethics:
          'This study was approved by ethics body with approval #123456789',
        pls: 'https://getschema.app/pls-file-link.pdf',
      },
      modules: [
        {
          type: 'info',
          name: 'Welcome',
          submit_text: 'Submit',
          alerts: {
            title: 'Welcome to the study',
            message: 'Tap to open the app',
            duration: 1,
            times: [
              {
                hours: 8,
                minutes: 30,
              },
            ],
            random: true,
            random_interval: 30,
            sticky: true,
            sticky_label: 'Start here',
            timeout: false,
            timeout_after: 0,
            start_offset: 0,
          },
          graph: {
            display: false,
          },
          sections: [
            {
              name: 'Welcome',
              questions: [
                {
                  id: 'instruction-1wnjocfw',
                  type: 'instruction',
                  text: 'Hello! Welcome to the study! This module only shows for those enrolled in the control condition.',
                  required: false,
                  hide_id: '',
                  hide_value: '',
                  hide_if: true,
                },
              ],
              shuffle: false,
            },
          ],
          shuffle: false,
          condition: 'Control',
          uuid: '3fb09fcd-4fca-4074-a395-34d65ee5a521',
          unlock_after: [],
        },
      ],
    };

    await angularStorageSpy.get.and.returnValue(Promise.resolve(study_object));

    const response: any = await service.getTaskDisplayList();



    expect(angularStorageSpy.get.calls.count())
      .withContext('spy method was called once')
      .toBe(1);

    expect(response)
      .withContext('response was same as stubValue')
      .toEqual([]);
  });
});
