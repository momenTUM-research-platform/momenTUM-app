import { Component, OnInit } from '@angular/core';
import { SurveyDataService } from "../services/survey-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from "moment";
import {StudyTasksService} from "../services/study-tasks.service";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-pvt',
  templateUrl: './pvt.page.html',
  styleUrls: ['./pvt.page.scss'],
})
export class PvtPage implements OnInit {

  // INPUT from study
  module: any; // storage for study-data of this module

  numOfTrials: number; // the number of times that the test will be conducted.
  timeInterval: { min: number; dur: number }; // the time interval, in which the colored panel will emerge.
  // "min" is the minimum time after which the colored panel will emerge.
  // "dur" is the time span, which will be added to min. (in milliseconds)
  showResults: boolean; // decides whether the results of the test will be shown to the user.
  maxReactionTime: number; // The maximum reaction time a user can have, before the test will be cancelled and retaken. (in milliseconds)
  enableExit: boolean; // if true, the cross for early exit will be visible.
  submitText: string; // the text which is shown on the submit button.

  // OUTPUT
  reactionTimes: number[]; // all reaction-times measured.

  // HELPER VARIABLES:
  trialNumber: number; // stores the current trial index
  reacted: boolean; // contains information, if user reacted
  state: string; // Current state of the Component. Can either equal to 'pre-state', 'countdown-state', 'game-state', or 'post-state'.
  countdown: number; // Used for showing the countdown before starting the game.
  timer: number; // variable used for measuring the reaction-time.

  constructor(private surveyDataService: SurveyDataService,
              private router: Router,
              private route: ActivatedRoute,
              private studyTasksService: StudyTasksService,
              private storage: Storage)
  { }

  /**
   * Angular standard function, which is called after construction when the component is initialized.
   * 1. loads the study data into the module variable
   * 2. sets up the pvt parameters according to the study
   * 3. starts the tutorial test
   * */
  async ngOnInit() {
    await this.getModule();
    await this.setUpVariables();
    this.conductTest(true);
  }

  /**
   * submits the entries array to the server and loads the home page
   * */
  submit() {
    this.surveyDataService.sendSurveyDataToServer({
      name: "pvt",
      entries: this.reactionTimes,
      time: moment().format
    })
      .then(() => this.router.navigate(['/']));
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
    this.state = 'countdown-state';

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
    this.state = 'post-state';
    return;
  }

  /**
   * Loads the game-state.
   * Starts the official testing.
   * */
  private async loadGame() {
    this.state = 'game-state'; // activate the game-pane div.
    this.conductTest(false);
    return;
  }

  /**
   * pushes the measured time to the entries array.
   * */
  private async stopTimer(isTutorial: boolean) {
    if (isTutorial) { // tutorial case
    }
    else if (this.timer === undefined) { // user reacted too early
      this.reacted = false;
      return;
    }
    else if (this.timer > this.maxReactionTime) { // user reacted too slow
      this.reacted = false;
      this.trialNumber++;
    }
    else { // user reacted normal
      this.reactionTimes[this.trialNumber-1] = this.timer;
      this.trialNumber++;
    }

    // show the result for a bit.
    const w = Date.now();
    while (Date.now() - w < 2000 && (this.state === 'pre-state' || this.state === 'game-state')) {
      await this.sleep(0);
    }

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
   * recursive function, which is called for counting down the 'countdown' variable to 0 and wait 1 second each time it gets decremented.
   * */
  private countdownToZero(): Promise<any> {
    return this.sleep(1000).then(() => {
      if (this.countdown === 0) {
        return;
      } else {
        this.countdown--;
        return this.countdownToZero();
      }
    });
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
      } while (this.timer < 279 && this.state === 'pre-state');
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
   * 0. check if conditions for testing are met.
   * 1. wait for a random amount of time.
   * 2. start the timer.
   * 3. stop the timer.
   * 4. show the result for a bit.
   * 5. make timer invisible.
   * 6. go to 0.
   * */
  private async conductTest(isTutorial: boolean) {
    while (isTutorial || this.trialNumber <= this.numOfTrials) {
      // 0. set all variables
      this.reacted = false;
      // 1. wait for a random amount of time
      const waitingTime = this.timeInterval.min + Math.random() * this.timeInterval.dur; // calculate waiting time
      const x = Date.now();
      while (Date.now()-x < waitingTime) {
        await this.sleep(0); // anyone knows why this line is needed for refreshing?
        if ((this.state !== 'pre-state' && this.state !== 'game-state')) {
          return;
        }
      }
      // 2. start the timer
      await this.runTimer(isTutorial);
      // 3. stop the timer
      await this.stopTimer(isTutorial);
    } // test as long as there are trials left.
    this.loadResults();
    return;
  }

  /**
   * Is supposed to load all the different parameters, which were defined in the specific pvt module of the study.
   * */
  private setUpVariables() {
    this.numOfTrials = this.module.trials;
    this.reactionTimes = Array(this.numOfTrials).fill(-1);
    this.timeInterval = {
      min: this.module.min_waiting,
      dur: this.module.min_waiting + this.module.max_waiting
    };
    this.showResults = this.module.show;
    this.maxReactionTime = this.module.max_reaction;
    this.enableExit = this.module.exit;
    this.submitText = this.module.submit_text;

    this.trialNumber = 1;
    this.state = 'pre-state';
  }

  /**
   * Gets the correct module from the list of modules, which contains all the information for the setup of this task.
   * */
  private async getModule() {
    const id = this.route.snapshot.paramMap.get('task_id');
    await this.studyTasksService.getAllTasks().then((tasks) => {
      let t = tasks;
      for (let i = 0; i < t.length; i++) {
        if (id == t[i].task_id) {
          const index = t[i].index;
          let studyObject: any;
          return this.storage.get('current-study')
            .then(ret => studyObject = ret)
            .then(() => {
              console.log(studyObject);
              this.module = JSON.parse(studyObject).modules[index];
              console.log(this.module);
            });
        }
      }
    });
  }
}
