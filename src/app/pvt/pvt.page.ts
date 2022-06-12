import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pvt',
  templateUrl: './pvt.page.html',
  styleUrls: ['./pvt.page.scss'],
})
/**
 * TODO: Implement the documentation for this class
 * */
export class PvtPage implements OnInit {

  // INPUT from study:
  numOfTrials: number; // the number of times that the test will be conducted.
  timeInterval: { min: number; dur: number }; // the time interval, in which the colored panel will emerge.
  // "min" is the minimum time after which the colored panel will emerge.
  // "dur" is the time span, which will be added to min. (in milliseconds)
  showResults: boolean; // decides whether the results of the test will be shown to the user.
  maxReactionTime: number; // The maximum reaction time a user can have, before the test will be cancelled and retaken. (in milliseconds)

  // OUTPUT: TODO: create an OUTPUP datastructure
  entries: number[]; // all reaction-times measured.

  // HELPER VARIABLES:
  trialNumber: number;
  reacted: boolean;
  state: string; // Current state of the Component. Can either equal to 'pre-state', 'countdown-state', 'game-state', or 'post-state'.
  countdown: number; // Used for showing the countdown before starting the game.
  timer: number; // variable used for measuring the reaction-time.
  private endedGame: boolean;

  // TODO: The initial values should be defined according to the study.json file.
  constructor() {
    this.state = 'pre-state';
    this.numOfTrials = 10;
    this.entries = Array(this.numOfTrials).fill(-1);
    this.timeInterval = {min: 2000, dur: 1000};
    this.showResults = true;
    this.maxReactionTime = 2000;
    this.reacted = false;
    this.endedGame = false;
    this.trialNumber = 1;
    this.conductTest(true);
  }

  ngOnInit() {
  }

  /**
   * computes the average of the entries[] array.
   *
   * @returns the average value of the entries[] array elements.
   **/
  average(): number {
    // check if entries[] is empty
    if (this.entries.length === 0) {
      return null;
    }

    let average = 0;
    this.entries.forEach(entry => {
      average += entry;
    });
    average /= this.entries.length;
    return Math.round(average);
  }

  /**
   * computes the minimum entry of the entries[] array.
   *
   * @returns the minimum entry of the entries[] array.
   * */
  best(): number {
    // check if entries[] is empty
    if (this.entries.length === 0) {
      return null;
    }

    // calculate best
    let best = this.entries[0];
    this.entries.forEach(entry => {
      if (entry < best) {
        best = entry;
      }
    });
    return best;
  }

  /**
   * computes the maximum entry of the entries[] array
   *
   * @returns maximum entry of the entries[] array
   * */
  worst(): number {

    // check if entries[] is empty
    if (this.entries.length === 0) {
      return null;
    }

    // calculate worst
    let worst = this.entries[0];
    this.entries.forEach(entry => {
      if (entry > worst) {
        worst = entry;
      }
    });
    return worst;
  }

  /**
   * Loads the game-state. Starts the official testing.
   * */
  async loadGame() {
    this.state = 'game-state'; // activate the game-pane div.
    await this.conductTest(false);
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
   * loads the countdown page.
   * When it's done with the countdown, it loads the game page.
   * */
  async loadCountdown() {
    // load all variables before changing state
    this.countdown = 3;
    this.state = 'countdown-state';

    // countdown
    await this.countdownToZero();
    this.loadGame().
    then(() => this.loadResults());
    return;
  }

  /**
   * pushes the measured time to the entries array.
   * */
  async stopTimer(isTutorial: boolean) {
    console.log(' stopTimer() start');
    if (isTutorial) { // tutorial case
      console.log('...time data is thrown away. test was just for the tutorial...');
    }
    else if (this.timer === undefined) { // user reacted too early
      console.log('...user reacted too early, test will be retaken...');
      this.reacted = false;
      return;
    }
    else if (this.timer > this.maxReactionTime) { // user reacted too slow
      console.log('...reaction time reached max...');
      this.reacted = false;
      this.trialNumber++;
    }
    else { // user reacted normal
      console.log('...user reacted in ' + this.timer + ' seconds');
      this.entries[this.trialNumber-1] = this.timer;
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
  private async startTimer(isTutorial: boolean) {
    console.log(' startTimer() start.');
    if (this.reacted) {
      return null;
    }
    await this.incrementTimer(isTutorial);
    console.log(' startTimer() stop.');
    return null;
  }

  /**
   * updates the timer as fast as possible until the user reacts or the maxReactionTime was reached.
   * */
  private async incrementTimer(isTutorial: boolean) {
    console.log('  incrementTimer() start.');
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
    console.log('  incrementTimer() stop.');
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
    console.log('conductTest() start.');
    while (isTutorial || this.trialNumber <= this.numOfTrials) {
      // 0. set all variables
      this.reacted = false;
      // 1. wait for a random amount of time
      const waitingTime = this.timeInterval.min + Math.random() * this.timeInterval.dur; // calculate waiting time
      console.log(`...waiting for ${waitingTime / 1000} seconds...`);
      const x = Date.now();
      while (Date.now()-x < waitingTime) {
        await this.sleep(0); // TODO: why is this line needed for refreshing?
        if ((this.state !== 'pre-state' && this.state !== 'game-state')) {
          console.log('conductTest() stop: state switch.');
          return;
        }
      }
      // 2. start the timer
      await this.startTimer(isTutorial);
      // 3. stop the timer
      await this.stopTimer(isTutorial);
    } // test as long as there are trials left.
    console.log('conductTest() stop.');
    this.loadResults();
    return;
  }
}
