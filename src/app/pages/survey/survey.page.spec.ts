import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  IonicModule,
  NavController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { SurveyPage } from './survey.page';
import { Storage } from '@ionic/storage-angular';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import study_tasks from '../../../../cypress/fixtures/study_tasks.json';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { NavMock, ToastMock } from '../../../../test-config/mocks-ionic';
import moment from 'moment';
import { StudyTasksService } from '../../services/study-task/study-tasks.service';
import { StorageService } from '../../services/storage/storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../../services/data/data.service';

describe('SurveyPage', () => {
  let component: SurveyPage;
  let fixture: ComponentFixture<SurveyPage>;
  //let StorageServiceSpy: jasmine.SpyObj<StorageService>;
  let navControllerSpy: jasmine.SpyObj<NavController>;
  let routeStub;

  const stubValueTasks: Task[] = JSON.parse(JSON.stringify(study_tasks.tasks));
  const stubStudy: Study = JSON.parse(JSON.stringify(study_tasks.study));
  const current_section = 1;
  const stubValueStudy: string = JSON.stringify(study_tasks.study);
  const uniqueId =
    Date.now().toString(36) + Math.random().toString(36).substring(2);

  beforeEach(async () => {
    routeStub = {
      snapshot: {
        paramMap: convertToParamMap({
          task_id: String(stubValueTasks[0].task_id),
        }),
      },
    };

    TestBed.configureTestingModule({
      declarations: [SurveyPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        {
          provide: NavController,
          useClass: NavMock,
        },
        {
          provide: ToastController,
          useClass: ToastMock,
        },
        Storage,
      ],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyPage);
    // StorageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    navControllerSpy = TestBed.inject(
      NavController
    ) as jasmine.SpyObj<NavController>;
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialzation', async () => {
    let spylogPageVisitToServer;
    let spygetAllTasks;
    let spyget;
    beforeEach(async () => {
      const studyTaskService =
        fixture.debugElement.injector.get(StudyTasksService);
      const storageServiceCtrl =
        fixture.debugElement.injector.get(StorageService);
      const surveyDataService = fixture.debugElement.injector.get(DataService);
      spylogPageVisitToServer = spyOn(
        surveyDataService,
        'logPageVisitToServer'
      ).and.returnValue(Promise.resolve());
      spygetAllTasks = spyOn(studyTaskService, 'getAllTasks').and.returnValue(
        Promise.resolve(stubValueTasks)
      );
      spyget = spyOn(storageServiceCtrl, 'get').and.callFake((param) => {
        if (param === 'current-study') {
          return Promise.resolve(stubValueStudy);
        }
        if (param === 'uuid') {
          return Promise.resolve(uniqueId);
        }
        if (param === 'study-tasks') {
          return Promise.resolve(JSON.stringify(stubValueTasks));
        }
        return null;
      });
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('should verify that the arguments are all set', async () => {
      fixture.whenStable().then(() => {
        // wait for async getTasks
        fixture.detectChanges(); // update view with Tasks

        expect(component.task_id).toBe(String(stubValueTasks[0].task_id));
        expect(component.tasks.length).toEqual(stubValueTasks.length);
        expect(component.module_name).toBe(String(stubValueTasks[0].name));
        expect(component.module_index).toEqual(stubValueTasks[0].index);
        expect(component.task_index).toEqual(0);

        expect(component.study.properties.study_id).toBe(
          stubStudy.properties.study_id
        );
        expect(component.survey.id).toEqual(
          stubStudy.modules[stubValueTasks[0].index].id
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
        expect(
          component.submit_text === 'Submit' ||
            component.submit_text === 'Next' ||
            component.submit_text ===
              stubStudy.modules[stubValueTasks[0].index].submit_text
        ).toBeTruthy();

        expect(component.questions[0].id).toEqual(
          stubStudy.modules[stubValueTasks[0].index].sections[
            current_section - 1
          ].questions[0].id
        );
      });
    });

    it('should test submit', (done) => {
      const navCtrl = fixture.debugElement.injector.get(NavController);
      const storageServiceCtrl =
        fixture.debugElement.injector.get(StorageService);
      spyOn(navCtrl, 'navigateRoot');

      const spy = spyOn(storageServiceCtrl, 'set').and.returnValue(
        Promise.resolve()
      );

      fixture.whenStable().then(async () => {
        // Check assignment
        fixture.detectChanges();
        expect(component.tasks.length).toEqual(stubValueTasks.length);
        expect(component.survey.id).toEqual(
          stubStudy.modules[stubValueTasks[0].index].id
        );

        expect(component.questions[0].id).toBe(
          stubStudy.modules[stubValueTasks[0].index].sections[
            current_section - 1
          ].questions[0].id
        );
        await component.submit();
        spy.calls.mostRecent().returnValue.then(() => {
          expect(storageServiceCtrl.set).toHaveBeenCalled();
          expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/');
          done();
        });
      });
    });
    it('should set up question variables', async () => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const index = stubValueTasks[0].index;

        const survey = stubStudy.modules[index];
        // Set up the component servey
        component.survey = survey;

        // Check assignment
        expect(component.tasks.length).toEqual(stubValueTasks.length);
        expect(component.survey).toBe(survey);

        // Call the function
        component.setupQuestionVariables(uniqueId);

        // Check if questions have been properly assigned
        for (const section of component.survey.sections) {
          for (const question of section.questions) {
            // for all question types that can be responded to, set default values
            // expect(question.response).toBe('');
            // expect(question.model).toBe('');
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
              expect(question.src).not.toBe(question.src + '?uuid=' + uniqueId);

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

              expect(question.optionsChecked).toEqual(tempOptions);

              // set the empty response to an array for checkbox questions
              if (!question.radio) {
                expect(question.response).toBe([]);
              }
            }
          }
        }
      });
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

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const navCtrl = fixture.debugElement.injector.get(NavController);
        spyOn(navCtrl, 'navigateRoot');
        component.survey = stubStudy.modules[stubValueTasks[2].index];
        // Check assignment
        expect(component.survey).toEqual(
          stubStudy.modules[stubValueTasks[2].index]
        );

        // Check if it was true first or undefined
        const q_before = component.survey.sections[0].questions.filter(
          (x) => 'hide_id' in x && x.hide_id === question.id
        )[0];
        if (q_before && 'hideSwitch' in q_before) {
          expect(q_before.hideSwitch).not.toBeDefined();
        }

        // call method
        component.toggleDynamicQuestions(question);

        // Check if the hideSwitch changed in the component

        const q_after = component.survey.sections[0].questions.filter(
          (x) => 'hide_id' in x && x.hide_id === question.id
        )[0];

        expect(q_after ? q_after.hideSwitch : false).toBe(false);
      });
    });

    it('should verify that the back function changes the route', async () => {
      const navCtrl = fixture.debugElement.injector.get(NavController);
      spyOn(navCtrl, 'navigateRoot');

      fixture.detectChanges();
      fixture
        .whenStable()
        .then(() => {
          component.back();

          if (component.current_section > 1) {
            expect(component.submit_text).toBe('Next');
          } else {
            expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/');
          }
        })
        .catch((error: TypeError) => {});
    });
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
          handler: jasmine.any(Function) as any,
        },
      ],
    };
    const mockToast = await toastCtr.create(toastOptions);

    spyOn(toastCtr, 'create').and.returnValue(Promise.resolve(mockToast));

    await component.showToast('mockToast', 'top');

    // Confirm they are different
    expect(toastCtr.create).toHaveBeenCalledWith(toastOptions);
  });

  it('should shuffle an array', async () => {
    const tasks: Task[] = stubValueTasks;

    const getFirstItemTaskId = tasks[0].task_id;
    expect(getFirstItemTaskId).toBe(tasks[0].task_id);

    // Call the shuffle method now
    let result = component.shuffle(tasks);
    while (result[0].task_id === getFirstItemTaskId) {
      result = component.shuffle(tasks);
    }

    // Confirm they are different
    expect(result[0].task_id).not.toBe(getFirstItemTaskId);
  });
});
