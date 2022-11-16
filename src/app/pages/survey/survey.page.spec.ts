// https://capacitorjs.com/docs/guides/mocking-plugins

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  IonicModule,
  NavController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { SurveyPage } from './survey.page';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BarcodeService } from '../../services/barcode/barcode.service';
import study_tasks from '../../../../cypress/fixtures/study_tasks.json';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import {
  BrowserMock,
  NavMock,
  ToastMock,
} from '../../../../test-config/mocks-ionic';
import moment from 'moment';
import { Browser, BrowserPlugin, OpenOptions } from '@capacitor/browser';
import { BrowserModule } from '@angular/platform-browser';

describe('SurveyPage', () => {
  let component: SurveyPage;
  let fixture: ComponentFixture<SurveyPage>;
  let StorageServiceSpy: jasmine.SpyObj<Storage>;
  const stubValueTasks: Task[] = JSON.parse(JSON.stringify(study_tasks.tasks));
  let navControllerSpy: jasmine.SpyObj<NavController>;
  //let toastControllerSpy: jasmine.SpyObj<ToastController>;
  let routeStub;

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

    // const spyToast = jasmine.createSpyObj('ToastController', [
    //   'create',
    // ]);

    TestBed.configureTestingModule({
      declarations: [SurveyPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: Storage,
          useValue: spyStorage,
        },
        { provide: ActivatedRoute, useValue: routeStub },
        {
          provide: NavController,
          useClass: NavMock,
        },
        {
          provide: ToastController,
          useClass: ToastMock,
        },
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyPage);
    // toastControllerSpy = TestBed.inject(
    //   ToastController
    // ) as jasmine.SpyObj<ToastController>;
    StorageServiceSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
    navControllerSpy = TestBed.inject(
      NavController
    ) as jasmine.SpyObj<NavController>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify that the arguments are all set', async () => {
    const stubStudy: Study = JSON.parse(JSON.stringify(study_tasks.study));
    const current_section = 1;
    // Define the tasks, study and uuid to test with
    const stubValueStudy: string = JSON.stringify(study_tasks.study);

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

    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        expect(component.task_id).toBe(String(stubValueTasks[0].task_id));
        expect(component.tasks.length).toEqual(stubValueTasks.length);
        expect(component.module_name).toBe(String(stubValueTasks[0].name));
        expect(component.module_index).toEqual(stubValueTasks[0].index);
        expect(component.task_index).toEqual(0);
        expect(component.study.properties.study_id).toBe(
          stubStudy.properties.study_id
        );
        expect(component.survey).toBe(
          stubStudy.modules[stubValueTasks[0].index]
        );
        expect(component.num_sections).toEqual(
          stubStudy.modules[stubValueTasks[0].index].sections.length
        );
        expect(component.current_section).toEqual(current_section);
        expect(component.current_section_name).toBe(
          stubStudy.modules[stubValueTasks[0].index].sections[
            current_section - 1
          ].name
        );
        expect(component.submit_text).toBe(
          'Submit' ||
            'Next' ||
            stubStudy.modules[stubValueTasks[0].index].submit_text
        );
        expect(component.questions).toBe(
          stubStudy.modules[stubValueTasks[0].index].sections[
            current_section - 1
          ].questions
        );
        // It is important to catch the errors that happen when it waits for data to be grabbed from
        // the storeage
      })
      .catch(() => {});
  });

  it('should verify that the back function changes the route', async () => {
    const navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'navigateRoot');
    component.back();

    if (component.current_section > 1) {
      expect(component.submit_text).toBe('Next');
    } else {
      expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/');
    }
  });

  it('should set up question variables', async () => {
    const stubStudy: Study = JSON.parse(JSON.stringify(study_tasks.study));

    const uniqueId =
      Date.now().toString(36) + Math.random().toString(36).substring(2);

    // Set up the component servey
    component.survey = stubStudy.modules[stubValueTasks[0].index];

    // Check assignment
    expect(component.survey).toBe(stubStudy.modules[stubValueTasks[0].index]);

    // Call the function
    component.setupQuestionVariables(uniqueId);

    // Check if questions have been properly assigned
    for (const section of component.survey.sections) {
      for (const question of section.questions) {
        // for all question types that can be responded to, set default values
        expect(question.response).toBe('');
        expect(question.model).toBe('');
        expect(question.hideError).toBe(true);
        expect(question.hideSwitch).toBe(true);

        // for datetime questions, default to the current date/time
        if (question.type === 'datetime') {
          // placeholder for dates
          expect(question.model).toBe(moment().format());

          // for audio/video questions, sanitize the URLs to make them safe/work in html5 tags ### Not sanitizing at themoment
        } else if (
          question.type === 'media' &&
          (question.subtype === 'audio' || question.subtype === 'video')
        ) {
          expect(question.src).toBe('Unknown style value (CSS)');
          if (question.subtype === 'video') {
            expect(question.thumb).toBe('Unknown style value (CSS)');
          }
        } else if (question.type === 'external') {
          expect(question.src).toBe(question.src + '?uuid=' + uniqueId);
          expect(question.src).toBe('');

          // for slider questions, set the default value to be halfway between min and max
        } else if (question.type === 'slider') {
          // get min and max
          const min = question.min;
          const max = question.max;

          // set the default value of the slider to the middle value
          const model = min + (max - min) / 2;
          expect(question.model).toBe(model);
          expect(question.value).toBe(model);

          // for checkbox items, the response is set to an empty array
        } else if (question.type === 'multi') {
          // set up checked tracking for checkbox questions types
          const tempOptions: Option[] = [];
          for (const option of question.options) {
            tempOptions.push({
              text: option,
              checked: false,
            });
          }

          expect(question.optionsChecked).toBe(tempOptions);

          // set the empty response to an array for checkbox questions
          if (!question.radio) {
            expect(question.response).toBe([]);
          }
        }
      }
    }
  });

  it('should set answers', async () => {
    const question: Question = {
      id: 'id',
      text: 'Title',
      type: 'multi',
      required: true,
      response: [],
      model: 0,
      hideError: false,
      noToggle: true,
    };

    component.setAnswer(question);
    expect(question.response).toBe(question.model);
    expect(question.hideError).toBe(true);
  });

  it('should change Check Status', async () => {
    const question: Question = {
      id: 'id',
      text: 'Title',
      type: 'multi',
      required: true,
      response: 'Apple;',
      model: 0,
      hideError: false,
      noToggle: true,
    };

    const option: Option = {
      text: 'Mango',
      checked: true,
    };

    component.changeCheckStatus(option, question);
    expect(question.response).toBe('Apple;Mango;');
    expect(question.hideError).toBe(true);
  });

  it('should toggle dynamic questions', async () => {
    const question: any = {
      id: 'multi-q8bohlar',
      type: 'multi',
      text: 'This is a multiple choice type with branching demo.',
      required: true,
      hide_id: '',
      hide_value: '',
      hide_if: true,
      modal: false,
      radio: true,
      shuffle: true,
      options: ['apple', 'orange', 'banana'],
      model: 0,
      response: 'banana;',
      hideError: false,
      noToggle: false,
    } as Question;

    const stubStudy: Study = JSON.parse(JSON.stringify(study_tasks.study));

    // Set up the component servey
    component.survey = await stubStudy.modules[stubValueTasks[2].index];

    // Check assignment
    expect(component.survey).toBe(stubStudy.modules[stubValueTasks[2].index]);

    // Check if it was true first or undefined
    const q_before = component.survey.sections[0].questions.filter(
      (x) => 'hide_id' in x && x.hide_id === question.id
    )[0];
    if ('hideSwitch' in q_before) {
      expect(q_before.hideSwitch).not.toBeDefined();
    }

    // call method
    component.toggleDynamicQuestions(question);

    // Check if the hideSwitch changed in the component

    const q_after = component.survey.sections[0].questions.filter(
      (x) => 'hide_id' in x && x.hide_id === question.id
    )[0];
    expect(q_after.hideSwitch).toBe(false);
  });

  it('should test toast', async () => {
    const toastCtr = fixture.debugElement.injector.get(ToastController);

    const toastOptions: ToastOptions = {
      message: 'mockToast',
      position: 'top',
      keyboardClose: true,
      color: 'danger',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {},
        },
      ],
    };
    const mockToast = await toastCtr.create(toastOptions);

    spyOn(toastCtr, 'create').and.returnValue(Promise.resolve(mockToast));

    component.showToast('mockToast', 'top');

    // Confirm they are different
    expect(toastCtr.create).toHaveBeenCalled();
  });

  it('should shuffle an array', async () => {
    const getFirstItemTaskId = stubValueTasks[0].task_id;

    expect(getFirstItemTaskId).toBe(stubValueTasks[0].task_id);

    // Call the shuffle method now
    const result = component.shuffle(stubValueTasks);

    // Confirm they are different
    expect(result[0].task_id).not.toBe(getFirstItemTaskId);
  });

  /**
   * To be tested
   *
   * submit()
   * showToast(message: string, position?: 'top' | 'bottom' | 'middle')
   */
});
