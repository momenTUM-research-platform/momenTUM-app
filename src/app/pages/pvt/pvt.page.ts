import { Component, OnInit } from '@angular/core';
import { SurveyDataService } from "../../services/survery-data/survey-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from "moment";
import {StudyTasksService} from "../../services/study-task/study-tasks.service";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-pvt',
  templateUrl: './pvt.page.html',
  styleUrls: ['./pvt.page.scss'],
})
export class PvtPage implements OnInit {

  // INPUT from study
  numOfTrials: number; // the number of times that the test will be conducted.
  timeInterval: { min: number; dur: number }; // the time interval, in which the colored panel will emerge.
  // "min" is the minimum time after which the colored panel will emerge.
  // "dur" is the time span, which will be added to min. (in milliseconds)
  showResults: boolean; // decides whether the results of the test will be shown to the user.
  maxReactionTime: number; // The maximum reaction time a user can have, before the test will be cancelled and retaken. (in milliseconds)
  enableExit: boolean; // if true, the cross for early exit will be visible.
  submitText: string; // the text which is shown on the submit button.

  // OUTPUT
  moduleName: string; // the name of this module
  moduleIndex: number; // The index of this module.
  reactionTimes: number[]; // all reaction-times measured.
  alertTime: string; // The alert time of this task

  // HELPER VARIABLES:
  reacted: boolean; // contains information, if user reacted
  state: 'tutorial' | 'countdown' | 'game' | 'results'; // Current state of the Component. Can either equal to 'pre-state', 'countdown-state', 'game-state', or 'post-state'.
  countdown: number; // Used for showing the countdown before starting the game.
  timer: any; // variable used for measuring the reaction-time.

  constructor(private surveyDataService: SurveyDataService,
              private router: Router,
              private route: ActivatedRoute,
              private studyTasksService: StudyTasksService,
              private storage: Storage)
  {}

  /**
   * Angular standard function, which is called after construction when the component is initialized.
   * 1. loads the study data into the module variable
   * 2. sets up the pvt parameters according to the study
   * 3. starts the tutorial test
   * */
  ngOnInit() {
    this.setUpVariables()
      .then(() => this.conductPVT(false));
  }

  /**
   * submits the entries array to the server,
   * then routes back to the home page.
   * */
  submit() {
    const surveyData = {
      module_index: this.moduleIndex,
      module_name: this.moduleName,
      entries: [321, 423, 123, -1, -2, 124, 132],
      response_time: moment().format(),
      response_time_in_ms: moment().valueOf(),
      alert_time: this.alertTime,
    }

    this.surveyDataService.sendSurveyDataToServer(surveyData)
      .then(() => {
        return this.router.navigate(['/']);
      })
      .then(() => {
        console.log(surveyData);
      })
  }

  /**
   * starts the pvt test.
   * 1. loads the countdown.
   * 2. loads the PVT after the countdown.
   * 3. loads the results after the PVT.
   * */
  async startPvt() {
    // load all variables before changing state
    this.countdown = 3;
    this.state = 'countdown';

    // conduct PVT
    await this.countdownToZero();
    this.loadGame()
    return;
  }

  /**
   * Ends the game and loads the results
   * Is invoked when the user clicks on the cross icon during the game, or if the duration is over.
   * It activates the post-pane div.
   * */
  loadResults(): void {
    this.state = 'results';
    return;
  }

  /**
   * Loads the game-state.
   * Starts the official testing.
   * */
  private async loadGame() {
    this.state = 'game'; // activate the game-pane div.
    this.conductPVT(true);
    return;
  }

  /**
   * pushes the measured time to the entries array.
   * */
  private async handleResult(saveResults: boolean) {
    if (this.timer === undefined) {
      this.timer = 'you reacted too early.';
      this.reactionTimes.push(-2);
      this.numOfTrials++;
    } // user reacted too early. trial will be thrown away.
    else if (this.timer > this.maxReactionTime) {
      this.timer = 'waited for too long.'
      this.reactionTimes.push(-1);
      this.numOfTrials++;
    } // user's reaction time surpassed the maximumWaitingTime. trial will be thrown away.
    else if (saveResults) { // user reacted normal
      this.reactionTimes.push(this.timer);
    }
    // show the result for a bit.
    await this.sleep(2000);

    this.timer = undefined; // make timer invisible
    return;
  }

  /**
   * waits for a certain amount of milliseconds, and is used for delaying code execution
   *
   * @param ms number of milliseconds that the function waits
   * @returns a promise
   * */
  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Counts down from 3 to 0. The counting number is stored in the countdown variable.
   * */
  private async countdownToZero() {
    this.countdown = 3;
    for (let i = 3; i >= 0; i--) {
      await this.sleep(1000);
      this.countdown--;
    }
  }

  /**
   * Recursive function, starts the timer.
   * */
  private async runTimer(isTutorial: boolean) {
    if (this.reacted) {
      return null;
    }
    await this.incrementTimer(isTutorial);
    return null;
  }

  /**
   * updates the timer as fast as possible until the user reacts or the maxReactionTime was reached.
   * */
  private async incrementTimer(isTutorial: boolean) {
    this.timer = 0;
    const startingTime = Date.now();
    if (isTutorial) {
      do {
        // 0. measure time
        this.timer = Date.now() - startingTime;
        await this.sleep(0); // TODO: find out why this line is needed in order for it to work.
      } while (this.timer < 279 && this.state === 'tutorial');
    } // increment timer for tutorial purposes
    else {
      do {
        // 0. measure time
        this.timer = Date.now() - startingTime;
        await this.sleep(0); // TODO: find out why this line is needed in order for it to work.
      } while (!this.reacted && this.timer < this.maxReactionTime);
    } // increment timer for testing purposes
    return;
  }

  /**
   * conducts the following PVT test:
   * 0. check if conditions for testing are met.
   * 1. wait for a random amount of time.
   * 2. start the timer.
   * 3. stop the timer.
   * 4. show the result for a bit.
   * 5. make timer invisible.
   * 6. go to 0.
   *
   * @param saveResults tells you if the test is going to save the results in reactionTimes array, and if it should count the trials.
   * */
  private async conductPVT(saveResults: boolean) {
    let trialCount = 0; // stores the number/index of the current trial.
    while (trialCount < this.numOfTrials) {
      // increment trialCount only if it's not the tutorial.
      if (saveResults) {
        trialCount++
      }
      // 0. setup all variables
      this.reacted = false;
      const waitingTime = this.timeInterval.min + Math.random() * this.timeInterval.dur; // calculate the waiting time
      const x = Date.now();
      // 1. wait for a random amount of time
      while (Date.now()-x < waitingTime) {
        await this.sleep(0); // anyone knows why this line is needed for refreshing?
        // checks, if the user exited the tutorial or the game, while the test was waiting.
        if ((this.state !== 'tutorial' && this.state !== 'game')) {
          return;
        }
      }
      // 2. start running the timer
      await this.runTimer(!saveResults);
      // 3. stop the timer
      await this.handleResult(saveResults);
    } // Each loop is one single PVT test-round. The loop condition is that there are trials left.
    this.loadResults();
    return;
  }

  /**
   * defines all parameters, which were specified in the study section concerning this module,
   * and defines other variables which need to be initialized.
   *
   * @returns a promise.
   * */
  private setUpVariables(): Promise<any> {
    // set up other variables
    this.reactionTimes = [];
    this.state = 'tutorial';

    // get module parameters
    return this.getModule()
      .then((module) => {
        this.numOfTrials = module.trials;
        this.timeInterval = {
          min: module.min_waiting,
          dur: module.min_waiting + module.max_waiting
        };
        this.moduleName = module.name;
        this.showResults = module.show;
        this.maxReactionTime = module.max_reaction;
        this.enableExit = module.exit;
        this.submitText = module.submit_text;
        return;
    });

  }

  /**
   * Finds a module in the local storage by its task_id and returns it.
   *
   * @returns A Promise with the correct module from the local storage.
   * */
  private async getModule(): Promise<any> {

    const task_id = this.route.snapshot.paramMap.get('task_id');

    return this.studyTasksService
      .getAllTasks()
      .then((tasks) => {
        for (const task of tasks) {
          if (task_id == task.task_id) {
            this.moduleIndex = task.index;
            this.alertTime = moment(task.time).format();
            break;
          }
        }
        return this.storage.get('current-study');
      })
      .then((studyObject) => {
        return JSON.parse(studyObject).modules[this.moduleIndex];
      });
  }
}
