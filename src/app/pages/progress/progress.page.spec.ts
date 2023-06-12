import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ProgressPage } from './progress.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  DEFAULT_LANGUAGE,
  TranslateLoader,
  TranslateModule,
  USE_DEFAULT_LANG,
  USE_EXTEND,
  USE_STORE,
} from '@ngx-translate/core';
import { LanguageLoader } from '../../app.module';
import study_tasks from '../../../../cypress/fixtures/study_tasks.json';
import { BarcodeService } from '../../services/barcode/barcode.service';
import { StudyTasksService } from 'src/app/services/study-task/study-tasks.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SurveyDataService } from 'src/app/services/survey-data/data.service';

describe('ProgressPage', () => {
  let component: ProgressPage;
  let fixture: ComponentFixture<ProgressPage>;
  const stubValueTasks: Task[] = JSON.parse(JSON.stringify(study_tasks.tasks));
  const stubStudy: Study = JSON.parse(JSON.stringify(study_tasks.study));
  const current_section = 1;
  const stubValueStudy: string = JSON.stringify(study_tasks.study);
  const uniqueId =
    Date.now().toString(36) + Math.random().toString(36).substring(2);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressPage],
      imports: [
        IonicModule.forRoot(),
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: LanguageLoader,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [
        { provide: USE_DEFAULT_LANG, useValue: true },

        { provide: USE_STORE, useValue: true },
        { provide: USE_EXTEND, useValue: true },
        { provide: DEFAULT_LANGUAGE, useValue: 'en' },
        BarcodeService,
        HttpClient,
        Storage,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressPage);

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
        if (param === 'enrolment-date') {
          const d = new Date();
          d.setDate(d.getDate() - 2);

          return Promise.resolve(d);
        }
        return null;
      });
    });

    it('should call ionViewWillEnter', async () => {
      const stubValueGraph = JSON.parse(
        JSON.stringify(study_tasks.graph_object)
      );
      await component.ionViewWillEnter();
      await fixture.detectChanges();
      await fixture.whenStable();
      expect(spyStorageGet).toHaveBeenCalledTimes(2);
      expect(component.studyJSON).toEqual(stubStudy);
      expect(component.enrolledInStudy).toBe(true);
      expect(component.studyDay).toBeGreaterThanOrEqual(1);
      expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
      expect(spygetAllTasks).toHaveBeenCalledTimes(1);
      expect(component.history).not.toBe([]);
      expect(component.graphs).not.toBe([]);
    });

    it('should call diffDays', async () => {
      const diff = -2;
      const d1 = new Date();
      d1.setDate(d1.getDate() - 2);
      const d2 = new Date();
      const result = await component.diffDays(d2, d1);
      expect(result).toBe(diff);
    });

    it('should call ionViewWillLeave', async () => {
      component.enrolledInStudy = true;
      expect(component.enrolledInStudy).toBe(true);
      await component.ionViewWillLeave();
      await fixture.detectChanges();
      expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
    });
  });
});
