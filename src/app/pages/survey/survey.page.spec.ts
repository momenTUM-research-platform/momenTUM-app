import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyPage } from './survey.page';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BarcodeService } from '../../services/barcode/barcode.service';
import study_tasks from '../../../../cypress/fixtures/study_tasks.json';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('SurveyPage', () => {
  let component: SurveyPage;
  let fixture: ComponentFixture<SurveyPage>;
  let routeStub;
  let StorageServiceSpy: jasmine.SpyObj<Storage>;
  const stubValueTasks: Task[] = JSON.parse(JSON.stringify(study_tasks.tasks));

  beforeEach(() => {
    routeStub = {
      snapshot: {
        paramMap: convertToParamMap({
          task_id: String(stubValueTasks[0].task_id),
        }),
      },
    };

    const spyStorage = jasmine.createSpyObj('Storage', [
      'create',
      'get',
      'set',
    ]);

    TestBed.configureTestingModule({
      declarations: [SurveyPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: Storage,
          useValue: spyStorage,
        },
        { provide: ActivatedRoute, useValue: routeStub },
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyPage);
    StorageServiceSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify that the arguments are all set', async () => {
    // Define the tasks, study and uuid to test with
    const stubValueStudy: string = JSON.stringify(study_tasks.study);
    const stubStudy: Study = JSON.parse(JSON.stringify(study_tasks.study));
    const uniqueId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);

    // Set the task, study and uuid in the storage
    await StorageServiceSpy.get.and.returnValue(
      Promise.resolve(JSON.stringify(stubValueStudy))
    );
    await StorageServiceSpy.get.and.returnValue(Promise.resolve(uniqueId));
    await StorageServiceSpy.get.and.returnValue(
      Promise.resolve(JSON.stringify(stubValueTasks))
    );

    const current_section = 1;

    // Set the task_id
    // Not working
    // routeStub.snapshot.paramMap = of(
    //   convertToParamMap({
    //     task_id: String(stubValueTasks[0].task_id),
    //   })
    // );

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.task_id).toBe(String(stubValueTasks[0].task_id));
      expect(component.tasks.length).toEqual(stubValueTasks.length);
      expect(component.module_name).toBe(String(stubValueTasks[0].name));
      expect(component.module_index).toEqual(stubValueTasks[0].index);
      expect(component.task_index).toEqual(0);
      expect(component.study.properties.study_id).toBe(
        stubStudy.properties.study_id
      );
      expect(component.survey).toBe(stubStudy.modules[stubValueTasks[0].index]);
      expect(component.num_sections).toEqual(
        stubStudy.modules[stubValueTasks[0].index].sections.length
      );
      expect(component.current_section).toEqual(current_section);
      expect(component.current_section_name).toBe(
        stubStudy.modules[stubValueTasks[0].index].sections[current_section - 1]
          .name
      );
      expect(component.submit_text).toBe(
        'Submit' ||
        'Next' ||
        stubStudy.modules[stubValueTasks[0].index].submit_text
      );
      expect(component.questions).toBe(
        stubStudy.modules[stubValueTasks[0].index].sections[current_section - 1]
          .questions
      );
    });
  });

  /**
   * To be tested
   * ngOnInit()
   * back()
   * setupQuestionVariables(uuid: string)
   * setAnswer(question: Question)
   * changeCheckStatus(option: Option, question: Question)
   * openExternalFile(url: string)
   * toggleDynamicQuestions(question: Question)
   * submit()
   * showToast(message: string, position?: 'top' | 'bottom' | 'middle')
   * shuffle<T>(array: T[])
   */
});
