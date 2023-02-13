import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { PvtPage } from './pvt.page';
import { RouterTestingModule } from '@angular/router/testing';
import study_tasks from '../../../../cypress/fixtures/study_tasks.json';
import {
  ActivatedRoute,
  ChildrenOutletContexts,
  convertToParamMap,
} from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { StudyTasksService } from 'src/app/services/study-task/study-tasks.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import moment from 'moment';
import { SurveyDataService } from 'src/app/services/survey-data/survey-data.service';

describe('PvtPage', () => {
  let component: PvtPage;
  let fixture: ComponentFixture<PvtPage>;
  let angularStorageSpy: jasmine.SpyObj<Storage>;
  let routeStub;
  const stubValueTasks: Task[] = JSON.parse(JSON.stringify(study_tasks.tasks));
  const stubStudy: Study = JSON.parse(JSON.stringify(study_tasks.study));
  const current_section = 1;
  const stubValueStudy: string = JSON.stringify(study_tasks.study);
  const uniqueId =
    Date.now().toString(36) + Math.random().toString(36).substring(2);

  beforeEach(() => {
    routeStub = {
      snapshot: {
        paramMap: convertToParamMap({
          task_id: String(stubValueTasks[1].task_id),
        }),
      },
    };

    const spyStorage = jasmine.createSpyObj('Storage', [
      'create',
      'get',
      'set',
    ]);
    TestBed.configureTestingModule({
      declarations: [PvtPage],
      imports: [RouterTestingModule, IonicModule.forRoot()],
      providers: [
        {
          provide: Storage,
          useValue: spyStorage,
        },
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Date, useValue: Date },
        { provide: Math, useValue: Math },
        HttpClient,
        HttpHandler,
        ChildrenOutletContexts,
      ],
    }).compileComponents();

    angularStorageSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;

    fixture = TestBed.createComponent(PvtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('initialzation', async () => {
    let spygetAllTasks;
    let spyStorageGet;
    let spySendSurveyDataToServer;
    let spylogPageVisitToServer;
    let spyStorageSet;
    beforeEach(async () => {
      const studyTaskService =
        fixture.debugElement.injector.get(StudyTasksService);
      const storageServiceCtrl =
        fixture.debugElement.injector.get(StorageService);
      const surveyDataService =
        fixture.debugElement.injector.get(SurveyDataService);
      spySendSurveyDataToServer = spyOn(
        surveyDataService,
        'sendSurveyDataToServer'
      ).and.returnValue(Promise.resolve());
      spylogPageVisitToServer = spyOn(
        surveyDataService,
        'logPageVisitToServer'
      ).and.returnValue(Promise.resolve());
      spygetAllTasks = spyOn(studyTaskService, 'getAllTasks').and.returnValue(
        Promise.resolve(stubValueTasks)
      );
      spyStorageSet = spyOn(storageServiceCtrl, 'set').and.callFake((param) => {
        if (param === 'study-tasks') {
          return Promise.resolve();
        }

        return null;
      });
      spyStorageGet = spyOn(storageServiceCtrl, 'get').and.callFake((param) => {
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
    });
    it('should call ngOnInit and check', async () => {
      const valueStudy = JSON.parse(stubValueStudy);
      await component.ngOnInit();
      await fixture.detectChanges();
      await fixture.whenStable().then(async () => {
        const index = 1;
        expect(spygetAllTasks).toHaveBeenCalledTimes(1);
        expect(spyStorageGet).toHaveBeenCalledTimes(1);
        expect(component.moduleIndex).toEqual(index);
        expect(component.trials).toBe(valueStudy.modules[1].trials);
        expect(component.min).toBe(valueStudy.modules[1].min_waiting);
        expect(component.max).toBe(valueStudy.modules[1].max_waiting);
        expect(component.moduleName).toBe(valueStudy.modules[1].name);
        expect(component.showResults).toBe(valueStudy.modules[1].show);
        expect(component.timeToTimeout).toBe(
          valueStudy.modules[1].max_reaction
        );
        expect(component.enableExit).toBe(valueStudy.modules[1].exit);
        expect(component.submitText).toBe(valueStudy.modules[1].submit_text);
      });
    });

    it('should call setStudyParameters', fakeAsync(async () => {
      const valueStudy = JSON.parse(stubValueStudy);
      await component.setStudyParameters();
      await fixture.detectChanges();
      const index = 1;
      expect(spygetAllTasks).toHaveBeenCalledTimes(1);
      expect(spyStorageGet).toHaveBeenCalledTimes(1);
      expect(component.moduleIndex).toEqual(index);
      expect(component.trials).toBe(valueStudy.modules[1].trials);
      expect(component.min).toBe(valueStudy.modules[1].min_waiting);
      expect(component.max).toBe(valueStudy.modules[1].max_waiting);
      expect(component.moduleName).toBe(valueStudy.modules[1].name);
      expect(component.showResults).toBe(valueStudy.modules[1].show);
      expect(component.timeToTimeout).toBe(valueStudy.modules[1].max_reaction);
      expect(component.enableExit).toBe(valueStudy.modules[1].exit);
      expect(component.submitText).toBe(valueStudy.modules[1].submit_text);
    }));

    it('should call getModule', fakeAsync(async () => {
      const task_id = stubValueTasks[1].task_id;
      await component.getModule(String(task_id));
      await fixture.detectChanges();
      const index = 1;
      const alertTime = moment(new Date(stubValueTasks[1].time)).format();
      expect(spygetAllTasks).toHaveBeenCalledTimes(1);
      expect(spyStorageGet).toHaveBeenCalledTimes(1);
      expect(component.moduleIndex).toEqual(index);
      expect(component.alertTime).toEqual(alertTime);
      expect(component.taskIndex).toEqual(stubValueTasks[1].index);
    }));

    it('should call submit', fakeAsync(async () => {
      component.taskIndex = 1;
      await component.submit();
      expect(spygetAllTasks).toHaveBeenCalledTimes(1);
      expect(spySendSurveyDataToServer).toHaveBeenCalledTimes(1);
      expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
      expect(spyStorageSet).toHaveBeenCalledTimes(1);
    }));
  });
  describe('should test runTimer()', async () => {
    it('should set the timer to a positive value', async () => {
      component.runTimer();
      expect(component.timer).toBeGreaterThanOrEqual(0);
    });

    it('should exit when the reacted flag is set', async () => {
      component.timeToTimeout = 100;
      component.reacted = true;
      component.runTimer();
      expect(component.timer).toBeLessThan(component.timeToTimeout);
    });
  });

  it('should exit when the state is not Instructions or make instructionTimer greater than 0', async () => {
    component.state = 'Results';
    component.runInstructionTimer();
    expect(component.instructionTimer).toBeUndefined();

    component.state = 'Instructions';
    component.runInstructionTimer().then(() => {
      expect(component.instructionTimer).toBeGreaterThanOrEqual(0);
    });
  });

  it('should set the instructionTimer to a positive value', async () => {
    component.runInstructionTimer();
    expect(component.instructionTimer).toBeGreaterThanOrEqual(0);
  });

  it('should call navigation to Home', () => {
    const navCtrl = fixture.debugElement.injector.get(NavController);
    spyOn(navCtrl, 'navigateRoot');
    component.navHome();
    expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/');
  });

  it('should call countdown', fakeAsync(async () => {
    const state = 'countdown';
    const from = 1;
    component.countdown(from);
    expect(component.state).toBe(state);
    tick(1000);
    expect(component.counter).toBe(0);
  }));

  it('should call handleResults', fakeAsync(async () => {
    // Setting trials to be 3
    component.trials = 3;
    expect(component.trials).toEqual(3);
    let trial: number = component.trials;

    // Second condition
    component.timer = -1;
    expect(component.timer).toBe(-1);
    component.handleResult();
    expect(component.reactedTooEarly).toBe(true);
    expect(component.timer).toEqual(-1);
    expect(component.reactionTimes.pop()).toEqual(-2);
    expect(component.trials).toEqual(++trial);

    // Third condition
    component.timer = 1000;
    component.timeToTimeout = 100;
    expect(component.timer).toEqual(1000);
    expect(component.timeToTimeout).toEqual(100);
    component.handleResult();
    expect(component.reactedTooEarly).toBe(true);
    expect(component.timer).toEqual(-1);
    expect(component.reactionTimes.pop()).toEqual(-1);
    expect(component.trials).toEqual(++trial);

    // Fourth condition
    component.timer = 100;
    component.timeToTimeout = 1000;
    component.exited = false;
    expect(component.timer).toEqual(100);
    expect(component.timeToTimeout).toEqual(1000);
    expect(component.exited).toBe(false);
    component.handleResult();
    expect(component.reactionTimes.pop()).toEqual(100);
  }));

  it('should return a promise that resolves after the specified number of milliseconds', fakeAsync(() => {
    const ms = 100;
    const start = Date.now();
    component.sleep(ms);
    tick(ms);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(ms);
  }));
  it('should return a number greater than or equal to the min argument and less than or equal to the max argument', async() => {
    const min = 0;
    const max = 1;
    const result = component.getUniformRand(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

});
/**
 * startPVT
 * exit
 * PVT
 */
