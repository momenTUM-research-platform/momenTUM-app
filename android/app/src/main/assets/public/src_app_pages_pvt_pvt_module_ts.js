"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_pvt_pvt_module_ts"],{

/***/ 4693:
/*!*************************************************!*\
  !*** ./src/app/pages/pvt/pvt-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PvtPageRoutingModule": () => (/* binding */ PvtPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _pvt_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pvt.page */ 8964);




const routes = [
    {
        path: '',
        component: _pvt_page__WEBPACK_IMPORTED_MODULE_0__.PvtPage
    }
];
let PvtPageRoutingModule = class PvtPageRoutingModule {
};
PvtPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], PvtPageRoutingModule);



/***/ }),

/***/ 3005:
/*!*****************************************!*\
  !*** ./src/app/pages/pvt/pvt.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PvtPageModule": () => (/* binding */ PvtPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _pvt_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pvt-routing.module */ 4693);
/* harmony import */ var _pvt_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pvt.page */ 8964);







let PvtPageModule = class PvtPageModule {
};
PvtPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _pvt_routing_module__WEBPACK_IMPORTED_MODULE_0__.PvtPageRoutingModule
        ],
        declarations: [_pvt_page__WEBPACK_IMPORTED_MODULE_1__.PvtPage]
    })
], PvtPageModule);



/***/ }),

/***/ 8964:
/*!***************************************!*\
  !*** ./src/app/pages/pvt/pvt.page.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PvtPage": () => (/* binding */ PvtPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _pvt_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pvt.page.html?ngResource */ 4185);
/* harmony import */ var _pvt_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pvt.page.scss?ngResource */ 3721);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_survey_data_survey_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/survey-data/survey-data.service */ 7965);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ 6908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services_study_task_study_tasks_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/study-task/study-tasks.service */ 5443);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/storage-angular */ 190);
var PvtPage_1;









let PvtPage = PvtPage_1 = class PvtPage {
    constructor(surveyDataService, router, route, studyTasksService, storage) {
        this.surveyDataService = surveyDataService;
        this.router = router;
        this.route = route;
        this.studyTasksService = studyTasksService;
        this.storage = storage;
        this.tooLateMessage = 'too late';
        this.tooEarlyMessage = 'too early';
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
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            yield this.setUpVariables();
            this.instructionRTT();
        });
    }
    /**
     * Handles the "start" button behavior.
     * Launches the whole process from counting down to finishing the RTT.
     * */
    start() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            this.state = 'countdown'; // load view of countdown
            yield this.countdown(3);
            this.state = 'RTT'; // load view of RTT
            yield this.RTT();
            if (this.exited) {
                return;
            }
            this.exit();
        });
    }
    /**
     * Handles the exit buttons behavior.
     * Submits the results.
     * Either loads the results page or navigates to the homepage.
     * */
    exit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            this.exited = true;
            if (this.showResults) {
                this.state = 'results';
                this.submit();
            }
            else {
                this.submit();
                this.navHome();
            }
        });
    }
    /**
     * Navigates to the homepage of the app.
     * */
    navHome() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            return this.router.navigate(['/']);
        });
    }
    /**
     * Counts down to 0. The number being counted down is stored in the **counter** variable of this class.
     * @param from the number (in seconds) deciding the start of the countdown.
     * */
    countdown(from) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            this.state = 'countdown';
            this.counter = from;
            while (this.counter > 0) {
                yield this.sleep(1000);
                this.counter--;
            }
        });
    }
    /**
     * Conducts the RTT (reaction time test).
     * */
    RTT() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            let trialCount = 1;
            while (trialCount <= this.trials && !this.exited) {
                // reset variables
                this.timer = -1;
                this.reacted = false;
                this.reactedTooEarly = false;
                this.reactedTooLate = false;
                // calculate random time to wait
                let wait = PvtPage_1.getUniformRand(this.min, this.max);
                // wait for random amount of time while checking if the user exited or the user reacted
                let start = Date.now();
                while (!(Date.now() - start > wait || this.exited || this.reacted)) {
                    yield this.sleep(0);
                }
                // run the timer, but only if the user neither reacted nor exited the game.
                if (!(this.reacted || this.exited)) {
                    yield this.runTimer();
                }
                yield this.handleResult();
                // show the result for a bit
                yield this.sleep(2000);
                trialCount++;
            }
        });
    }
    /**
     * Runs the timer as long as the following 3 conditions are met:
     * - the user didn't react
     * - the user didn't exit the game
     * - the timer didn't reach a bigger value than the timeToTimeout constant defined in the study file.
     * */
    runTimer() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            this.timer = 0;
            const start = Date.now();
            do {
                this.timer = Date.now() - start; // update timer
                yield this.sleep(0);
            } while (!this.reacted && !this.exited && this.timer < this.timeToTimeout);
        });
    }
    /**
     * Decides what to do with the result. There are the following 4 cases, which are handled by this method:
     * - exited early.
     * - reacted too early.
     * - reacted too late.
     * - reacted correctly.
     * */
    handleResult() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
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
        });
    }
    /**
     * Conducts a fake RTT for the instruction page.
     * */
    instructionRTT() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            while (this.state === 'instructions') {
                this.instructionTimer = undefined;
                yield this.sleep(this.min + Math.random() * (this.max - this.min));
                yield this.runInstructionTimer();
                yield this.sleep(2000);
            }
        });
    }
    /**
     * Starts the fake timer and ends it after a random amount of time, between 250 and 350 ms
     * */
    runInstructionTimer() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            this.instructionTimer = 0;
            const runTime = 250 + Math.random() * 100;
            const start = Date.now();
            do {
                this.instructionTimer = Date.now() - start;
                yield this.sleep(0);
            } while (this.instructionTimer < runTime);
        });
    }
    /**
     * Defines all Input variables, which are defined in the study.
     * */
    setUpVariables() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const task_id = this.route.snapshot.paramMap.get('task_id');
            yield this.getModule(task_id)
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
        });
    }
    /**
     * Finds a module in the local storage by one of its task_id's.
     * @param task_id the task_id of a task of this module.
     * @returns A Promise with the correct module from the local storage.
     * */
    getModule(task_id) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            return this.studyTasksService
                .getAllTasks()
                .then((tasks) => {
                for (const task of tasks) {
                    if (task_id === String(task.task_id)) {
                        this.moduleIndex = task.index;
                        this.alertTime = moment__WEBPACK_IMPORTED_MODULE_3__(task.time).format();
                        break;
                    }
                }
                return this.storage.get('current-study');
            })
                .then((studyObject) => JSON.parse(studyObject).modules[this.moduleIndex]);
        });
    }
    /**
     * Composes the output data and sends it to the server.
     * */
    submit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const surveyData = {
                module_index: this.moduleIndex,
                module_name: this.moduleName,
                entries: this.reactionTimes,
                response_time: moment__WEBPACK_IMPORTED_MODULE_3__().format(),
                response_time_in_ms: moment__WEBPACK_IMPORTED_MODULE_3__().valueOf(),
                alert_time: this.alertTime,
            };
            return this.surveyDataService.sendSurveyDataToServer(surveyData);
        });
    }
    /**
     * Waits for a certain amount of milliseconds.
     * @param ms number of milliseconds that the function waits
     * @returns a promise
     * */
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    /**
     * Uses Math.random() to calculate a uniformly distributed random number between min and max.
     * @param min minimum number that can be generated.
     * @param max maximum number that can be generated.
     * @returns a uniformly distributed random number between the parameters.
     * */
    static getUniformRand(min, max) {
        return min + Math.random() * (max - min);
    }
};
PvtPage.ctorParameters = () => [
    { type: _services_survey_data_survey_data_service__WEBPACK_IMPORTED_MODULE_2__.SurveyDataService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute },
    { type: _services_study_task_study_tasks_service__WEBPACK_IMPORTED_MODULE_4__.StudyTasksService },
    { type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_7__.Storage }
];
PvtPage = PvtPage_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-pvt',
        template: _pvt_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_pvt_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], PvtPage);



/***/ }),

/***/ 3721:
/*!****************************************************!*\
  !*** ./src/app/pages/pvt/pvt.page.scss?ngResource ***!
  \****************************************************/
/***/ ((module) => {

module.exports = "* {\n  color: black;\n  text-align: center;\n  padding: 0;\n  margin: 0;\n}\n\nh1 {\n  font-size: 40px;\n  font-weight: bold;\n  padding-top: 30%;\n}\n\nh2 {\n  font-weight: bold;\n  font-size: 30px;\n  position: relative;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\np {\n  font-size: 15px;\n  padding: 2% 5%;\n}\n\nbutton {\n  background: transparent;\n  font-size: 20px;\n  font-weight: bold;\n  position: absolute;\n  bottom: 10%;\n  transform: translateX(-50%);\n  width: 90%;\n  color: black;\n}\n\nbutton:hover {\n  color: grey;\n}\n\n.top-right-position {\n  position: absolute;\n  right: 5%;\n  top: 10%;\n}\n\n.timer-box {\n  height: 80px;\n  width: 160px;\n  box-shadow: inset 0 0 0 2px;\n  margin: 20px 0;\n  position: relative;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.center-abs {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.pane {\n  background: white;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB2dC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0E7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtBQVJGOztBQVdBO0VBQ0UsZUFkYztFQWVkLGlCQUFBO0VBQ0EsZ0JBQUE7QUFSRjs7QUFXQTtFQUNFLGlCQUFBO0VBQ0EsZUFwQmM7RUFxQmQsa0JBQUE7RUFDQSxRQUFBO0VBQ0EsMkJBQUE7QUFSRjs7QUFXQTtFQUNFLGVBMUJrQjtFQTJCbEIsY0FBQTtBQVJGOztBQVdBO0VBQ0UsdUJBQUE7RUFDQSxlQS9CZTtFQWdDZixpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLDJCQUFBO0VBQ0EsVUFBQTtFQUNBLFlBQUE7QUFSRjs7QUFXQTtFQUNFLFdBQUE7QUFSRjs7QUFXQTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7QUFSRjs7QUFXQTtFQUNFLFlBeERlO0VBeURmLFlBMURjO0VBMkRkLDJCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLDJCQUFBO0FBUkY7O0FBV0E7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsZ0NBQUE7QUFSRjs7QUFXQTtFQUNFLGlCQUFBO0VBQ0EsWUFBQTtBQVJGIiwiZmlsZSI6InB2dC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkdGltZXJCb3hXaWR0aDogMTYwcHg7XG4kdGltZXJCb3hIZWlnaHQ6IDgwcHg7XG5cbiR0aXRsZUZvbnRTaXplOiA0MHB4O1xuJHRpbWVyRm9udFNpemU6IDMwcHg7XG4kcGFyYWdyYXBoRm9udFNpemU6IDE1cHg7XG4kYnV0dG9uRm9udFNpemU6IDIwcHg7XG5cblxuKiB7XG4gIGNvbG9yOiBibGFjaztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG59XG5cbmgxIHtcbiAgZm9udC1zaXplOiAkdGl0bGVGb250U2l6ZTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHBhZGRpbmctdG9wOiAzMCU7XG59XG5cbmgyIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc2l6ZTogJHRpbWVyRm9udFNpemU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbn1cblxucCB7XG4gIGZvbnQtc2l6ZTogJHBhcmFncmFwaEZvbnRTaXplO1xuICBwYWRkaW5nOiAyJSA1JTtcbn1cblxuYnV0dG9uIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGZvbnQtc2l6ZTogJGJ1dHRvbkZvbnRTaXplO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDEwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICB3aWR0aDogOTAlO1xuICBjb2xvcjogYmxhY2s7XG59XG5cbmJ1dHRvbjpob3ZlciB7XG4gIGNvbG9yOiBncmV5O1xufVxuXG4udG9wLXJpZ2h0LXBvc2l0aW9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogNSU7XG4gIHRvcDogMTAlO1xufVxuXG4udGltZXItYm94IHtcbiAgaGVpZ2h0OiAkdGltZXJCb3hIZWlnaHQ7XG4gIHdpZHRoOiAkdGltZXJCb3hXaWR0aDtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgMnB4O1xuICBtYXJnaW46IDIwcHggMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbn1cblxuLmNlbnRlci1hYnMge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsLTUwJSk7XG59XG5cbi5wYW5lIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGhlaWdodDogMTAwJTtcbn1cbiJdfQ== */";

/***/ }),

/***/ 4185:
/*!****************************************************!*\
  !*** ./src/app/pages/pvt/pvt.page.html?ngResource ***!
  \****************************************************/
/***/ ((module) => {

module.exports = "<ion-content scroll-y=\"false\">\n  <!--Tutorial Page-->\n  <div *ngIf=\"state==='instructions'\" class=\"pane\">\n    <h1>\n      TUTORIAL\n    </h1>\n    <p>\n      Welcome! Reaction-time-testing is easy: it's just a reflex game. Some numbers will flash onto the screen suddenly, and your job will be to respond as soon as possible by touching the screen. When someone plays it, the screen looks something like this:\n    </p>\n    <div class=\"timer-box\">\n      <h2 class=\"timer-font\">\n        {{instructionTimer}}\n      </h2>\n    </div>\n    <p>\n      The game will last for {{trials}} trials.\n    </p>\n    <p *ngIf=\"enableExit\">\n      You can also end the game at any time by clicking the x in the upper right corner.\n    </p>\n    <button (click)=\"start()\">\n      < start >\n    </button>\n  </div>\n\n  <!--Countdown Page-->\n  <div *ngIf=\"state==='countdown'\" class=\"pane\">\n    <h1>\n      Trial starts in {{counter}}\n    </h1>\n  </div>\n\n  <!--RTT Page-->\n  <div *ngIf=\"state==='RTT'\" (touchstart)=\"reacted = true\" class=\"pane\">\n    <ion-icon class=\"top-right-position\" size=\"large\" (click)=\"exit()\" name=\"close\" *ngIf=\"enableExit\"></ion-icon>\n    <div class=\"timer-box center-abs\">\n      <h2 *ngIf=\"timer >= 0\">\n        {{timer}}\n      </h2>\n      <h2 *ngIf=\"reactedTooLate\">\n        {{tooLateMessage}}\n      </h2>\n      <h2 *ngIf=\"reactedTooEarly\">\n        {{tooEarlyMessage}}\n      </h2>\n    </div>\n  </div>\n\n  <!--Results Page-->\n  <div *ngIf=\"state==='results'\" class=\"pane\">\n    <h1>\n      RESULTS\n    </h1>\n    <p *ngIf=\"showResults\" class=\"center-abs\">\n        {{reactionTimes}}\n    </p>\n    <button (mousedown)=\"navHome()\">\n      < {{submitText}} >\n    </button>\n  </div>\n\n</ion-content>\n\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_pvt_pvt_module_ts.js.map