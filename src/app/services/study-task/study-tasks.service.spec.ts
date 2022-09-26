import { TestBed } from '@angular/core/testing';

import { StudyTasksService } from './study-tasks.service';
import { Storage } from '@ionic/storage-angular';
import { Task, Study } from '../../models/types';

describe('StudyTasksService', () => {
  let service: StudyTasksService;
  let angularStorageSpy: jasmine.SpyObj<Storage>;

  const study_object = {
    properties: {
      study_name: 'Demo',
      study_id: '3ZDOGAH',
      created_by: 'Adrian Shatte',
      instructions: 'This is a demo study showing the features of schema',
      post_url: 'https://tuspl22-momentum.srv.mwn.de/post.php',
      empty_msg: "You're all up to date",
      banner_url: 'https://getschema.app/img/schema_banner.png',
      support_url: 'https://getschema.app',
      support_email: 'hello@getschema.app',
      conditions: ['Control', 'Treatment'],
      cache: false,
      ethics: 'This study was approved by ethics body with approval #123456789',
      pls: 'https://getschema.app/pls-file-link.pdf',
    },
    modules: [
      {
        type: 'survey',
        name: 'Elements',
        submit_text: 'Submit',
        alerts: {
          title: 'Elements Demo',
          message: 'Tap to open app',
          duration: 1,
          times: [
            {
              hours: 9,
              minutes: 30,
            },
          ],
          random: true,
          random_interval: 30,
          sticky: false,
          sticky_label: '',
          timeout: true,
          timeout_after: 30,
          start_offset: 1,
        },
        graph: {
          display: true,
          title: 'Slider Graph',
          blurb:
            'This graph displays the values from the slider element as a bar graph, displaying the past 7 responses.',
          variable: 'slider-0yih1evt',
          type: 'bar',
          max_points: 7,
        },
        sections: [
          {
            name: 'Section 1',
            questions: [
              {
                id: 'instruction-pvke1yey',
                type: 'instruction',
                text: 'This is an instruction type.',
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
        condition: '*',
        uuid: 'dee87a08-8616-453a-9a6e-9e8f8ea9c942',
        unlock_after: [],
      },
    ],
  };

  const study_task_list = [{
    uuid: study_object.modules[0].uuid,
    name: study_object.modules[0].name,
    unlock_after: study_object.modules[0].unlock_after,
    sticky: study_object.modules[0].alerts.sticky,
    sticky_label: study_object.modules[0].alerts.sticky_label,
    alert_title: study_object.modules[0].alerts.title,
    alert_message: study_object.modules[0].alerts.message,
    timeout: study_object.modules[0].alerts.timeout,
    timeout_after: study_object.modules[0].alerts.timeout_after
  }];

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
