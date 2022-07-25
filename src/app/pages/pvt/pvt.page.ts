import { Component, OnInit } from '@angular/core';
import { SurveyDataService } from '../../services/survey-data/survey-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { StudyTasksService } from '../../services/study-task/study-tasks.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-pvt',
  templateUrl: './pvt.page.html',
  styleUrls: ['./pvt.page.scss'],
})
export class PvtPage implements OnInit {
  // INPUT from study
  trials: number;
  min: number;
  max: number;
  showResults: boolean;
  timeToTimeout: number;
  enableExit: boolean;
  submitText: string;

  // OUTPUT
  moduleName: string;
  moduleIndex: number;
  reactionTimes: number[];
  alertTime: string;

  // HELPER VARIABLES:
  reacted: boolean;
  reactedTooEarly: boolean;
  reactedTooLate: boolean;
  state: 'instructions' | 'countdown' | 'RTT' | 'results';
  counter: number; // countdown
  timer: number; // for RTT page
  instructionTimer: any; // for instructions page
  exited: boolean;
  tooLateMessage: string = 'too late';
  tooEarlyMessage: string = 'too early';

  constructor(
    private surveyDataService: SurveyDataService,
    private router: Router,
    private route: ActivatedRoute,
    private studyTasksService: StudyTasksService,
    private storage: Storage
  ) {
    this.reactionTimes = [];
    this.state = 'instructions';
    this.exited = false;
    this.reactedTooLate = false;
    this.reactedTooEarly = false;
  }

  /**
   * Sets up the variables.
   * (Angular lifecycle hook method.
   * Check out https://angular.io/guide/lifecycle-hooks for more documentation)
   * */
  async ngOnInit() {
    await this.setUpVariables();
    this.instructionRTT();
  }

  /**
   * Handles the "start" button behavior.
   * Launches the whole process from counting down to finishing the RTT.
   * */
  async start() {
    this.state = 'countdown' // load view of countdown
    await this.countdown(3);
    this.state = 'RTT'; // load view of RTT
    await this.RTT();
    if (this.exited) {
      return;
    }
    this.exit();
  }

  /**
   * Handles the exit buttons behavior.
   * Submits the results.
   * Either loads the results page or navigates to the homepage.
   * */
  async exit() {
    this.exited = true;
    if (this.showResults) {
      this.state = 'results';
      this.submit();
    }
    else {
      this.submit();
      this.navHome();
    }
  }

  /**
   * Navigates to the homepage of the app.
   * */
  async navHome() {
    return this.router.navigate(['/']);
  }

  /**
   * Counts down to 0. The number being counted down is stored in the **counter** variable of this class.
   * @param from the number (in seconds) deciding the start of the countdown.
   * */
  private async countdown(from: number) {
    this.state = 'countdown';
    this.counter = from;
    while (this.counter > 0) {
      await this.sleep(1000);
      this.counter--;
    }
  }

  /**
   * Conducts the RTT (reaction time test).
   * */
  private async RTT() {
    let trialCount = 1;
    while (trialCount <= this.trials && !this.exited) {
      // reset variables
      this.timer = -1;
      this.reacted = false;
      this.reactedTooEarly = false;
      this.reactedTooLate = false;

      // calculate random time to wait
      let wait = PvtPage.getUniformRand(this.min, this.max);

      // wait for random amount of time while checking if the user exited or the user reacted
      let start = Date.now();
      while (!(Date.now() - start > wait || this.exited || this.reacted)) {
        await this.sleep(0);
      }

      // run the timer, but only if the user neither reacted nor exited the game.
      if (!(this.reacted || this.exited)) {
        await this.runTimer();
      }
      await this.handleResult();

      // show the result for a bit
      await this.sleep(2000);

      trialCount++;
    }
  }

  /**
   * Runs the timer as long as the following 3 conditions are met:
   * - the user didn't react
   * - the user didn't exit the game
   * - the timer didn't reach a bigger value than the timeToTimeout constant defined in the study file.
   * */
  private async runTimer() {
    this.timer = 0;
    const start = Date.now();
    do {
      this.timer = Date.now() - start; // update timer
      await this.sleep(0);
    } while (!this.reacted && !this.exited && this.timer < this.timeToTimeout);
  }

  /**
   * Decides what to do with the result. There are the following 4 cases, which are handled by this method:
   * - exited early.
   * - reacted too early.
   * - reacted too late.
   * - reacted correctly.
   * */
  private async handleResult() {
    if (this.exited) {
      return;
    }
    else if (this.timer === -1) {
      this.reactedTooEarly = true;
      this.timer = -1;
      this.reactionTimes.push(-2);
      this.trials++;
    }
    else if (this.timer > this.timeToTimeout) {
      this.reactedTooLate = true;
      this.timer = -1;
      this.reactionTimes.push(-1);
      this.trials++;
    }
    else {
      this.reactionTimes.push(this.timer);
    }
  }


  /**
   * Conducts a fake RTT for the instruction page.
   * */
  private async instructionRTT() {
    while (this.state === 'instructions') {
      this.instructionTimer = undefined;
      await this.sleep(this.min + Math.random() * (this.max - this.min));
      await this.runInstructionTimer();
      await this.sleep(2000);
    }
  }

  /**
   * Starts the fake timer and ends it after a random amount of time, between 250 and 350 ms
   * */
  private async runInstructionTimer() {
    this.instructionTimer = 0;
    const runTime = 250 + Math.random()*100;
    const start = Date.now();
    do {
      this.instructionTimer = Date.now() - start;
      await this.sleep(0);
    } while (this.instructionTimer < runTime);
  }

  /**
   * Defines all Input variables, which are defined in the study.
   * */
  private async setUpVariables() {
    const task_id = this.route.snapshot.paramMap.get('task_id')
    await this.getModule(task_id)
      .then((module) => {
        this.trials = module.trials;
        this.min = module.min_waiting;
        this.max = module.max_waiting;
        this.moduleName = module.name;
        this.showResults = module.show;
        this.timeToTimeout = module.max_reaction;
        this.enableExit = module.exit;
        this.submitText = module.submit_text;
      });
  }

  /**
   * Finds a module in the local storage by one of its task_id's.
   * @param task_id the task_id of a task of this module.
   * @returns A Promise with the correct module from the local storage.
   * */
  private async getModule(task_id: string | null): Promise<any> {
    return this.studyTasksService
      .getAllTasks()
      .then((tasks) => {
        for (const task of tasks) {
          if (task_id === String(task.task_id)) {
            this.moduleIndex = task.index;
            this.alertTime = moment(task.time).format();
            break;
          }
        }
        return this.storage.get('current-study');
      })
      .then((studyObject) => JSON.parse(studyObject).modules[this.moduleIndex]);
  }


  /**
   * Composes the output data and sends it to the server.
   * */
  private async submit() {
    const surveyData = {
      module_index: this.moduleIndex,
      module_name: this.moduleName,
      entries: this.reactionTimes,
      response_time: moment().format(),
      response_time_in_ms: moment().valueOf(),
      alert_time: this.alertTime,
    };
    return this.surveyDataService.sendSurveyDataToServer(surveyData);
  }

  /**
   * Waits for a certain amount of milliseconds.
   * @param ms number of milliseconds that the function waits
   * @returns a promise
   * */
  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Uses Math.random() to calculate a uniformly distributed random number between min and max.
   * @param min minimum number that can be generated.
   * @param max maximum number that can be generated.
   * @returns a uniformly distributed random number between the parameters.
   * */
  private static getUniformRand(min: number, max: number): number {
    return  min + Math.random() * (max - min);
  }
}
