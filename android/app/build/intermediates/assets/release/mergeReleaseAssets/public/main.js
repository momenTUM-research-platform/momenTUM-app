(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["main"],{

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 2816);



const routes = [
    {
        path: '',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_tabs_tabs_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./tabs/tabs.module */ 5564)).then(m => m.TabsPageModule)
    },
    {
        path: 'survey/:task_id',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_survey_survey_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/survey/survey.module */ 6013)).then(m => m.SurveyPageModule)
    },
    {
        path: 'pvt/:task_id',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_pvt_pvt_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./pages/pvt/pvt.module */ 3005)).then(m => m.PvtPageModule)
    },
    {
        path: 'home',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_pages_home_home_module_ts"), __webpack_require__.e("common")]).then(__webpack_require__.bind(__webpack_require__, /*! ./pages/home/home.module */ 7994)).then(m => m.HomePageModule)
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forRoot(routes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__.PreloadAllModules })
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
    })
], AppRoutingModule);



/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component.html?ngResource */ 3383);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic-native/local-notifications/ngx */ 7265);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/splash-screen/ngx */ 7954);
/* harmony import */ var _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/status-bar/ngx */ 1714);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _services_survey_data_survey_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/survey-data/survey-data.service */ 7965);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ 6908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/storage-angular */ 190);












let AppComponent = class AppComponent {
    constructor(platform, splashScreen, statusBar, localNotifications, surveyDataService, router, ngZone, alertCtrl, storage) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.localNotifications = localNotifications;
        this.surveyDataService = surveyDataService;
        this.router = router;
        this.ngZone = ngZone;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.isAppInForeground = Promise.resolve();
        this.initializeApp();
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            yield this.platform.ready();
            yield this.storage.create();
            this.platform.pause.subscribe(() => {
                this.isAppInForeground = new Promise((resolve) => {
                    this.readyApp = resolve;
                });
            });
            this.platform.resume.subscribe(() => {
                this.readyApp();
            });
            // handle notification click
            this.localNotifications.on('click').subscribe((notification) => (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
                yield this.isAppInForeground;
                // log that the user clicked on this notification
                const logEvent = {
                    timestamp: moment__WEBPACK_IMPORTED_MODULE_5__().format(),
                    milliseconds: moment__WEBPACK_IMPORTED_MODULE_5__().valueOf(),
                    page: 'notification-' + moment__WEBPACK_IMPORTED_MODULE_5__(notification.data.task_time).format(),
                    event: 'click',
                    module_index: notification.data.task_index,
                };
                this.surveyDataService.logPageVisitToServer(logEvent);
                this.router.navigate(['survey/' + notification.data.task_id]);
            }));
            // wait for device ready and then fire any pending click events
            yield this.isAppInForeground;
            this.localNotifications.fireQueuedEvents();
        });
    }
    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
};
AppComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.Platform },
    { type: _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_2__.SplashScreen },
    { type: _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_3__.StatusBar },
    { type: _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_1__.LocalNotifications },
    { type: _services_survey_data_survey_data_service__WEBPACK_IMPORTED_MODULE_4__.SurveyDataService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__.Router },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.NgZone },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.AlertController },
    { type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_10__.Storage }
];
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-root',
        template: _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
    })
], AppComponent);



/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule),
/* harmony export */   "LanguageLoader": () => (/* binding */ LanguageLoader)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic-native/splash-screen/ngx */ 7954);
/* harmony import */ var _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic-native/status-bar/ngx */ 1714);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng2-charts */ 4195);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/barcode-scanner/ngx */ 5684);
/* harmony import */ var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/local-notifications/ngx */ 7265);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic/storage-angular */ 7566);
/* harmony import */ var _ionic_native_http_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/http/ngx */ 4719);
/* harmony import */ var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/file-transfer/ngx */ 1059);
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/file/ngx */ 2358);
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ 9048);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common/http */ 8784);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngx-translate/core */ 7514);
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/http-loader */ 5347);











/* plugins */










function LanguageLoader(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_10__.TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
let AppModule = class AppModule {
};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.NgModule)({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__.AppComponent],
        entryComponents: [],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_13__.BrowserModule,
            ng2_charts__WEBPACK_IMPORTED_MODULE_14__.NgChartsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonicModule.forRoot(),
            _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_16__.IonicStorageModule.forRoot(),
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__.AppRoutingModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_17__.HttpClientModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslateModule.forRoot({
                loader: {
                    provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslateLoader,
                    useFactory: LanguageLoader,
                    deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_17__.HttpClient],
                },
            }),
        ],
        providers: [
            _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_1__.StatusBar,
            _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_0__.SplashScreen,
            _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_4__.BarcodeScanner,
            _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_5__.LocalNotifications,
            _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_9__.InAppBrowser,
            _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_8__.File,
            _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_7__.FileTransfer,
            _ionic_native_http_ngx__WEBPACK_IMPORTED_MODULE_6__.HTTP,
            _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormsModule,
            { provide: _angular_router__WEBPACK_IMPORTED_MODULE_20__.RouteReuseStrategy, useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonicRouteStrategy },
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__.AppComponent],
    })
], AppModule);



/***/ }),

/***/ 5443:
/*!************************************************************!*\
  !*** ./src/app/services/study-task/study-tasks.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StudyTasksService": () => (/* binding */ StudyTasksService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/storage-angular */ 190);



let StudyTasksService = class StudyTasksService {
    constructor(storage) {
        this.storage = storage;
    }
    /**
     * Creates a list of tasks (e.g. surveys, interventions) based on their
     * alert schedules
     *
     * @param studyObject A JSON object that contains all data about a study
     */
    generateStudyTasks(studyObject) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            // allocate the participant to a study condition
            const min = 1;
            const max = studyObject.properties.conditions.length;
            const condition_index = Math.floor(Math.random() * (max - min + 1)) + min - 1;
            const condition = studyObject.properties.conditions[condition_index];
            const study_tasks = [];
            // the ID for a task. Is this a sensible starting point?
            let task_ID = 101;
            // loop through all of the modules in this study
            // and create the associated study tasks based
            // on the alert schedule
            for (const [i, mod] of studyObject.modules.entries()) {
                // if the module is assigned to the participant's condition
                // add it to the list, otherwise just skip it
                if (mod.condition === condition || mod.condition === '*') {
                    const module_uuid = mod.uuid;
                    const module_duration = mod.alerts.duration;
                    const module_offset = mod.alerts.start_offset;
                    const module_unlock_after = mod.unlock_after === undefined ? [] : mod.unlock_after;
                    const module_random = mod.alerts.random;
                    const module_sticky = mod.alerts.sticky;
                    const module_sticky_label = mod.alerts.sticky_label;
                    const module_timeout = mod.alerts.timeout;
                    const module_timeout_after = mod.alerts.timeout_after;
                    const module_randomInterval = mod.alerts.random_interval;
                    const module_times = mod.alerts.times;
                    const alert_title = mod.alerts.title;
                    const alert_message = mod.alerts.message;
                    const typeToIcon = {
                        survey: 'checkmark-circle-outline',
                        video: 'film-outline',
                        audio: 'headset-outline',
                        info: 'bulb-outline',
                        pvt: 'alarm-outline',
                    };
                    const module_type = typeToIcon[mod.type] || 'default';
                    const module_name = mod.name;
                    const module_index = i;
                    const startDay = new Date(); // set a date object for today
                    startDay.setHours(0, 0, 0, 0); // set the time to midnight
                    // add offset days to get first day of alerts
                    startDay.setDate(startDay.getDate() + module_offset);
                    // counter to be used when scheduling sticky tasks with notifications
                    let sticky_count = 0;
                    for (let numDays = 0; numDays < module_duration; numDays++) {
                        // for each alert time, get the hour and minutes and if necessary randomise it
                        module_times.forEach((module) => {
                            const taskTime = new Date(startDay.getTime());
                            taskTime.setHours(module.hours);
                            taskTime.setMinutes(module.minutes);
                            if (module_random) {
                                // remove the randomInterval from the time
                                taskTime.setMinutes(taskTime.getMinutes() - module_randomInterval);
                                // calc a random number between 0 and (randomInterval * 2)
                                // to account for randomInterval either side
                                const randomMinutes = Math.random() * (module_randomInterval * 2);
                                // add the random number of minutes to the dateTime
                                taskTime.setMinutes(taskTime.getMinutes() + randomMinutes);
                            }
                            // create a task object
                            const options = {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            };
                            const task_obj = {
                                uuid: module_uuid,
                                index: module_index,
                                task_id: task_ID,
                                name: module_name,
                                type: module_type,
                                hidden: !(module_sticky && sticky_count === 0),
                                unlock_after: module_unlock_after,
                                sticky: module_sticky,
                                sticky_label: module_sticky_label,
                                alert_title,
                                alert_message,
                                timeout: module_timeout,
                                timeout_after: module_timeout_after,
                                time: taskTime.toString(),
                                locale: taskTime.toLocaleString('en-US', options),
                                completed: false,
                            };
                            study_tasks.push(task_obj);
                            // increment task id
                            task_ID++;
                            // increment the sticky count
                            sticky_count++;
                        });
                        // as a final step increment the date by 1 to set for next day
                        startDay.setDate(startDay.getDate() + 1);
                    }
                }
            }
            study_tasks.sort((a, b) => {
                const dateA = new Date(a.time);
                const dateB = new Date(b.time);
                return dateA.getTime() - dateB.getTime();
            });
            // save tasks and condition to storage
            yield this.storage.set('condition', condition);
            yield this.storage.set('study-tasks', study_tasks);
            return study_tasks;
        });
    }
    /**
     * Returns all the tasks that have been created for a study
     */
    getAllTasks() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const tasks = yield this.storage.get('study-tasks');
            return tasks;
        });
    }
    /**
     * Gets the tasks that are currently available for the user to complete
     */
    getTaskDisplayList() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            const study_tasks = yield this.storage.get('study-tasks');
            let tasks_to_display = [];
            const sticky_tasks = [];
            const time_tasks = [];
            let last_header = '';
            for (const task of study_tasks) {
                // check if task has a pre_req
                const unlocked = this.checkTaskIsUnlocked(task, study_tasks);
                const alertTime = new Date(Date.parse(task.time));
                const now = new Date();
                if (now > alertTime && unlocked) {
                    if (task.sticky) {
                        if (!task.hidden) {
                            if (last_header !== task.sticky_label) {
                                // push a new header into the sticky_tasks array
                                const header = { type: 'header', label: task.sticky_label };
                                sticky_tasks.push(header);
                                last_header = task.sticky_label;
                            }
                            // push the sticky task
                            sticky_tasks.push(task);
                        }
                    }
                    else {
                        // check if task is set to timeout
                        if (task.timeout) {
                            let timeoutTime = new Date(Date.parse(task.time));
                            timeoutTime = new Date(timeoutTime.getTime() + task.timeout_after);
                            if (now < timeoutTime && !task.completed) {
                                time_tasks.push(task);
                            }
                        }
                        else if (!task.completed) {
                            time_tasks.push(task);
                        }
                    }
                }
            }
            // reverse the time_tasks list so newest is displayed first
            if (time_tasks.length > 0) {
                time_tasks.reverse();
                const header_1 = { type: 'header', label: 'Recent' };
                time_tasks.unshift(header_1);
            }
            // merge the time_tasks array with the sticky_tasks array
            tasks_to_display = time_tasks.concat(sticky_tasks);
            // return the tasks list reversed to ensure correct order
            return tasks_to_display.reverse();
        });
    }
    /**
     *
     * @param task
     * @param study_tasks
     */
    checkTaskIsUnlocked(task, study_tasks) {
        // get a set of completed task uuids
        const completedUUIDs = new Set();
        for (const study_task of study_tasks) {
            if (study_task.completed) {
                completedUUIDs.add(study_task.uuid);
            }
        }
        // get the list of prereqs from the task
        const prereqs = task.unlock_after;
        let unlock = true;
        for (const prereq of prereqs) {
            if (!completedUUIDs.has(prereq)) {
                unlock = false;
                break;
            }
        }
        return unlock;
    }
};
StudyTasksService.ctorParameters = () => [
    { type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_1__.Storage }
];
StudyTasksService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
        providedIn: 'root',
    })
], StudyTasksService);



/***/ }),

/***/ 7965:
/*!*************************************************************!*\
  !*** ./src/app/services/survey-data/survey-data.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SurveyDataService": () => (/* binding */ SurveyDataService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/storage-angular */ 190);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _study_task_study_tasks_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../study-task/study-tasks.service */ 5443);
/* harmony import */ var _uuid_uuid_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../uuid/uuid.service */ 6611);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 8784);
/* harmony import */ var _ionic_native_http_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/http/ngx */ 4719);








let SurveyDataService = class SurveyDataService {
    constructor(httpClient, http2, storage, platform, uuidService, studyTasksService) {
        this.httpClient = httpClient;
        this.http2 = http2;
        this.storage = storage;
        this.platform = platform;
        this.uuidService = uuidService;
        this.studyTasksService = studyTasksService;
    }
    /**
     * Downloads a survey from a remote URL
     *
     * @param surveyURL The web URL where a survey is hosted.
     */
    getRemoteData(surveyURL) {
        return new Promise((resolve, reject) => {
            this.http2.setRequestTimeout(7);
            // Now a get request
            this.http2
                .get(surveyURL, { seed: 'f2d91e73' }, {})
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * Saves data to local storage
     *
     * @param key
     * @param data
     */
    saveToLocalStorage(key, data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            this.storage.set(key, data);
        });
    }
    /**
     * Attempts to submit a survey response to the server, and if unsuccessful saves it for later attempts
     *
     * @param surveyData An object containing all metadata about a survey response
     */
    sendSurveyDataToServer(surveyData) {
        return Promise.all([
            this.storage.get('current-study'),
            this.storage.get('uuid'),
            this.studyTasksService.getAllTasks(),
        ]).then((values) => {
            const studyJSON = JSON.parse(values[0]);
            const uuid = values[1];
            const tasks = values[2];
            const dataUuid = this.uuidService.generateUUID('pending-data');
            // create form data to store the survey data
            const bodyData = new FormData();
            bodyData.append('data_type', 'survey_response');
            bodyData.append('user_id', uuid);
            bodyData.append('study_id', studyJSON === null || studyJSON === void 0 ? void 0 : studyJSON.properties.study_id);
            bodyData.append('module_index', String(surveyData.module_index));
            bodyData.append('module_name', surveyData.module_name);
            'responses' in surveyData &&
                bodyData.append('responses', JSON.stringify(surveyData.responses));
            bodyData.append('response_time', surveyData.response_time);
            bodyData.append('response_time_in_ms', String(surveyData.response_time_in_ms));
            bodyData.append('alert_time', surveyData.alert_time);
            bodyData.append('platform', this.platform.platforms()[0]);
            return this.attemptHttpPost(studyJSON === null || studyJSON === void 0 ? void 0 : studyJSON.properties.post_url, bodyData).then((postSuccessful) => {
                if (!postSuccessful) {
                    const object = {};
                    bodyData.forEach((value, key) => {
                        object[key] = value;
                    });
                    const json = JSON.stringify(object);
                    this.storage.set(dataUuid, json);
                }
            });
        });
    }
    /**
     * Attempts to send a log (e.g. page visit) to the server, and if unsuccessful saves it for later attempts
     *
     * @param logEvent An object containing metadata about a log event
     */
    logPageVisitToServer(logEvent) {
        return Promise.all([
            this.storage.get('current-study'),
            this.storage.get('uuid'),
        ]).then((values) => {
            const studyJSON = JSON.parse(values[0]);
            const uuid = values[1];
            const logUuid = this.uuidService.generateUUID('pending-log');
            // create form data to store the log data
            const bodyData = new FormData();
            bodyData.append('data_type', 'log');
            bodyData.append('user_id', uuid);
            bodyData.append('study_id', studyJSON === null || studyJSON === void 0 ? void 0 : studyJSON.properties.study_id);
            bodyData.append('module_index', logEvent.module_index);
            bodyData.append('page', logEvent.page);
            bodyData.append('event', logEvent.event);
            bodyData.append('timestamp', logEvent.timestamp);
            bodyData.append('timestamp_in_ms', String(logEvent.milliseconds));
            bodyData.append('platform', this.platform.platforms()[0]);
            return this.attemptHttpPost(studyJSON === null || studyJSON === void 0 ? void 0 : studyJSON.properties.post_url, bodyData).then((postSuccessful) => {
                if (!postSuccessful) {
                    const object = {};
                    bodyData.forEach((value, key) => {
                        object[key] = value;
                    });
                    const json = JSON.stringify(object);
                    this.storage.set(logUuid, json);
                }
            });
        });
    }
    /**
     * Attempts to upload any logs/data that was unsuccessfully sent to the server on previous attempts
     *
     * @param dataType The type of data to attempt to upload, e.g. 'pending-logs' (log events) or 'pending-data' (survey responses)
     */
    uploadPendingData(dataType) {
        return Promise.all([this.storage.get('current-study'), this.storage.keys()])
            .then((values) => {
            const studyJSON = JSON.parse(values[0]);
            const keys = values[1];
            const pendingLogKeys = [];
            for (const key of keys) {
                if (key.startsWith(dataType)) {
                    pendingLogKeys.push(key);
                }
            }
            return {
                pendingLogKeys,
                post_url: studyJSON === null || studyJSON === void 0 ? void 0 : studyJSON.properties.post_url,
            };
        })
            .then((data) => {
            data.pendingLogKeys.map((pendingKey) => {
                this.storage.get(pendingKey).then((log) => {
                    const logJSONObj = JSON.parse(log);
                    const bodyData = new FormData();
                    for (const key in logJSONObj) {
                        if (logJSONObj.hasOwnProperty(key)) {
                            bodyData.append(key, logJSONObj[key]);
                        }
                    }
                    this.attemptHttpPost(data.post_url, bodyData).then((postSuccessful) => {
                        if (postSuccessful) {
                            this.storage.remove(pendingKey);
                        }
                    });
                });
            });
        });
    }
    /**
     * Attempts to send the survey data via POST to a server
     *
     * @param postURL The URL for a study's data collection server
     * @param bodyData The data to send to that server
     */
    attemptHttpPost(postURL, bodyData) {
        return new Promise((resolve) => {
            this.httpClient.post(postURL, bodyData).subscribe({
                next: (v) => {
                    resolve(v);
                    console.log('Notice Survey: ' + v);
                },
                error: (e) => {
                    console.info('Error in attemptHttpPost ' + e || 0);
                    resolve(false);
                },
                complete: () => {
                    console.info('Complete');
                    resolve(true);
                },
            });
        });
    }
};
SurveyDataService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient },
    { type: _ionic_native_http_ngx__WEBPACK_IMPORTED_MODULE_2__.HTTP },
    { type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_5__.Storage },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.Platform },
    { type: _uuid_uuid_service__WEBPACK_IMPORTED_MODULE_1__.UuidService },
    { type: _study_task_study_tasks_service__WEBPACK_IMPORTED_MODULE_0__.StudyTasksService }
];
SurveyDataService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injectable)({
        providedIn: 'root',
    })
], SurveyDataService);



/***/ }),

/***/ 6611:
/*!***********************************************!*\
  !*** ./src/app/services/uuid/uuid.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UuidService": () => (/* binding */ UuidService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanoid */ 8170);



let UuidService = class UuidService {
    constructor() { }
    generateUUID(prefix) {
        return prefix + (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)();
    }
};
UuidService.ctorParameters = () => [];
UuidService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
        providedIn: 'root',
    })
], UuidService);



/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 8150);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




//(<any>window).skipLocalNotificationReady = true;
if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.log(err));


/***/ }),

/***/ 863:
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ion-accordion_2.entry.js": [
		79,
		"common",
		"node_modules_ionic_core_dist_esm_ion-accordion_2_entry_js"
	],
	"./ion-action-sheet.entry.js": [
		5593,
		"common",
		"node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js"
	],
	"./ion-alert.entry.js": [
		3225,
		"common",
		"node_modules_ionic_core_dist_esm_ion-alert_entry_js"
	],
	"./ion-app_8.entry.js": [
		4812,
		"common",
		"node_modules_ionic_core_dist_esm_ion-app_8_entry_js"
	],
	"./ion-avatar_3.entry.js": [
		6655,
		"common",
		"node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js"
	],
	"./ion-back-button.entry.js": [
		4856,
		"common",
		"node_modules_ionic_core_dist_esm_ion-back-button_entry_js"
	],
	"./ion-backdrop.entry.js": [
		3059,
		"node_modules_ionic_core_dist_esm_ion-backdrop_entry_js"
	],
	"./ion-breadcrumb_2.entry.js": [
		8648,
		"common",
		"node_modules_ionic_core_dist_esm_ion-breadcrumb_2_entry_js"
	],
	"./ion-button_2.entry.js": [
		8308,
		"common",
		"node_modules_ionic_core_dist_esm_ion-button_2_entry_js"
	],
	"./ion-card_5.entry.js": [
		4690,
		"common",
		"node_modules_ionic_core_dist_esm_ion-card_5_entry_js"
	],
	"./ion-checkbox.entry.js": [
		4090,
		"common",
		"node_modules_ionic_core_dist_esm_ion-checkbox_entry_js"
	],
	"./ion-chip.entry.js": [
		6214,
		"common",
		"node_modules_ionic_core_dist_esm_ion-chip_entry_js"
	],
	"./ion-col_3.entry.js": [
		9447,
		"node_modules_ionic_core_dist_esm_ion-col_3_entry_js"
	],
	"./ion-datetime_3.entry.js": [
		9689,
		"common",
		"node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js"
	],
	"./ion-fab_3.entry.js": [
		8840,
		"common",
		"node_modules_ionic_core_dist_esm_ion-fab_3_entry_js"
	],
	"./ion-img.entry.js": [
		749,
		"node_modules_ionic_core_dist_esm_ion-img_entry_js"
	],
	"./ion-infinite-scroll_2.entry.js": [
		9667,
		"common",
		"node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js"
	],
	"./ion-input.entry.js": [
		3288,
		"common",
		"node_modules_ionic_core_dist_esm_ion-input_entry_js"
	],
	"./ion-item-option_3.entry.js": [
		5473,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js"
	],
	"./ion-item_8.entry.js": [
		3634,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item_8_entry_js"
	],
	"./ion-loading.entry.js": [
		2855,
		"common",
		"node_modules_ionic_core_dist_esm_ion-loading_entry_js"
	],
	"./ion-menu_3.entry.js": [
		495,
		"common",
		"node_modules_ionic_core_dist_esm_ion-menu_3_entry_js"
	],
	"./ion-modal.entry.js": [
		8737,
		"common",
		"node_modules_ionic_core_dist_esm_ion-modal_entry_js"
	],
	"./ion-nav_2.entry.js": [
		9632,
		"common",
		"node_modules_ionic_core_dist_esm_ion-nav_2_entry_js"
	],
	"./ion-picker-column-internal.entry.js": [
		4446,
		"common",
		"node_modules_ionic_core_dist_esm_ion-picker-column-internal_entry_js"
	],
	"./ion-picker-internal.entry.js": [
		2275,
		"node_modules_ionic_core_dist_esm_ion-picker-internal_entry_js"
	],
	"./ion-popover.entry.js": [
		8050,
		"common",
		"node_modules_ionic_core_dist_esm_ion-popover_entry_js"
	],
	"./ion-progress-bar.entry.js": [
		8994,
		"common",
		"node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js"
	],
	"./ion-radio_2.entry.js": [
		3592,
		"common",
		"node_modules_ionic_core_dist_esm_ion-radio_2_entry_js"
	],
	"./ion-range.entry.js": [
		5454,
		"common",
		"node_modules_ionic_core_dist_esm_ion-range_entry_js"
	],
	"./ion-refresher_2.entry.js": [
		290,
		"common",
		"node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js"
	],
	"./ion-reorder_2.entry.js": [
		2666,
		"common",
		"node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js"
	],
	"./ion-ripple-effect.entry.js": [
		4816,
		"node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js"
	],
	"./ion-route_4.entry.js": [
		5534,
		"common",
		"node_modules_ionic_core_dist_esm_ion-route_4_entry_js"
	],
	"./ion-searchbar.entry.js": [
		4902,
		"common",
		"node_modules_ionic_core_dist_esm_ion-searchbar_entry_js"
	],
	"./ion-segment_2.entry.js": [
		1938,
		"common",
		"node_modules_ionic_core_dist_esm_ion-segment_2_entry_js"
	],
	"./ion-select_3.entry.js": [
		8179,
		"common",
		"node_modules_ionic_core_dist_esm_ion-select_3_entry_js"
	],
	"./ion-slide_2.entry.js": [
		668,
		"node_modules_ionic_core_dist_esm_ion-slide_2_entry_js"
	],
	"./ion-spinner.entry.js": [
		1624,
		"common",
		"node_modules_ionic_core_dist_esm_ion-spinner_entry_js"
	],
	"./ion-split-pane.entry.js": [
		9989,
		"node_modules_ionic_core_dist_esm_ion-split-pane_entry_js"
	],
	"./ion-tab-bar_2.entry.js": [
		8902,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js"
	],
	"./ion-tab_2.entry.js": [
		199,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab_2_entry_js"
	],
	"./ion-text.entry.js": [
		8395,
		"common",
		"node_modules_ionic_core_dist_esm_ion-text_entry_js"
	],
	"./ion-textarea.entry.js": [
		6357,
		"common",
		"node_modules_ionic_core_dist_esm_ion-textarea_entry_js"
	],
	"./ion-toast.entry.js": [
		8268,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toast_entry_js"
	],
	"./ion-toggle.entry.js": [
		2312,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toggle_entry_js"
	],
	"./ion-virtual-scroll.entry.js": [
		2875,
		"node_modules_ionic_core_dist_esm_ion-virtual-scroll_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 863;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 6700:
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": 8685,
	"./af.js": 8685,
	"./ar": 254,
	"./ar-dz": 4312,
	"./ar-dz.js": 4312,
	"./ar-kw": 2614,
	"./ar-kw.js": 2614,
	"./ar-ly": 8630,
	"./ar-ly.js": 8630,
	"./ar-ma": 8674,
	"./ar-ma.js": 8674,
	"./ar-sa": 9032,
	"./ar-sa.js": 9032,
	"./ar-tn": 4730,
	"./ar-tn.js": 4730,
	"./ar.js": 254,
	"./az": 3052,
	"./az.js": 3052,
	"./be": 150,
	"./be.js": 150,
	"./bg": 3069,
	"./bg.js": 3069,
	"./bm": 3466,
	"./bm.js": 3466,
	"./bn": 8516,
	"./bn-bd": 557,
	"./bn-bd.js": 557,
	"./bn.js": 8516,
	"./bo": 6273,
	"./bo.js": 6273,
	"./br": 9588,
	"./br.js": 9588,
	"./bs": 9815,
	"./bs.js": 9815,
	"./ca": 3331,
	"./ca.js": 3331,
	"./cs": 1320,
	"./cs.js": 1320,
	"./cv": 2219,
	"./cv.js": 2219,
	"./cy": 8266,
	"./cy.js": 8266,
	"./da": 6427,
	"./da.js": 6427,
	"./de": 7435,
	"./de-at": 2871,
	"./de-at.js": 2871,
	"./de-ch": 2994,
	"./de-ch.js": 2994,
	"./de.js": 7435,
	"./dv": 2357,
	"./dv.js": 2357,
	"./el": 5649,
	"./el.js": 5649,
	"./en-au": 9961,
	"./en-au.js": 9961,
	"./en-ca": 9878,
	"./en-ca.js": 9878,
	"./en-gb": 3924,
	"./en-gb.js": 3924,
	"./en-ie": 864,
	"./en-ie.js": 864,
	"./en-il": 1579,
	"./en-il.js": 1579,
	"./en-in": 940,
	"./en-in.js": 940,
	"./en-nz": 6181,
	"./en-nz.js": 6181,
	"./en-sg": 4301,
	"./en-sg.js": 4301,
	"./eo": 5291,
	"./eo.js": 5291,
	"./es": 4529,
	"./es-do": 3764,
	"./es-do.js": 3764,
	"./es-mx": 2584,
	"./es-mx.js": 2584,
	"./es-us": 3425,
	"./es-us.js": 3425,
	"./es.js": 4529,
	"./et": 5203,
	"./et.js": 5203,
	"./eu": 678,
	"./eu.js": 678,
	"./fa": 3483,
	"./fa.js": 3483,
	"./fi": 6262,
	"./fi.js": 6262,
	"./fil": 2521,
	"./fil.js": 2521,
	"./fo": 4555,
	"./fo.js": 4555,
	"./fr": 3131,
	"./fr-ca": 8239,
	"./fr-ca.js": 8239,
	"./fr-ch": 1702,
	"./fr-ch.js": 1702,
	"./fr.js": 3131,
	"./fy": 267,
	"./fy.js": 267,
	"./ga": 3821,
	"./ga.js": 3821,
	"./gd": 1753,
	"./gd.js": 1753,
	"./gl": 4074,
	"./gl.js": 4074,
	"./gom-deva": 2762,
	"./gom-deva.js": 2762,
	"./gom-latn": 5969,
	"./gom-latn.js": 5969,
	"./gu": 2809,
	"./gu.js": 2809,
	"./he": 5402,
	"./he.js": 5402,
	"./hi": 315,
	"./hi.js": 315,
	"./hr": 410,
	"./hr.js": 410,
	"./hu": 8288,
	"./hu.js": 8288,
	"./hy-am": 7928,
	"./hy-am.js": 7928,
	"./id": 1334,
	"./id.js": 1334,
	"./is": 6959,
	"./is.js": 6959,
	"./it": 4864,
	"./it-ch": 1124,
	"./it-ch.js": 1124,
	"./it.js": 4864,
	"./ja": 6141,
	"./ja.js": 6141,
	"./jv": 9187,
	"./jv.js": 9187,
	"./ka": 2136,
	"./ka.js": 2136,
	"./kk": 4332,
	"./kk.js": 4332,
	"./km": 8607,
	"./km.js": 8607,
	"./kn": 4305,
	"./kn.js": 4305,
	"./ko": 234,
	"./ko.js": 234,
	"./ku": 6003,
	"./ku.js": 6003,
	"./ky": 5061,
	"./ky.js": 5061,
	"./lb": 2786,
	"./lb.js": 2786,
	"./lo": 6183,
	"./lo.js": 6183,
	"./lt": 29,
	"./lt.js": 29,
	"./lv": 4169,
	"./lv.js": 4169,
	"./me": 8577,
	"./me.js": 8577,
	"./mi": 8177,
	"./mi.js": 8177,
	"./mk": 337,
	"./mk.js": 337,
	"./ml": 5260,
	"./ml.js": 5260,
	"./mn": 2325,
	"./mn.js": 2325,
	"./mr": 4695,
	"./mr.js": 4695,
	"./ms": 5334,
	"./ms-my": 7151,
	"./ms-my.js": 7151,
	"./ms.js": 5334,
	"./mt": 3570,
	"./mt.js": 3570,
	"./my": 7963,
	"./my.js": 7963,
	"./nb": 8028,
	"./nb.js": 8028,
	"./ne": 6638,
	"./ne.js": 6638,
	"./nl": 302,
	"./nl-be": 6782,
	"./nl-be.js": 6782,
	"./nl.js": 302,
	"./nn": 3501,
	"./nn.js": 3501,
	"./oc-lnc": 563,
	"./oc-lnc.js": 563,
	"./pa-in": 869,
	"./pa-in.js": 869,
	"./pl": 5302,
	"./pl.js": 5302,
	"./pt": 9687,
	"./pt-br": 4884,
	"./pt-br.js": 4884,
	"./pt.js": 9687,
	"./ro": 9107,
	"./ro.js": 9107,
	"./ru": 3627,
	"./ru.js": 3627,
	"./sd": 355,
	"./sd.js": 355,
	"./se": 3427,
	"./se.js": 3427,
	"./si": 1848,
	"./si.js": 1848,
	"./sk": 4590,
	"./sk.js": 4590,
	"./sl": 184,
	"./sl.js": 184,
	"./sq": 6361,
	"./sq.js": 6361,
	"./sr": 8965,
	"./sr-cyrl": 1287,
	"./sr-cyrl.js": 1287,
	"./sr.js": 8965,
	"./ss": 5456,
	"./ss.js": 5456,
	"./sv": 451,
	"./sv.js": 451,
	"./sw": 7558,
	"./sw.js": 7558,
	"./ta": 2702,
	"./ta.js": 2702,
	"./te": 3693,
	"./te.js": 3693,
	"./tet": 1243,
	"./tet.js": 1243,
	"./tg": 2500,
	"./tg.js": 2500,
	"./th": 5768,
	"./th.js": 5768,
	"./tk": 7761,
	"./tk.js": 7761,
	"./tl-ph": 5780,
	"./tl-ph.js": 5780,
	"./tlh": 9590,
	"./tlh.js": 9590,
	"./tr": 3807,
	"./tr.js": 3807,
	"./tzl": 3857,
	"./tzl.js": 3857,
	"./tzm": 654,
	"./tzm-latn": 8806,
	"./tzm-latn.js": 8806,
	"./tzm.js": 654,
	"./ug-cn": 845,
	"./ug-cn.js": 845,
	"./uk": 9232,
	"./uk.js": 9232,
	"./ur": 7052,
	"./ur.js": 7052,
	"./uz": 7967,
	"./uz-latn": 2233,
	"./uz-latn.js": 2233,
	"./uz.js": 7967,
	"./vi": 8615,
	"./vi.js": 8615,
	"./x-pseudo": 2320,
	"./x-pseudo.js": 2320,
	"./yo": 1313,
	"./yo.js": 1313,
	"./zh-cn": 4490,
	"./zh-cn.js": 4490,
	"./zh-hk": 5910,
	"./zh-hk.js": 5910,
	"./zh-mo": 8262,
	"./zh-mo.js": 8262,
	"./zh-tw": 4223,
	"./zh-tw.js": 4223
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 6700;

/***/ }),

/***/ 3383:
/*!***********************************************!*\
  !*** ./src/app/app.component.html?ngResource ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = "<ion-app>\n  <ion-router-outlet></ion-router-outlet>\n</ion-app>\n";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map