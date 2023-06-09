import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { StudyTasksService } from 'src/app/services/study-task/study-tasks.service';
import { SurveyDataService } from '../../services/survey-data/survey-data.service';
import { NavController, IonContent, ToastController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import * as moment from 'moment';
import { StorageService } from '../../services/storage/storage.service';
import { Capacitor } from '@capacitor/core';
import Survey, { Question } from 'src/app/interfaces/survey';
import { Task, Option, Responses } from 'src/app/interfaces/types';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  // the text to display as submit button label
  submit_text = 'Submit';

  // variables to handle the sections
  current_section = 1;
  num_sections: number;
  current_section_name: string;

  // survey template - load prior to data from storage ### This seems like the wrong survey format
  survey: Survey;

  questions: any;

  // task objects
  tasks: Task[];
  task_id: string;
  task_index: number;
  module_index: number;
  module_name: string;

  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    private domSanitizer: DomSanitizer,
    private navController: NavController,
    private studyTasksService: StudyTasksService,
    private surveyDataService: SurveyDataService,
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

    // the id of the task to be displayed
    this.task_id = this.route.snapshot.paramMap.get('task_id') || '';
    const studyObject: any = await this.storage.get('current-study');
    const uuid = await this.storage.get('uuid');

    this.tasks = await this.studyTasksService.getAllTasks();
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.task_id === String(this.tasks[i].task_id)) {
        this.module_name = this.tasks[i].name;
        this.module_index = this.tasks[i].index;
        this.task_index = i;
        break;
      }
    }

    // check if this task is valid
    this.studyTasksService.getTaskDisplayList().then((t) => {
      let taskAvailable = false;
      for (const task of t) {
        if (String(task.task_id) === this.task_id) {
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
      }
    });

    // extract the JSON from the study object
    const study = JSON.parse(studyObject);

    // get the correct module
    this.survey = study.modules[this.module_index];

    // shuffle modules if required
    if (this.survey.shuffle) {
      this.survey.sections = this.shuffle(this.survey.sections);
    }

    // shuffle questions if required
    if (this.survey.sections !== undefined) {
      for (const section of this.survey.sections) {
        if (section.shuffle) {
          section.questions = this.shuffle(section.questions);
        }
      }
    }

    // get the name of the current section
    this.num_sections = this.survey.sections.length;
    this.current_section_name =
      this.survey.sections[this.current_section - 1].name;

    // get the user ID and then set up question variables
    // initialise all of the questions to be displayed
    this.setupQuestionVariables(uuid.toString());

    // set the submit text as appropriate
    if (this.current_section < this.num_sections) {
      this.submit_text = 'Next';
    } else {
      this.submit_text = this.survey.submit_text;
    }

    // set the current section of questions
    this.questions = this.survey.sections[this.current_section - 1].questions;

    // toggle rand_group questions
    // figure out which ones are grouped together, randomly show one and set its response value to 1
    const randomGroups: { [rand_group: string]: string[] } = {};
    if (this.survey.sections !== undefined) {
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
          question.hideSwitch = false;
          // @ts-ignore
          delete question.hide_id;
          // @ts-ignore
          delete question.hide_value;
          // @ts-ignore
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
    this.surveyDataService.logPageVisitToServer({
      timestamp: moment().format(),
      milliseconds: moment().valueOf(),
      page: 'survey',
      event: 'entry',
      module_index: this.module_index,
    });
  }

  /**
   * Called on ngOnInIt to set the variabled of the task
   *
   */

  /**
   * Handles the back button behaviour
   */
  back() {
    if (this.current_section > 1) {
      this.ngZone.run(() => {
        this.current_section--;
        this.current_section_name =
          this.survey.sections[this.current_section - 1].name;
        this.questions =
          this.survey.sections[this.current_section - 1].questions;
        this.submit_text = 'Next';
      });
    } else {
      // save an exit log
      this.surveyDataService
        .logPageVisitToServer({
          timestamp: moment().format(),
          milliseconds: moment().valueOf(),
          page: 'survey',
          event: 'exit',
          module_index: this.module_index,
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
          question.hideSwitch = true;

          // for datetime questions, default to the current date/time
          if (question.body.type === 'datetime') {
            // placeholder for dates
            question.model = moment().format();

            // for audio/video questions, sanitize the URLs to make them safe/work in html5 tags ### Not sanitizing at themoment
          } else if (
            question.body.type === 'media' &&
            (question.body.subtype === 'audio' ||
              question.body.subtype === 'video')
          ) {
            // @ts-ignore
            question.body.src =
              this.domSanitizer.bypassSecurityTrustResourceUrl(
                question.body.src
              );
            if (question.body.subtype === 'video') {
              // @ts-ignore
              question.body.thumb =
                this.domSanitizer.bypassSecurityTrustResourceUrl(
                  question.body.thumb
                );
            }

            // for external embedded content, sanitize the URLs to make them safe/work in html5 tags ### Since when is there an exteral type?
          } else if (question.body.type === 'external') {
            question.body.src = question.body.src + '?uuid=' + uuid;
            // @ts-ignore
            question.body.src =
              this.domSanitizer.bypassSecurityTrustResourceUrl(
                question.body.src
              );

            // for slider questions, set the default value to be halfway between min and max
          } else if (question.body.type === 'slider') {
            // get min and max
            const min = question.body.min;
            const max = question.body.max;

            // set the default value of the slider to the middle value
            const model = min + (max - min) / 2;
            question.model = model;

            // a starting value must also be set for the slider to work properly
            question.value = model;

            // for checkbox items, the response is set to an empty array
          } else if (question.body.type === 'multi') {
            // set up checked tracking for checkbox questions types
            const tempOptions: Option[] = [];
            for (const option of question.body.options) {
              tempOptions.push({
                text: option,
                checked: false,
              });
            }
            question.body.optionsChecked = tempOptions;

            // counterbalance the choices if necessary
            if (question.body.shuffle) {
              question.body.optionsChecked = this.shuffle(
                question.body.optionsChecked
              );
            }

            // set the empty response to an array for checkbox questions
            if (!question.body.radio) {
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

  toggleDynamicQuestions(question: Question) {
    // if a question was hidden by rand_group
    // don't do any branching
    if (question.noToggle !== undefined && question.noToggle) {
      return;
    }

    const id = question.id;
    // hide anything with the id as long as the value is equal
    for (const section of this.survey.sections) {
      for (const q of section.questions) {
        if ('hide_id' in q && q.hide_id === id) {
          const hideValue = q.hide_value;

          if (
            question.body.type === 'multi' ||
            question.body.type === 'yesno' ||
            question.body.type === 'text'
          ) {
            // determine whether to hide/show the element
            const hideIf = q.hide_if;
            const valueEquals = hideValue === question.response;
            if (valueEquals === hideIf) {
              q.hideSwitch = false;
            } else {
              q.hideSwitch = true;
            }
          } else if (
            question.body.type === 'slider' &&
            typeof hideValue === 'string' &&
            question.response
          ) {
            const direction = hideValue.substring(0, 1);
            const cutoff = parseInt(
              hideValue.substring(1, hideValue.length),
              10
            );
            const lessThan = direction === '<';
            if (lessThan) {
              if (question.response <= cutoff) {
                q.hideSwitch = true;
              } else {
                q.hideSwitch = false;
              }
            } else {
              if (question.response >= cutoff) {
                q.hideSwitch = true;
              } else {
                q.hideSwitch = false;
              }
            }
          }
        }
      }
    }
  }

  /**
   * Triggered whenever the submit button is called
   * Checks if all required questions have been answered and then moves to the next section/saves the response
   */
  async submit() {
    let errorCount = 0;
    for (const question of this.questions) {
      if (
        question.required === true &&
        (question.response === '' || question.response === undefined) &&
        question.hideSwitch === true
      ) {
        question.hideError = false;
        // Only works for question types other than instruction
        if (question.body.type !== 'instruction') {
          errorCount++;
        }
      } else {
        question.hideError = true;
      }
    }

    if (errorCount === 0) {
      // if user on last page and there are no errors, fine to submit
      if (this.current_section === this.num_sections) {
        // add the alert time to the response

        this.tasks[this.task_index].alert_time = moment(
          new Date(this.tasks[this.task_index].time).toISOString()
        ).format();

        // get a timestmap of submission time in both readable and ms format
        const response_time = moment().format();
        this.tasks[this.task_index].response_time = response_time;

        const response_time_ms = moment().valueOf();
        this.tasks[this.task_index].response_time_ms = response_time_ms;

        // indicate that the current task is completed
        this.tasks[this.task_index].completed = true;

        // add all of the responses to an object in the task to be sent to server
        const responses: Responses = {};
        for (const section of this.survey.sections) {
          for (const question of section.questions) {
            responses[question.id] = question.response;
          }
        }
        this.tasks[this.task_index].responses = responses;

        // attempt to post surveyResponse to server
        this.surveyDataService
          .sendSurveyDataToServer({
            module_index: this.module_index,
            module_name: this.module_name,
            responses,
            response_time,
            response_time_in_ms: response_time_ms,
            alert_time: this.tasks[this.task_index].alert_time || '',
          })
          .catch(() => {});

        // write tasks back to storage
        await this.storage
          .set('study-tasks', JSON.stringify(this.tasks))
          .then(async () => {
            // save an exit log
            this.surveyDataService.logPageVisitToServer({
              timestamp: moment().format(),
              milliseconds: moment().valueOf(),
              page: 'survey',
              event: 'submit',
              module_index: this.module_index,
            });
            this.navController.navigateRoot('/');
          });
      } else {
        this.ngZone.run(() => {
          this.current_section++;
          this.questions =
            this.survey.sections[this.current_section - 1].questions;
          this.current_section_name =
            this.survey.sections[this.current_section - 1].name;

          if (this.current_section === this.num_sections) {
            this.submit_text = this.survey.submit_text;
          }

          this.content.scrollToTop(0);
        });
      }
    } else {
      this.content.scrollToTop(500);
      this.showToast('You must answer all required (*) questions', 'bottom');
    }
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
