import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { StudyTasksService } from 'src/app/services/study-tasks/study-tasks.service';
import { DataService } from '../../services/data/data.service';
import { NavController, IonContent, ToastController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import * as moment from 'moment';
import { StorageService } from '../../services/storage/storage.service';
import { Capacitor } from '@capacitor/core';
import { Survey, Question, Option } from 'src/app/interfaces/study';
import { SurveyResponse } from 'src/app/interfaces/types';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  // variables to handle the sections
  sectionIndex = 0;
  sectionName: string = '';

  // survey template - load prior to data from storage ### This seems like the wrong survey format
  survey: Survey;
  task_id: string;
  task_index: number;
  loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    private domSanitizer: DomSanitizer,
    private navController: NavController,
    private studyTasksService: StudyTasksService,
    private surveyDataService: DataService,
    private toastController: ToastController,
    private ngZone: NgZone
  ) {}

  /**
   * Triggered when the survey page is first opened
   * Initialises the survey and displays it on the screen
   */
  async ngOnInit() {
    // necessary to update height of external embedded content
    window.addEventListener('message', (e) => {
      if (e.data.hasOwnProperty('frameHeight')) {
        (
          document.querySelector(
            'iframe[src^="' + e.data.url + '"]'
          ) as HTMLElement
        ).style.height = `${e.data.frameHeight + 10}px`;
        (
          document.querySelector(
            'iframe[src^="' + e.data.url + '"]'
          ) as HTMLElement
        ).style.width = `99%`;
      }
    });

    // load the task
    this.task_id = this.route.snapshot.paramMap.get('task_id');
    const task = await this.storage.getTaskByID(this.task_id);
    this.task_index = task.index;

    // check if this task is valid
    const todos = await this.studyTasksService.getToDos();
    let taskAvailable = false;
    for (const task of todos) {
      if (task.task_id === this.task_id) {
        taskAvailable = true;
        break;
      }
    }
    if (!taskAvailable) {
      this.showToast(
        'This task had a time limit and is no longer available.',
        'bottom'
      );
      this.navController.navigateRoot('/');
      return;
    }

    // extract the JSON from the study object
    this.survey = (await this.storage.getModuleByID(task.uuid))
      .params as Survey;

    console.log(this.survey.sections[0].questions[0].type);
    // shuffle modules if required
    if (this.survey.shuffle) {
      this.survey.sections = this.shuffle(this.survey.sections);
    }

    // shuffle questions if required
    for (const section of this.survey.sections) {
      if (section.shuffle) {
        section.questions = this.shuffle(section.questions);
      }
    }

    // get the name of the current section
    this.sectionName = this.survey.sections[this.sectionIndex].name;

    // get the user ID and then set up question variables
    // initialise all of the questions to be displayed
    const uuid = await this.storage.getUuid();
    this.setupQuestionVariables(uuid.toString());

    // toggle rand_group questions
    // figure out which ones are grouped together, randomly show one and set its response value to 1
    const randomGroups: { [rand_group: string]: string[] } = {};
    for (const section of this.survey.sections) {
      for (const question of section.questions) {
        if (question.rand_group) {
          // set a flag to indicate that this question shouldn't reappear via branching logic
          question.noToggle = true;

          // categorise questions by rand_group
          if (!(question.rand_group in randomGroups)) {
            randomGroups[question.rand_group] = [];
            randomGroups[question.rand_group].push(question.id);
          } else {
            randomGroups[question.rand_group].push(question.id);
          }
        }
      }
    }

    // from each rand_group, select a random item to show
    const showThese = [];
    for (const key in randomGroups) {
      if (randomGroups.hasOwnProperty(key)) {
        // select a random value from each array and add it to the "showThese array"
        showThese.push(
          randomGroups[key][
            Math.floor(Math.random() * randomGroups[key].length)
          ]
        );
      }
    }

    // iterate back through and show the ones that have been randomly calculated
    // while removing the branching attributes from those that are hidden
    for (const section of this.survey.sections) {
      for (const question of section.questions) {
        if (showThese.includes(question.id)) {
          question.noToggle = false;
          question.response = 1;
          // hide any questions from the rand_group that were not made visible
          // and remove any branching logic attributes
          // ### How to do this in TS?
        } else if (question.noToggle) {
          question.hidden = true;
          delete question.hide_id;
          delete question.hide_value;
          delete question.hide_if;
        }
      }
    }

    // toggle dynamic question setup
    for (const section of this.survey.sections) {
      for (const question of section.questions) {
        this.toggleDynamicQuestions(question);
      }
    }

    // log the user visiting this tab
    this.surveyDataService.sendLog({
      timestamp: moment().format(),
      page: 'survey',
      event: 'entry',
    });
    SplashScreen.hide();
  }

  /**
   * Handles the back button behaviour
   */
  back() {
    if (this.sectionIndex > 0) {
      this.ngZone.run(() => {
        this.sectionIndex--;
        this.sectionName = this.survey.sections[this.sectionIndex].name;
      });
    } else {
      // save an exit log
      this.surveyDataService
        .sendLog({
          timestamp: moment().format(),
          page: 'survey',
          event: 'exit',
        })
        .catch(() => {});
      // nav back to the home screen
      this.navController.navigateRoot('/');
    }
  }

  /**
   * Sets up any questions that need initialisation before display
   * e.g. sets date/time objects to current date/time, set default values for sliders, etc.
   */
  setupQuestionVariables(uuid: string) {
    // for all relevant questions add an empty response variable
    if (this.survey.sections) {
      for (const section of this.survey.sections) {
        for (const question of section.questions) {
          // for all question types that can be responded to, set default values
          question.response = '';
          question.model = '';
          question.hideError = true;
          question.hidden = false;

          // for datetime questions, default to the current date/time
          if (question.type === 'datetime') {
            // placeholder for dates
            question.model = moment().format();

            // for audio/video questions, sanitize the URLs to make them safe/work in html5 tags ### Not sanitizing at themoment
          } else if (
            question.type === 'media' &&
            (question.subtype === 'audio' || question.subtype === 'video')
          ) {
            // @ts-ignore
            question.type.src =
              this.domSanitizer.bypassSecurityTrustResourceUrl(question.src);
            if (question.subtype === 'video') {
              // @ts-ignore
              question.type.thumb =
                this.domSanitizer.bypassSecurityTrustResourceUrl(
                  question.thumb
                );
            }

            // for external embedded content, sanitize the URLs to make them safe/work in html5 tags ### Since when is there an exteral type?
            // for slider questions, set the default value to be halfway between min and max
          } else if (question.type === 'slider') {
            // get min and max
            const min = question.min;
            const max = question.max;

            // set the default value of the slider to the middle value
            const model = min + (max - min) / 2;
            question.model = model;

            // a starting value must also be set for the slider to work properly
            question.value = model;

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
            question.optionsChecked = tempOptions;

            // counterbalance the choices if necessary
            if (question.shuffle) {
              question.optionsChecked = this.shuffle(question.optionsChecked);
            }

            // set the empty response to an array for checkbox questions
            if (!question.radio) {
              question.response = [];
            }
          }
        }
      }
    }
  }

  /**
   * Saves the response to a question and triggers and branching
   *
   * @param question The question that has been answered
   */
  setAnswer(question: Question) {
    // save the response and hide error
    question.response = question.model;
    question.hideError = true;

    // trigger any branching tied to this question
    this.toggleDynamicQuestions(question);
  }

  /**
   * Fires every time a checkbox question is answered; converts the response(s) to a String
   *
   * @param option The option selected in a checkbox group
   * @param question The question that has been answered
   */
  changeCheckStatus(option: Option, question: Question) {
    // get question responses and split
    let responses: string[] = [];

    // split all of the responses up into individual strings
    if (question.response && question.response !== '') {
      responses = question.response.toString().split(';');
      responses.pop();
    }

    // if the checked item was unchecked then remove it
    // otherwise add it to the response array
    if (responses.indexOf(option.text) > -1) {
      // remove it
      const index = responses.indexOf(option.text);
      if (index !== -1) {
        responses.splice(index, 1);
      }
    } else {
      responses.push(option.text);
    }

    // write the array back to a single string
    let response_string = '';
    for (const response of responses) {
      response_string += response + ';';
    }

    // hide any non-response error
    question.hideError = true;
    question.response = response_string;
  }

  /**
   * Opens an external file in the in app browser
   *
   * @param url The url of the PDF file to open
   */
  openExternalFile(url: string) {
    if (Capacitor.isNativePlatform()) {
      Browser.open({ url, windowName: '_system' }).catch((e) => {
        console.log(
          'ERROR in promise caught: settings.page.ts: Browser.open() threw: + ' +
            e
        );
      });
    } else {
      window.open(url, '_blank');
    }
  }

  /**
   *
   * @param question
   * @returns
   */
  toggleDynamicQuestions(question: Question) {
    for (const section of this.survey.sections) {
      for (const q of section.questions) {
        if (q.hide_id === question.id) {
          if ((q.hide_value === question.response) === q.hide_if) {
            this.hideQuestion(q);
          } else {
            q.hidden = false;
            this.toggleDynamicQuestions(q);
          }
        }
      }
    }
  }

  /**
   * Handles the submit/next button in each section.
   * Checks if all required questions have been answered and then moves to the next section/saves the response.
   */
  async submit() {
    // check if section has errors
    const valid = !this.checkErrors();
    if (!valid) {
      this.content.scrollToTop(500);
      this.showToast('You must answer all required (*) questions', 'bottom');
      return;
    }

    // not the last section: go to the next section
    if (this.sectionIndex + 1 !== this.survey.sections.length) {
      this.ngZone.run(() => {
        this.sectionIndex++;
        this.sectionName = this.survey.sections[this.sectionIndex].name;
        this.content.scrollToTop(0);
      });
      return;
    }

    // add the alert time to the response
    const tasks = await this.storage.getTasks();
    tasks[this.task_index].alert_time = moment(
      new Date(tasks[this.task_index].time).toISOString()
    ).format();

    // get a timestmap of submission time in both readable and ms format
    const response_time = moment().format();
    tasks[this.task_index].response_time = response_time;
    const response_time_ms = moment().valueOf();
    tasks[this.task_index].response_time_ms = response_time_ms;

    // indicate that the current task is completed
    tasks[this.task_index].completed = true;

    // add all of the responses to an object in the task to be sent to server
    const responses: SurveyResponse = {};
    for (const section of this.survey.sections) {
      for (const question of section.questions) {
        responses[question.id] = question.response;
      }
    }
    tasks[this.task_index].responses = responses;

    // attempt to post surveyResponse to server
    await this.surveyDataService.sendResponse(tasks[this.task_index]);

    // write tasks back to storage
    await this.storage.saveTasks(tasks);
    await this.surveyDataService.sendLog({
      timestamp: moment().format(),
      page: 'survey',
      event: 'submit',
    });
    this.navController.navigateRoot('/');
  }

  /**
   * Checks, whether there are any errors in the current section.
   *
   * @returns A boolean value indicating whether the section has errors (true) or not (false)
   */
  checkErrors(): boolean {
    const currentQuestions = this.survey.sections[this.sectionIndex].questions;
    let errorCount = 0;
    for (const question of currentQuestions) {
      const error =
        question.required &&
        (question.response === '' || question.response === undefined) &&
        question.hidden === false;

      if (error) {
        question.hideError = false;
        if (question.type !== 'instruction') {
          errorCount++;
        }
      } else {
        question.hideError = true;
      }
    }

    return errorCount !== 0;
  }

  /**
   * Creates a Toast object to display a message to the user
   *
   * @param message A message to display in the toast
   * @param position The position on the screen to display the toast
   */
  async showToast(message: string, position?: 'top' | 'bottom' | 'middle') {
    const toast = await this.toastController.create({
      message,
      position,
      keyboardClose: true,
      color: 'danger',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });

    toast?.present().catch(() => {});
  }

  /**
   * Hides a question and all the questions whose visibility depends on the question.
   */
  hideQuestion(question: Question) {
    question.hidden = true;
    for (const section of this.survey.sections) {
      for (const q of section.questions) {
        if (q.hide_id === question.id) {
          this.hideQuestion(q);
        }
      }
    }
  }

  /**
   * Randomly shuffle an array
   * https://stackoverflow.com/a/2450976/1293256
   *
   * @param array The array to shuffle
   * @return      The first item in the shuffled array
   */
  shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
