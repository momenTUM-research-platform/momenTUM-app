import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { StudyTasksService } from '../../services/study-tasks/study-tasks.service';
import { StorageService } from '../../services/storage/storage.service';
import { NavController, ViewWillLeave } from '@ionic/angular';
import { Task } from 'src/app/interfaces/types';
import { Pvt } from 'src/app/interfaces/study';

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
  moduleId: string;
  reactionTimes: number[] = [];
  alertTime: string;

  // HELPER VARIABLES:
  taskIndex: number;
  reacted: boolean;
  reactedTooEarly = false;
  reactedTooLate = false;
  state: 'Instructions' | 'Countdown' | 'PVT' | 'Results' | 'Exited' =
    'Instructions';
  counter: number; // Countdown
  timer = 0; // for PVT page
  instructionTimer: any; // for Instructions page
  exited = false;
  readonly tooLateMessage = 'too late';
  readonly tooEarlyMessage = 'too early';

  constructor(
    private surveyDataService: DataService,
    private navController: NavController,
    private route: ActivatedRoute,
    private studyTasksService: StudyTasksService,
    private storageService: StorageService
  ) {}

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
      this.state = 'Results';
      this.submit();
    } else {
      this.submit();
      this.navHome();
    }
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
    const task = await this.storageService.getTaskByID(task_id);
    this.moduleId = task.uuid;
    const params = (await this.storageService.getModuleByID(this.moduleId))
      .params as Pvt;
    this.trials = params.trials;
    this.min = params.min_waiting;
    this.max = params.max_waiting;
    this.showResults = params.show;
    this.timeToTimeout = params.max_reaction;
    this.enableExit = params.exit;
  }

  /**
   * Finds a module in the local storage by one of its task_id's.
   *
   * @param task_id the task_id of a task of this module.
   * @returns A Promise with the correct module from the local storage.
   * */
  public async getModule(task_id: string | null): Promise<any> {
    let moduleIndex: number;
    return this.storageService
      .getTasks()
      .then((tasks) => {
        let taskIndex = 0;
        for (const task of tasks) {
          if (task_id === String(task.task_id)) {
            moduleIndex = task.index;
            this.alertTime = moment(new Date(task.time)).format();
            this.taskIndex = taskIndex;
            break;
          }
          taskIndex++;
        }
        return this.storageService.getStudy();
      })
      .then((studyObject: any) => JSON.parse(studyObject).modules[moduleIndex]);
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

    const tasks: Task[] = await this.storageService.getTasks();
    tasks[this.taskIndex].completed = true;
    tasks[this.taskIndex].response_time = responseTime;
    tasks[this.taskIndex].response_time_ms = responseTimeInMs;

    await this.surveyDataService.sendResponse(tasks[this.taskIndex]);
    this.storageService.saveTasks(tasks);
    this.surveyDataService.sendLog({
      timestamp: moment().format(),
      page: 'pvt',
      event: 'submit',
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
