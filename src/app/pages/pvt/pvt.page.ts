import { AfterViewInit, Component } from '@angular/core';
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
export class PvtPage implements AfterViewInit {
  // INPUT from study
  trials: number; // the number of times that the test will be conducted.
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
  state: 'tutorial' | 'countdown' | 'game' | 'results';
  counter: number; // Used for showing the countdown before starting the game.
  timer: any; // variable used for measuring the reaction-time.

  constructor(
    private surveyDataService: SurveyDataService,
    private router: Router,
    private route: ActivatedRoute,
    private studyTasksService: StudyTasksService,
    private storage: Storage
  ) {}

  /**
   * angular lifecycle hook method. check out https://angular.io/guide/lifecycle-hooks for more documentation.
   *
   * it sets up the variables and starts the pvt test.
   * */
  async ngAfterViewInit() {
    await this.setUpVariables();
    await this.conductPVT(false);
  }

  /**
   * composes the survey data, which will be sent to the server,
   * then sends the entries array to the server.
   * */
  async submit() {
    const surveyData = {
      module_index: this.moduleIndex,
      module_name: this.moduleName,
      entries: this.reactionTimes,
      response_time: moment().format(),
      response_time_in_ms: moment().valueOf(),
      alert_time: this.alertTime,
    };
    await this.surveyDataService.sendSurveyDataToServer(surveyData);
  }

  /**
   * starts the pvt test.
   * 1. loads the countdown.
   * 2. loads the PVT after the countdown.
   * 3. loads the results after the PVT.
   * */
  async startPvt() {
    // load all variables before changing state
    this.counter = 3;
    this.state = 'countdown';

    // conduct PVT
    await this.countdown();
    this.loadGame();
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
   * navigates to the home page
   * */
  async navHome() {
    await this.router.navigate(['/']);
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
   * decides what to do with the result according to the users' reaction.
   *
   * @param save decides, whether the measured results will be saved to the reactionTimes Array.
   * */
  private async handleResult(save: boolean) {
    if (save && !this.timer) {
      this.timer = 'you reacted too early.';
      this.reactionTimes.push(-2);
      this.trials++;
    } // user reacted too early. trial will be thrown away.
    else if (save && this.timer > this.maxReactionTime) {
      this.timer = 'waited for too long.';
      this.reactionTimes.push(-1);
      this.trials++;
    } // user's reaction time surpassed the maximumWaitingTime. trial will be thrown away.
    else if (save) {
      // user reacted normal
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
  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Counts down from 3 to 0. The counting number is stored in the counter variable.
   * */
  private async countdown() {
    this.counter = 3;
    for (let i = 3; i >= 0; i--) {
      await this.sleep(1000);
      this.counter--;
    }
  }

  /**
   * Recursive function, starts the timer.
   *
   * @param dur tells how long the timer should run.
   * */
  private async runTimer(dur: number) {
    if (this.reacted) {
      return;
    } // case in which the user reacted too early. The timer variable should be undefined here.
    this.timer = 0;
    const startingTime = Date.now();
    do {
      // 0. measure time
      this.timer = Date.now() - startingTime;
      await this.sleep(0);
    } while (!this.reacted && this.timer < dur);
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
   * @param save tells you if the test is going to save the results in reactionTimes array, and if it should count the trials.
   * */
  private async conductPVT(save: boolean) {
    let trialCount = 0;
    while (trialCount < this.trials) {
      // increment trialCount only if it's not the tutorial.
      if (save) {
        trialCount++;
      }
      // 0. setup all variables
      this.reacted = false;
      const waitingTime =
        this.timeInterval.min + Math.random() * this.timeInterval.dur; // calculate the waiting time
      const x = Date.now();
      // 1. wait for a random amount of time
      while (Date.now() - x < waitingTime) {
        await this.sleep(0); // anyone knows why this line is needed for refreshing?
        // checks, if the user exited the tutorial or the game, while the test was waiting.
        if (this.state !== 'tutorial' && this.state !== 'game') {
          return;
        }
      }
      // 2. start running the timer
      await this.runTimer(this.maxReactionTime);
      // 3. stop the timer
      await this.handleResult(save);
    } // Each loop is one single PVT test-round. The loop condition is that there are trials left.
    await this.submit(); // submit the data
    if (this.showResults) {
      this.loadResults();
    } else {
      await this.router.navigate(['/']);
    } // show results and / or navigate back to home.
  }

  /**
   * defines all parameters, which were specified in the study section concerning this module,
   * and defines other variables which need to be initialized.
   *
   * @returns a promise.
   * */
  private setUpVariables() {
    // set up other variables
    this.reactionTimes = [];
    this.state = 'tutorial';

    // get module parameters
    return this.getModule().then((module) => {
      this.trials = module.trials;
      this.timeInterval = {
        min: module.min_waiting,
        dur: module.min_waiting + module.max_waiting,
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
}
