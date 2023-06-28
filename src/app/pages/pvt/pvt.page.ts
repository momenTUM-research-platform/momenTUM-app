import { Component, OnInit } from '@angular/core';
import { SurveyDataService } from '../../services/survey-data/survey-data.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { StudyTasksService } from '../../services/study-task/study-tasks.service';
import { StorageService } from '../../services/storage/storage.service';
import { NavController, ViewWillLeave } from '@ionic/angular';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-pvt',
  templateUrl: './pvt.page.html',
  styleUrls: ['./pvt.page.scss'],
})
export class PvtPage implements OnInit, ViewWillLeave {
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
  taskIndex: number;
  reacted: boolean;
  reactedTooEarly: boolean;
  reactedTooLate: boolean;
  state: 'Instructions' | 'Countdown' | 'PVT' | 'Results' | 'Exited';
  counter: number; // Countdown
  timer: number; // for PVT page
  instructionTimer: any; // for Instructions page
  exited: boolean;
  readonly tooLateMessage = 'too late';
  readonly tooEarlyMessage = 'too early';

  constructor(
    private surveyDataService: SurveyDataService,
    private navController: NavController,
    private route: ActivatedRoute,
    private studyTasksService: StudyTasksService,
    private storageService: StorageService
  ) {
    this.reactionTimes = [];
    this.state = 'Instructions';
    this.exited = false;
    this.reactedTooLate = false;
    this.reactedTooEarly = false;
    this.timer = 0;
  }

  /**
   * Angular lifecycle hook method.
   * Read https://angular.io/guide/lifecycle-hooks.
   * */
  async ngOnInit() {
    await this.setStudyParameters();
    this.runInstructionTimer();
  }

  ionViewWillLeave() {
    this.state = 'Exited';
  }

  /**
   * Handles the "startPVT" button behavior.
   * Launches the whole process from counting down to finishing the PVT.
   * */
  async startPVT() {
    await this.countdown(3);
    if (this.exited) {
      return;
    }
    this.state = 'PVT'; // load view of PVT
    await this.PVT();
    if (this.exited) {
      return;
    }
    await this.exit();
  }

  /**
   * Handles the exit buttons behavior.
   * Submits the Results.
   * Either loads the Results page or navigates to the homepage.
   * */
  async exit() {
    this.exited = true;
    if (this.showResults) {
      this.submit();
      this.state = 'Results';
    } else {
      this.submit();
      this.navHome();
    }
    this.save();
  }

  async save() {
    const path = 'pvt-data.csv';
    Filesystem.readdir({
      path: '',
      directory: Directory.Documents,
    })
      .then((result) => {
        for (const file of result.files) {
          if (file.name === path) {
            return true;
          }
        }
        return false;
      })
      .then(async (found) => {
        let data = '';
        for (let i = 0; i < this.reactionTimes.length; i++) {
          data += `\n${i}, ${this.reactionTimes[i]}`;
        }
        data += '\n-, -';

        if (!found) {
          await Filesystem.writeFile({
            path,
            directory: Directory.Documents,
            data: 'trial index, reaction time' + data,
            encoding: Encoding.UTF8,
          });
        } else {
          await Filesystem.appendFile({
            path,
            directory: Directory.Documents,
            data,
            encoding: Encoding.UTF8,
          });
        }
      });
  }

  /**
   * Navigates to the homepage of the app.
   * */
  async navHome() {
    return this.navController.navigateRoot('/');
  }

  /**
   * Counts down to 0. The number being counted down is stored in the **counter** variable of this class.
   *
   * @param from the number (in seconds) deciding the startPVT of the Countdown.
   * */
  public async countdown(from: number) {
    this.state = 'Countdown';
    this.counter = from;
    while (this.counter > 0 && this.state === 'Countdown') {
      await this.sleep(1000);
      this.counter--;
    }
  }

  /**
   * Conducts the PVT (reaction time test).
   * */
  public async PVT() {
    let trialCount = 1;
    while (trialCount <= this.trials && !this.exited) {
      // reset variables
      this.timer = -1;
      this.reacted = this.reactedTooEarly = this.reactedTooLate = false;

      // calculate random time to wait
      const wait = this.getUniformRand(this.min, this.max);

      // wait for random amount of time while checking if the user exited or the user reacted
      const start = Date.now();
      while (!(Date.now() - start > wait || this.exited || this.reacted)) {
        await this.sleep(0);
      }

      // run the timer, but only if the user neither reacted nor exited the game.
      if (!this.reacted && !this.exited) {
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
  public async runTimer() {
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
  public async handleResult() {
    if (this.exited) {
      return;
    } else if (this.timer === -1) {
      this.reactedTooEarly = true;
      this.timer = -1;
      this.reactionTimes.push(-2);
      this.trials++;
    } else if (this.timer > this.timeToTimeout) {
      this.reactedTooLate = true;
      this.timer = -1;
      this.reactionTimes.push(-1);
      this.trials++;
    } else {
      this.reactionTimes.push(this.timer);
    }
  }

  /**
   * The runInstructionTimer() function
   * runs the instruction timer until a state change occurs.
   * It calculates a random amount of time (maxTime) for the timer to run,
   * and then increments the timer until it reaches maxTime.
   * The timer will only be rendered if it is greater than 0 (see html).
   * */
  public async runInstructionTimer() {
    this.state = 'Instructions';
    while (this.state === 'Instructions') {
      this.instructionTimer = 0;
      await this.sleep(this.min + Math.random() * (this.max - this.min));
      const maxTime = 250 + Math.random() * 100;
      const start = Date.now();
      do {
        this.instructionTimer = Date.now() - start; // update timer
        await this.sleep(0);
      } while (
        this.instructionTimer < maxTime &&
        this.state === 'Instructions'
      );
      if (this.state !== 'Instructions') {
        break;
      }
      await this.sleep(2000);
    }
  }

  /**
   * setStudyParameters()
   * copies all study-PVT-parameters from storage to the variables of this class.
   * */
  public async setStudyParameters() {
    const task_id = this.route.snapshot.paramMap.get('task_id');
    await this.getModule(task_id).then((module) => {
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
   *
   * @param task_id the task_id of a task of this module.
   * @returns A Promise with the correct module from the local storage.
   * */
  public async getModule(task_id: string | null): Promise<any> {
    return this.studyTasksService
      .getAllTasks()
      .then((tasks) => {
        let taskIndex = 0;
        for (const task of tasks) {
          if (task_id === String(task.task_id)) {
            this.moduleIndex = task.index;
            this.alertTime = moment(new Date(task.time)).format();
            this.taskIndex = taskIndex;
            break;
          }
          taskIndex++;
        }
        return this.storageService.get('current-study');
      })
      .then(
        (studyObject: any) => JSON.parse(studyObject).modules[this.moduleIndex]
      );
  }

  /**
   * Composes the output data and sends it to the server.
   * Edits the task list in the storage by marking the current task as completed.
   * Logs the pvt submit to the server.
   * Navigates back home.
   * */
  public async submit() {
    const responseTime = moment().format();
    const responseTimeInMs = moment().valueOf();

    const tasks: Task[] = await this.studyTasksService.getAllTasks();
    tasks[this.taskIndex].completed = true;
    tasks[this.taskIndex].response_time = responseTime;
    tasks[this.taskIndex].response_time_ms = responseTimeInMs;

    await this.surveyDataService.sendSurveyDataToServer({
      module_index: this.moduleIndex,
      module_name: this.moduleName,
      entries: this.reactionTimes,
      response_time: responseTime,
      response_time_in_ms: responseTimeInMs,
      alert_time: this.alertTime,
    });
    this.storageService.set('study-tasks', JSON.stringify(tasks));
    this.surveyDataService.logPageVisitToServer({
      timestamp: moment().format(),
      milliseconds: moment().valueOf(),
      page: 'pvt',
      event: 'submit',
      module_index: this.moduleIndex,
    });
  }

  /**
   * Waits for a certain amount of milliseconds.
   *
   * @param milliseconds number of milliseconds that the function waits
   * @returns a promise
   * */
  public sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  /**
   * Uses Math.random() to calculate a uniformly distributed random number between min and max.
   *
   * @param min minimum number that can be generated.
   * @param max maximum number that can be generated.
   * @returns a uniformly distributed random number between the parameters.
   * */
  public getUniformRand(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }
}
