"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_survey_survey_module_ts"],{

/***/ 173:
/*!*******************************************************!*\
  !*** ./src/app/pages/survey/survey-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SurveyPageRoutingModule": () => (/* binding */ SurveyPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _survey_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./survey.page */ 7039);




const routes = [
    {
        path: '',
        component: _survey_page__WEBPACK_IMPORTED_MODULE_0__.SurveyPage
    }
];
let SurveyPageRoutingModule = class SurveyPageRoutingModule {
};
SurveyPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], SurveyPageRoutingModule);



/***/ }),

/***/ 6013:
/*!***********************************************!*\
  !*** ./src/app/pages/survey/survey.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SurveyPageModule": () => (/* binding */ SurveyPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _survey_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./survey-routing.module */ 173);
/* harmony import */ var _survey_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./survey.page */ 7039);







let SurveyPageModule = class SurveyPageModule {
};
SurveyPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _survey_routing_module__WEBPACK_IMPORTED_MODULE_0__.SurveyPageRoutingModule
        ],
        declarations: [_survey_page__WEBPACK_IMPORTED_MODULE_1__.SurveyPage]
    })
], SurveyPageModule);



/***/ }),

/***/ 7039:
/*!*********************************************!*\
  !*** ./src/app/pages/survey/survey.page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SurveyPage": () => (/* binding */ SurveyPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _survey_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./survey.page.html?ngResource */ 3803);
/* harmony import */ var _survey_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./survey.page.scss?ngResource */ 2749);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/storage-angular */ 190);
/* harmony import */ var _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/status-bar/ngx */ 1714);
/* harmony import */ var src_app_services_study_task_study_tasks_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/study-task/study-tasks.service */ 5443);
/* harmony import */ var _services_survey_data_survey_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/survey-data/survey-data.service */ 7965);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ 9048);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ 6908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);













let SurveyPage = class SurveyPage {
    constructor(route, storage, statusBar, domSanitizer, navController, studyTasksService, surveyDataService, toastController, ngZone, iab) {
        this.route = route;
        this.storage = storage;
        this.statusBar = statusBar;
        this.domSanitizer = domSanitizer;
        this.navController = navController;
        this.studyTasksService = studyTasksService;
        this.surveyDataService = surveyDataService;
        this.toastController = toastController;
        this.ngZone = ngZone;
        this.iab = iab;
        // the text to display as submit button label
        this.submit_text = 'Submit';
        // variables to handle the sections
        this.current_section = 1;
        // survey template - load prior to data from storage ### This seems like the wrong survey format
        this.survey = {
            type: '',
            name: '',
            submit_text: '',
            condition: '',
            alerts: {
                title: '',
                message: '',
                start_offset: 0,
                duration: 0,
                times: [],
                random: false,
                random_interval: 0,
                sticky: false,
                sticky_label: '',
                timeout: false,
                timeout_after: 0,
            },
            graph: {
                display: false,
                variable: '',
                title: '',
                blurb: '',
                type: 'bar',
                max_points: 0,
            },
            sections: [
                {
                    name: '',
                    shuffle: false,
                    questions: [],
                }
            ],
            uuid: '',
            unlock_after: [],
            shuffle: false,
        };
    }
    /**
     * Triggered when the survey page is first opened
     * Initialises the survey and displays it on the screen
     */
    ngOnInit() {
        // set statusBar to visible on Android
        //this.statusBar.styleLightContent();
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#0F2042');
        // necessary to update height of external embedded content
        window.addEventListener('message', (e) => {
            if (e.data.hasOwnProperty('frameHeight')) {
                (document.querySelector('iframe[src^="' + e.data.url + '"]')).style.height = `${e.data.frameHeight + 10}px`;
                (document.querySelector('iframe[src^="' + e.data.url + '"]')).style.width = `99%`;
            }
        });
        // the id of the task to be displayed
        this.task_id = this.route.snapshot.paramMap.get('task_id') || '';
        Promise.all([
            this.storage.get('current-study'),
            this.storage.get('uuid'),
        ]).then((values) => {
            const studyObject = values[0];
            const uuid = values[1];
            // get the task object for this task
            this.studyTasksService.getAllTasks().then((tasks) => {
                this.tasks = tasks;
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
                        this.showToast('This task had a time limit and is no longer available.', 'bottom');
                        this.navController.navigateRoot('/');
                    }
                });
                // extract the JSON from the study object
                this.study = JSON.parse(studyObject);
                // get the correct module
                this.survey = this.study.modules[this.module_index];
                // shuffle modules if required
                if (this.survey.shuffle) {
                    this.survey.sections = this.shuffle(this.survey.sections);
                }
                // shuffle questions if required
                for (const section of this.survey.sections) {
                    if (section.shuffle) {
                        section.questions = this.shuffle(section.questions);
                    }
                }
                // get the name of the current section
                this.num_sections = this.survey.sections.length;
                this.current_section_name =
                    this.survey.sections[this.current_section - 1].name;
                // get the user ID and then set up question variables
                // initialise all of the questions to be displayed
                this.setupQuestionVariables(uuid);
                // set the submit text as appropriate
                if (this.current_section < this.num_sections) {
                    this.submit_text = 'Next';
                }
                else {
                    this.submit_text = this.survey.submit_text;
                }
                // set the current section of questions
                this.questions =
                    this.survey.sections[this.current_section - 1].questions;
                // toggle rand_group questions
                // figure out which ones are grouped together, randomly show one and set its response value to 1
                const randomGroups = {};
                for (const section of this.survey.sections) {
                    for (const question of section.questions) {
                        if (question.rand_group) {
                            // set a flag to indicate that this question shouldn't reappear via branching logic
                            question.noToggle = true;
                            // categorise questions by rand_group
                            if (!(question.rand_group in randomGroups)) {
                                randomGroups[question.rand_group] = [];
                                randomGroups[question.rand_group].push(question.id);
                            }
                            else {
                                randomGroups[question.rand_group].push(question.id);
                            }
                        }
                    }
                }
                // from each rand_group, select a random item to show
                const showThese = [];
                for (const key in randomGroups) {
                    if (randomGroups.hasOwnProperty(key)) {
                        // select a random value from each array and add it to the "showThese array"
                        showThese.push(randomGroups[key][Math.floor(Math.random() * randomGroups[key].length)]);
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
                        }
                        else if (question.noToggle) {
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
                    timestamp: moment__WEBPACK_IMPORTED_MODULE_6__().format(),
                    milliseconds: moment__WEBPACK_IMPORTED_MODULE_6__().valueOf(),
                    page: 'survey',
                    event: 'entry',
                    module_index: this.module_index,
                });
            });
        });
    }
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
        }
        else {
            // save an exit log
            this.surveyDataService.logPageVisitToServer({
                timestamp: moment__WEBPACK_IMPORTED_MODULE_6__().format(),
                milliseconds: moment__WEBPACK_IMPORTED_MODULE_6__().valueOf(),
                page: 'survey',
                event: 'exit',
                module_index: this.module_index,
            });
            // nav back to the home screen
            this.navController.navigateRoot('/');
        }
    }
    /**
     * Sets up any questions that need initialisation before display
     * e.g. sets date/time objects to current date/time, set default values for sliders, etc.
     */
    setupQuestionVariables(uuid) {
        // for all relevant questions add an empty response variable
        for (const section of this.survey.sections) {
            for (const question of section.questions) {
                // for all question types that can be responded to, set default values
                question.response = '';
                question.model = '';
                question.hideError = true;
                question.hideSwitch = true;
                // for datetime questions, default to the current date/time
                if (question.type === 'datetime') {
                    // placeholder for dates
                    question.model = moment__WEBPACK_IMPORTED_MODULE_6__().format();
                    // for audio/video questions, sanitize the URLs to make them safe/work in html5 tags ### Not sanitizing at themoment
                }
                else if (question.type === 'media' &&
                    (question.subtype === 'audio' || question.subtype === 'video')) {
                    // @ts-ignore
                    question.src = this.domSanitizer.bypassSecurityTrustResourceUrl(question.src);
                    if (question.subtype === 'video') {
                        // @ts-ignore
                        question.thumb = this.domSanitizer.bypassSecurityTrustResourceUrl(question.thumb);
                    }
                    // for external embedded content, sanitize the URLs to make them safe/work in html5 tags ### Since when is there an exteral type?
                }
                else if (question.type === 'external') {
                    question.src = question.src + '?uuid=' + uuid;
                    // @ts-ignore
                    question.src = this.domSanitizer.bypassSecurityTrustResourceUrl(question.src);
                    // for slider questions, set the default value to be halfway between min and max
                }
                else if (question.type === 'slider') {
                    // get min and max
                    const min = question.min;
                    const max = question.max;
                    // set the default value of the slider to the middle value
                    const model = min + (max - min) / 2;
                    question.model = model;
                    // a starting value must also be set for the slider to work properly
                    question.value = model;
                    // for checkbox items, the response is set to an empty array
                }
                else if (question.type === 'multi') {
                    // set up checked tracking for checkbox questions types
                    const tempOptions = [];
                    for (const option of question.options) {
                        tempOptions.push({
                            text: option,
                            checked: false,
                        });
                    }
                    question.optionsChecked = tempOptions;
                    // counterbalance the choices if necessary
                    if (question.shuffle) {
                        question.optionsChecked = this.shuffle(question.optionsChecked);
                    }
                    // set the empty response to an array for checkbox questions
                    if (!question.radio) {
                        question.response = [];
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
    setAnswer(question) {
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
    changeCheckStatus(option, question) {
        // get question responses and split
        let responses = [];
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
        }
        else {
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
    openExternalFile(url) {
        this.iab.create(url, '_system');
    }
    toggleDynamicQuestions(question) {
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
                    if (q.type === 'multi' || q.type === 'yesno') {
                        // determine whether to hide/show the element
                        const hideIf = q.hide_if;
                        const valueEquals = hideValue === q.response;
                        if (valueEquals === hideIf) {
                            q.hideSwitch = false;
                        }
                        else {
                            q.hideSwitch = true;
                        }
                    }
                    else if (q.type === 'slider' &&
                        typeof hideValue === 'string' &&
                        q.response) {
                        const direction = hideValue.substring(0, 1);
                        const cutoff = parseInt(hideValue.substring(1, hideValue.length), 10);
                        const lessThan = direction === '<';
                        if (lessThan) {
                            if (q.response <= cutoff) {
                                q.hideSwitch = true;
                            }
                            else {
                                q.hideSwitch = false;
                            }
                        }
                        else {
                            if (q.response >= cutoff) {
                                q.hideSwitch = true;
                            }
                            else {
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
    submit() {
        let errorCount = 0;
        for (const question of this.questions) {
            if (question.required === true &&
                (question.response === '' || question.response === undefined) &&
                question.hideSwitch === true) {
                question.hideError = false;
                errorCount++;
            }
            else {
                question.hideError = true;
            }
        }
        if (errorCount === 0) {
            // if user on last page and there are no errors, fine to submit
            if (this.current_section === this.num_sections) {
                // add the alert time to the response
                this.tasks[this.task_index].alert_time = moment__WEBPACK_IMPORTED_MODULE_6__(this.tasks[this.task_index].time).format();
                // get a timestamp of submission time in both readable and ms format
                const response_time = moment__WEBPACK_IMPORTED_MODULE_6__().format();
                this.tasks[this.task_index].response_time = response_time;
                const response_time_ms = moment__WEBPACK_IMPORTED_MODULE_6__().valueOf();
                this.tasks[this.task_index].response_time_ms = response_time_ms;
                // indicate that the current task is completed
                this.tasks[this.task_index].completed = true;
                // add all the responses to an object in the task to be sent to server
                const responses = {};
                for (const section of this.survey.sections) {
                    for (const question of section.questions) {
                        responses[question.id] = question.response;
                    }
                }
                this.tasks[this.task_index].responses = responses;
                // attempt to post surveyResponse to server
                this.surveyDataService.sendSurveyDataToServer({
                    module_index: this.module_index,
                    module_name: this.module_name,
                    responses,
                    response_time,
                    response_time_in_ms: response_time_ms,
                    alert_time: this.tasks[this.task_index].alert_time || '',
                });
                // write tasks back to storage
                this.storage.set('study-tasks', this.tasks).then(() => {
                    // save an exit log
                    this.surveyDataService.logPageVisitToServer({
                        timestamp: moment__WEBPACK_IMPORTED_MODULE_6__().format(),
                        milliseconds: moment__WEBPACK_IMPORTED_MODULE_6__().valueOf(),
                        page: 'survey',
                        event: 'submit',
                        module_index: this.module_index,
                    });
                    this.navController.navigateRoot('/');
                });
            }
            else {
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
        }
        else {
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
    showToast(message, position) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message,
                position,
                keyboardClose: true,
                color: 'danger',
                buttons: [
                    {
                        text: 'Dismiss',
                        role: 'cancel',
                        handler: () => { },
                    },
                ],
            });
            toast.present();
        });
    }
    /**
     * Randomly shuffle an array
     * https://stackoverflow.com/a/2450976/1293256
     *
     * @param array The array to shuffle
     * @return      The first item in the shuffled array
     */
    shuffle(array) {
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
};
SurveyPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute },
    { type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_9__.Storage },
    { type: _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_2__.StatusBar },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.DomSanitizer },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.NavController },
    { type: src_app_services_study_task_study_tasks_service__WEBPACK_IMPORTED_MODULE_3__.StudyTasksService },
    { type: _services_survey_data_survey_data_service__WEBPACK_IMPORTED_MODULE_4__.SurveyDataService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.ToastController },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.NgZone },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__.InAppBrowser }
];
SurveyPage.propDecorators = {
    content: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonContent, { static: false },] }]
};
SurveyPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Component)({
        selector: 'app-survey',
        template: _survey_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_survey_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], SurveyPage);



/***/ }),

/***/ 2749:
/*!**********************************************************!*\
  !*** ./src/app/pages/survey/survey.page.scss?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "#section-title {\n  font-weight: 50;\n}\n\n.videoPlayer {\n  width: 100%;\n}\n\n.showError:before {\n  content: \" *\";\n}\n\n.showError {\n  font-weight: bold;\n  color: #F44336 !important;\n}\n\n.scroll-content {\n  padding-bottom: 0 !important;\n  margin-right: 5px !important;\n}\n\np {\n  white-space: pre-wrap;\n}\n\n.slider-label-left {\n  width: 50%;\n  text-align: left;\n  float: left;\n  font-size: small;\n  margin-top: -5px;\n  color: gray;\n}\n\n.slider-label-right {\n  width: 50%;\n  text-align: right;\n  float: left;\n  font-size: small;\n  margin-top: -5px;\n  color: gray;\n}\n\n.external-container {\n  min-height: 100px;\n  background: url('spinner.gif');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 50px 50px;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n}\n\n.light-blue-card {\n  --ion-item-background: var(--ion-color-tertiary);\n  --padding-start: 0px;\n  --inner-padding-start: 0px;\n  --margin-start: 50px;\n  border-radius: 10px !important;\n  overflow: hidden;\n  font-weight: 400;\n  font-size: 18px;\n  line-height: 24px;\n  text-align: center;\n  color: var(--ion-color-tertiary-contrast);\n}\n\n.light-blue-card-page {\n  --ion-item-background:var(--ion-color-tertiary);\n  --margin: 5px;\n  margin: 5px;\n  border-radius: 10px !important;\n  overflow: hidden;\n  font-weight: 400;\n  font-size: 18px;\n  line-height: 24px;\n  text-align: center;\n  color: var(--ion-color-tertiary-contrast);\n}\n\n.light-blue-card-bg {\n  --ion-item-background:var(--ion-color-tertiary);\n  width: 100%;\n  border-radius: 10px !important;\n  overflow: hidden;\n  font-weight: 400;\n  font-size: 18px;\n  line-height: 24px;\n  text-align: center;\n  color: var(--ion-color-tertiary-contrast);\n}\n\n.light-blue-card-div-instruction {\n  margin-top: 10px;\n  margin-bottom: 10px;\n  width: 100%;\n  --inner-padding-start: 5px;\n}\n\n.light-blue-card-div {\n  margin-top: 10px;\n  margin-bottom: 10px;\n  width: 100%;\n}\n\n.light-blue-card-grid {\n  width: 100%;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.mult-select {\n  width: 100%;\n  text-align: left !important;\n}\n\n.ion-radio-select-style {\n  width: 100%;\n  max-width: 100%;\n  background: var(--ion-color-tertiary-contrast);\n}\n\n.ion-row-items {\n  text-align: start !important;\n  width: 100%;\n}\n\n.radio-button-style {\n  --ion-item-background: var(--ion-input-color);\n  margin-top: 10px !important;\n  margin-bottom: 10px !important;\n  border-radius: 50px !important;\n}\n\n.item-radio-checked {\n  --ion-item-background:var(--ion-color-tertiary-shade);\n  color: var(--ion-input-color);\n}\n\nion-input {\n  --background: var(--ion-input-color);\n  padding-left: 10px !important;\n  padding-right: 10px !important;\n  border-radius: 10px !important;\n}\n\nsubmit-next-button {\n  --border-radius: 15px;\n  width: 80%;\n}\n\nbottom-button {\n  align-items: center;\n  width: 80%;\n}\n\nion-button {\n  --border-radius: 15px;\n}\n\nion-segment {\n  --background: transparent !important;\n}\n\nion-segment-button {\n  --indicator-box-shadow: transparent !important;\n  border-radius: 15px !important;\n  padding: 0px;\n  margin-right: 10px;\n  margin-left: 10px;\n  --background:var(--ion-segment-button);\n  --color:var(--ion-color-tertiary-contrast);\n  --background-checked: linear-gradient(to right, var(--ion-color-tertiary-shade), var(--ion-color-tertiary-shade))!important;\n  --color-checked: var(--ion-segment-button);\n  --indicator-color: transparent !important;\n  /* this solution */\n}\n\nion-datetime {\n  --color:var(--ion-color-tertiary-contrast);\n  --placeholder-color: transparent !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1cnZleS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxlQUFBO0FBQ0o7O0FBRUE7RUFDSSxXQUFBO0FBQ0o7O0FBRUE7RUFDSSxhQUFBO0FBQ0o7O0FBRUE7RUFDSSxpQkFBQTtFQUNBLHlCQUFBO0FBQ0o7O0FBRUE7RUFDSSw0QkFBQTtFQUNBLDRCQUFBO0FBQ0o7O0FBRUE7RUFDSSxxQkFBQTtBQUNKOztBQUVBO0VBQ0ksVUFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0FBQ0o7O0FBRUE7RUFDSSxVQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUFDSjs7QUFFQTtFQUNJLGlCQUFBO0VBQ0EsOEJBQUE7RUFDQSw0QkFBQTtFQUNBLDJCQUFBO0VBQ0EsMEJBQUE7RUFDQSxjQUFBO0VBQ0EsaUNBQUE7QUFDSjs7QUFHQTtFQUNFLGdEQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQkFBQTtFQUNBLG9CQUFBO0VBQ0EsOEJBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5Q0FBQTtBQUFGOztBQUdBO0VBQ0UsK0NBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLDhCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUNBQUE7QUFBRjs7QUFHQTtFQUNFLCtDQUFBO0VBQ0EsV0FBQTtFQUNBLDhCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUNBQUE7QUFBRjs7QUFHQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsMEJBQUE7QUFBRjs7QUFHQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBQUY7O0FBR0E7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQUFGOztBQUdBO0VBQ0UsV0FBQTtFQUNBLDJCQUFBO0FBQUY7O0FBR0E7RUFDRSxXQUFBO0VBQ0EsZUFBQTtFQUNBLDhDQUFBO0FBQUY7O0FBS0E7RUFDRSw0QkFBQTtFQUNBLFdBQUE7QUFGRjs7QUFLQTtFQUNFLDZDQUFBO0VBQ0EsMkJBQUE7RUFDQSw4QkFBQTtFQUNBLDhCQUFBO0FBRkY7O0FBSUE7RUFDRSxxREFBQTtFQUNBLDZCQUFBO0FBREY7O0FBSUE7RUFDRSxvQ0FBQTtFQUNBLDZCQUFBO0VBQ0EsOEJBQUE7RUFDQSw4QkFBQTtBQURGOztBQUlBO0VBQ0UscUJBQUE7RUFDQSxVQUFBO0FBREY7O0FBSUE7RUFDRSxtQkFBQTtFQUNBLFVBQUE7QUFERjs7QUFHQTtFQUNFLHFCQUFBO0FBQUY7O0FBRUE7RUFDRSxvQ0FBQTtBQUNGOztBQUNBO0VBQ0UsOENBQUE7RUFDQSw4QkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0NBQUE7RUFDQSwwQ0FBQTtFQUNBLDJIQUFBO0VBQ0EsMENBQUE7RUFDQSx5Q0FBQTtFQUE0QyxrQkFBQTtBQUc5Qzs7QUFDQTtFQUNFLDBDQUFBO0VBQ0EsMkNBQUE7QUFFRiIsImZpbGUiOiJzdXJ2ZXkucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI3NlY3Rpb24tdGl0bGUge1xuICAgIGZvbnQtd2VpZ2h0OiA1MDtcbn1cblxuLnZpZGVvUGxheWVyIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxuLnNob3dFcnJvcjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IFwiICpcIjtcbn1cblxuLnNob3dFcnJvciB7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgY29sb3I6ICNGNDQzMzYgIWltcG9ydGFudDtcbn1cblxuLnNjcm9sbC1jb250ZW50IHtcbiAgICBwYWRkaW5nLWJvdHRvbTogMCAhaW1wb3J0YW50O1xuICAgIG1hcmdpbi1yaWdodDogNXB4ICFpbXBvcnRhbnQ7XG59XG5cbnAge1xuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbn1cblxuLnNsaWRlci1sYWJlbC1sZWZ0IHtcbiAgICB3aWR0aDogNTAlO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgZm9udC1zaXplOiBzbWFsbDtcbiAgICBtYXJnaW4tdG9wOiAtNXB4O1xuICAgIGNvbG9yOiBncmF5O1xufVxuXG4uc2xpZGVyLWxhYmVsLXJpZ2h0IHtcbiAgICB3aWR0aDogNTAlO1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIGZvbnQtc2l6ZTogc21hbGw7XG4gICAgbWFyZ2luLXRvcDogLTVweDtcbiAgICBjb2xvcjogZ3JheTtcbn1cblxuLmV4dGVybmFsLWNvbnRhaW5lciB7XG4gICAgbWluLWhlaWdodDogMTAwcHg7XG4gICAgYmFja2dyb3VuZDogdXJsKFwiLi4vLi4vLi4vYXNzZXRzL2ltZ3Mvc3Bpbm5lci5naWZcIik7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1zaXplOiA1MHB4IDUwcHg7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xufVxuXG5cbi5saWdodC1ibHVlLWNhcmR7XG4gIC0taW9uLWl0ZW0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5KTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwcHg7XG4gIC0taW5uZXItcGFkZGluZy1zdGFydDogMHB4O1xuICAtLW1hcmdpbi1zdGFydDogNTBweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweCAhaW1wb3J0YW50O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDE4cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QpO1xufVxuXG4ubGlnaHQtYmx1ZS1jYXJkLXBhZ2V7XG4gIC0taW9uLWl0ZW0tYmFja2dyb3VuZDp2YXIoLS1pb24tY29sb3ItdGVydGlhcnkpO1xuICAtLW1hcmdpbjogNXB4O1xuICBtYXJnaW46IDVweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweCAhaW1wb3J0YW50O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDE4cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QpO1xufVxuXG4ubGlnaHQtYmx1ZS1jYXJkLWJne1xuICAtLWlvbi1pdGVtLWJhY2tncm91bmQ6dmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5KTtcbiAgd2lkdGg6MTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMTBweCAhaW1wb3J0YW50O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDE4cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3QpO1xufVxuXG4ubGlnaHQtYmx1ZS1jYXJkLWRpdi1pbnN0cnVjdGlvbntcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgd2lkdGg6MTAwJTtcbiAgLS1pbm5lci1wYWRkaW5nLXN0YXJ0OiA1cHg7XG59XG5cbi5saWdodC1ibHVlLWNhcmQtZGl2e1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICB3aWR0aDoxMDAlO1xufVxuXG4ubGlnaHQtYmx1ZS1jYXJkLWdyaWR7XG4gIHdpZHRoOjEwMCU7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi5tdWx0LXNlbGVjdHtcbiAgd2lkdGg6MTAwJTtcbiAgdGV4dC1hbGlnbjpsZWZ0ICFpbXBvcnRhbnQ7XG59XG5cbi5pb24tcmFkaW8tc2VsZWN0LXN0eWxle1xuICB3aWR0aDoxMDAlO1xuICBtYXgtd2lkdGg6MTAwJTtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0KTtcbn1cblxuXG5cbi5pb24tcm93LWl0ZW1ze1xuICB0ZXh0LWFsaWduOiBzdGFydCAhaW1wb3J0YW50O1xuICB3aWR0aDoxMDAlO1xufVxuXG4ucmFkaW8tYnV0dG9uLXN0eWxle1xuICAtLWlvbi1pdGVtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1pbnB1dC1jb2xvcik7XG4gIG1hcmdpbi10b3A6IDEwcHggIWltcG9ydGFudDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweCAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiA1MHB4ICFpbXBvcnRhbnQ7XG59XG4uaXRlbS1yYWRpby1jaGVja2Vke1xuICAtLWlvbi1pdGVtLWJhY2tncm91bmQ6dmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5LXNoYWRlKTtcbiAgY29sb3I6IHZhcigtLWlvbi1pbnB1dC1jb2xvcik7XG59XG5cbmlvbi1pbnB1dHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24taW5wdXQtY29sb3IpO1xuICBwYWRkaW5nLWxlZnQ6IDEwcHggIWltcG9ydGFudDtcbiAgcGFkZGluZy1yaWdodDogMTBweCAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiAxMHB4ICFpbXBvcnRhbnQ7XG59XG5cbnN1Ym1pdC1uZXh0LWJ1dHRvbiB7XG4gIC0tYm9yZGVyLXJhZGl1czogMTVweDtcbiAgd2lkdGg6IDgwJTtcbn1cblxuYm90dG9tLWJ1dHRvbntcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDgwJTtcbn1cbmlvbi1idXR0b24ge1xuICAtLWJvcmRlci1yYWRpdXM6IDE1cHg7XG59XG5pb24tc2VnbWVudCB7XG4gIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbn1cbmlvbi1zZWdtZW50LWJ1dHRvbntcbiAgLS1pbmRpY2F0b3ItYm94LXNoYWRvdzogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogMTVweCAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAwcHg7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIC0tYmFja2dyb3VuZDp2YXIoLS1pb24tc2VnbWVudC1idXR0b24pO1xuICAtLWNvbG9yOnZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdCk7XG4gIC0tYmFja2dyb3VuZC1jaGVja2VkOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZSksIHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeS1zaGFkZSkpIWltcG9ydGFudDtcbiAgLS1jb2xvci1jaGVja2VkOiB2YXIoLS1pb24tc2VnbWVudC1idXR0b24pO1xuICAtLWluZGljYXRvci1jb2xvciA6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7IC8qIHRoaXMgc29sdXRpb24gKi9cblxufVxuXG5pb24tZGF0ZXRpbWUge1xuICAtLWNvbG9yOnZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdCk7XG4gIC0tcGxhY2Vob2xkZXItY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG59XG4iXX0= */";

/***/ }),

/***/ 3803:
/*!**********************************************************!*\
  !*** ./src/app/pages/survey/survey.page.html?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <!--<ion-back-button (click)=\"back()\"></ion-back-button>-->\n\n\n      <ion-item class=\"light-blue-card\" lines=\"none\">\n        <ion-button size=\"medium\" color=\"secondary\" (click)=\"back()\">\n          <ion-icon slot=\"icon-only\" name=\"arrow-back\">Home</ion-icon>\n        </ion-button>\n        <span class=\"text\">{{this.current_section_name}}</span>\n      </ion-item>\n\n    </ion-buttons>\n\n\n    <ion-item slot=\"end\" class=\"light-blue-card-page\" lines=\"none\">\n      <span class=\"text\">{{this.current_section}}/{{this.num_sections}}</span>\n    </ion-item>\n\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"scroll-content\">\n\n  <div id=\"survey-list\">\n\n    <!--survey content-->\n    <ion-item lines=\"none\" *ngFor=\"let question of survey.sections[this.current_section-1].questions\"\n      class=\"ion-text-wrap survey-item\" [hidden]=\"!question.hideSwitch\">\n      <br>\n      <!-- instruction type -->\n      <div item-content *ngIf=\"question.type === 'instruction'\" class=\"light-blue-card-div-instruction\">\n        <ion-item class=\"light-blue-card-bg\" lines=\"none\">\n          <ion-grid>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <span class=\"text\">\n                  <p [class.showError]=\"!question.hideError\" [innerHTML]=\"question.text\"></p>\n                </span>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n      </div>\n\n\n      <!-- slider type -->\n      <div style=\"width:100%\" item-content *ngIf=\"question.type === 'slider'\" class=\"light-blue-card-div-instruction\">\n        <ion-item class=\"light-blue-card-bg\" lines=\"none\">\n          <ion-grid>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <span class=\"text\">\n                  <p [class.showError]=\"!question.hideError\" [innerHTML]=\"question.text\"></p>\n\n                </span>\n              </ion-col>\n            </ion-row>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <ion-range [min]=\"question.min\" [max]=\"question.max\" [(ngModel)]=\"question.model\" [pin]=\"true\"\n                  [value]=\"question.model\" (ionChange)=\"setAnswer(question)\" color=\"secondary\" style=\"font-size:small;\">\n                </ion-range>\n              </ion-col>\n            </ion-row>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <span class=\"text\">\n                  <p class=\"slider-label-left\">{{question.hint_left}}</p>\n                  <p class=\"slider-label-right\">{{question.hint_right}}</p>\n                </span>\n              </ion-col>\n            </ion-row>\n\n          </ion-grid>\n        </ion-item>\n      </div>\n\n      <!-- video/audio/image type -->\n      <div style=\"width:100%;padding-right:6px !important;\" item-content *ngIf=\"question.type === 'media'\"\n        class=\"light-blue-card-div\">\n\n        <ion-item class=\"light-blue-card-bg\" lines=\"none\">\n          <ion-grid>\n\n            <!-- video -->\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <video *ngIf=\"question.subtype === 'video'\" controls=\"controls\" controlsList=\"nodownload\"\n                  [poster]=\"question.thumb\" preload=\"metadata\" webkit-playsinline=\"webkit-playsinline\"\n                  class=\"videoPlayer\">\n                  <source [src]=\"question.src\" />\n                </video>\n              </ion-col>\n            </ion-row>\n\n            <!-- audio -->\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <audio *ngIf=\"question.subtype === 'audio'\" style=\"width:100%;\" controls=\"controls\" preload=\"metadata\"\n                  controlsList=\"nodownload\">\n                  <source [src]=\"question.src\" type=\"audio/mpeg\">\n                </audio>\n              </ion-col>\n            </ion-row>\n\n            <!-- image -->\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <ion-img *ngIf=\"question.subtype === 'image'\" style=\"width:100%;\" [src]=\"question.src\"></ion-img>\n              </ion-col>\n            </ion-row>\n\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <p *ngIf=\"question.text\" [class.showError]=\"!question.hideError\" [innerHTML]=\"question.text\"></p>\n                <br>\n              </ion-col>\n            </ion-row>\n\n          </ion-grid>\n        </ion-item>\n      </div>\n\n      <!-- text input -->\n      <div item-content *ngIf=\"question.type === 'text'\" class=\"light-blue-card-grid\">\n        <ion-item class=\"light-blue-card-bg\" lines=\"none\">\n          <ion-grid>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <p [class.showError]=\"!question.hideError\" [innerHTML]=\"question.text\"></p>\n              </ion-col>\n            </ion-row>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <ion-input *ngIf=\"question.subtype === 'short'\" [(ngModel)]=\"question.model\"\n                  (ionBlur)=\"setAnswer(question)\" style=\"font-size:small;\" type=\"text\" autocomplete=\"on\"\n                  autocorrect=\"on\" placeholder=\"Enter response...\">\n                </ion-input>\n              </ion-col>\n            </ion-row>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <ion-input *ngIf=\"question.subtype === 'numeric'\" [(ngModel)]=\"question.model\"\n                  (ionBlur)=\"setAnswer(question)\" style=\"font-size:small;\" placeholder=\"Enter number...\" type=\"number\"\n                  pattern=\"\\d*\"></ion-input>\n              </ion-col>\n            </ion-row>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <ion-textarea *ngIf=\"question.subtype === 'long'\" [(ngModel)]=\"question.model\"\n                  (ionBlur)=\"setAnswer(question)\" style=\"font-size:small;\" placeholder=\"Enter response...\"\n                  auto-grow=\"true\" rows=\"3\"></ion-textarea>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n\n\n\n\n        </ion-item>\n      </div>\n\n      <!-- multi -->\n      <div item-content *ngIf=\"question.type === 'multi'\" class=\"light-blue-card-div\">\n        <ion-item class=\"light-blue-card-bg\" lines=\"none\">\n          <ion-grid>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <span class=\"text\">\n                  <p [class.showError]=\"!question.hideError\" [innerHTML]=\"question.text\"></p>\n                </span>\n              </ion-col>\n            </ion-row>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <div *ngIf=\"question.modal == true\">\n                  <ion-item class=\"mult-select\" lines=\"none\">\n                    <ion-label style=\"display:none;\"></ion-label>\n                    <ion-select *ngIf=\"question.radio\" class=\"ion-radio-select-style\" (ionChange)=\"setAnswer(question)\"\n                      [(ngModel)]=\"question.model\" placeholder=\"Select...\" okText=\"Select\" cancelText=\"Dismiss\">\n                      <ion-select-option color=\"secondary\" *ngFor=\"let option of question.options\">{{option.text}}\n                      </ion-select-option>\n                    </ion-select>\n                    <ion-select *ngIf=\"!question.radio\" style=\"width:100%;max-width:100%;\"\n                      (ionChange)=\"setAnswer(question)\" [(ngModel)]=\"question.model\" placeholder=\"Select...\"\n                      okText=\"Select\" cancelText=\"Dismiss\" multiple>\n                      <ion-select-option color=\"secondary\" *ngFor=\"let option of question.options\">{{option.text}}\n                      </ion-select-option>\n                    </ion-select>\n                  </ion-item>\n                </div>\n              </ion-col>\n            </ion-row>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <div *ngIf=\"question.modal == false\">\n                  <ion-radio-group (ionChange)=\"setAnswer(question)\" [(ngModel)]=\"question.model\"\n                    *ngIf=\"question.radio == true\">\n                    <ion-item *ngFor=\"let option of question.options\" class=\"radio-button-style\" lines=\"none\">\n                      <ion-label style=\"font-size:small;\" class=\"ion-text-wrap\">{{option.text}}</ion-label>\n                      <ion-radio slot=\"start\" color=\"secondary\" value=\"{{option.text}}\"></ion-radio>\n                    </ion-item>\n                  </ion-radio-group>\n\n                  <div radio-group *ngIf=\"question.radio == false\">\n                    <ion-item *ngFor=\"let option of question.options\" lines=\"none\">\n                      <ion-label style=\"font-size:small;\" class=\"ion-text-wrap\">{{option.text}}</ion-label>\n                      <ion-checkbox color=\"secondary\" (click)=\"changeCheckStatus(option, question)\"\n                        [(ngModel)]=\"option.checked\"></ion-checkbox>\n                    </ion-item>\n                  </div>\n                </div>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n        <br>\n      </div>\n\n      <!-- datetimepicker -->\n      <div item-content *ngIf=\"question.type === 'datetime'\" class=\"light-blue-card-div\">\n        <ion-item class=\"light-blue-card-bg\" lines=\"none\">\n          <ion-grid>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <span class=\"text\">\n                  <p [class.showError]=\"!question.hideError\" [innerHTML]=\"question.text\"></p>\n                </span>\n              </ion-col>\n            </ion-row>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <ion-datetime *ngIf=\"question.subtype === 'datetime'\" style=\"font-size:small;\"\n                  [(ngModel)]=\"question.model\" displayFormat=\"DDDD MMM DD, YYYY, hh:mm a\"\n                  (ionChange)=\"setAnswer(question)\"></ion-datetime>\n              </ion-col>\n            </ion-row>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <ion-datetime  *ngIf=\"question.subtype === 'date'\" style=\"font-size:small;\" [(ngModel)]=\"question.model\"\n                  displayFormat=\"DDDD MMM DD, YYYY\" (ionChange)=\"setAnswer(question)\"></ion-datetime>\n              </ion-col>\n            </ion-row>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <ion-datetime  *ngIf=\"question.subtype === 'time'\" style=\"font-size:small;\" [(ngModel)]=\"question.model\"\n                  displayFormat=\"hh:mm a\" (ionChange)=\"setAnswer(question)\"></ion-datetime>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n      </div>\n\n      <!-- boolean toggle -->\n      <div style=\"width:100%;\" item-content *ngIf=\"question.type === 'yesno'\" class=\"light-blue-card-div\">\n        <ion-item class=\"light-blue-card-bg\" lines=\"none\">\n          <ion-grid>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <span class=\"text\">\n                  <p [class.showError]=\"!question.hideError\" [innerHTML]=\"question.text\"></p>\n                </span>\n              </ion-col>\n            </ion-row>\n            <ion-row class=\"ion-row-items\">\n              <ion-col>\n                <ion-segment [(ngModel)]=\"question.model\" (ionChange)=\"setAnswer(question)\">\n                  <ion-segment-button value=\"{{question.yes_text}}\" layout=\"icon-start\">\n                    <ion-label>{{question.yes_text}}</ion-label>\n                    <ion-icon name=\"checkmark\"></ion-icon>\n                  </ion-segment-button>\n                  <ion-segment-button value=\"{{question.no_text}}\" layout=\"icon-start\">\n                    <ion-label>{{question.no_text}}</ion-label>\n                    <ion-icon name=\"close\"></ion-icon>\n                  </ion-segment-button>\n                </ion-segment>\n                <br>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-item>\n      </div>\n\n      <!-- external -->\n      <div class=\"external-container\" style=\"width:100%;\" item-content *ngIf=\"question.type === 'external'\">\n        <iframe frameborder=\"0\" scrolling=\"no\" [src]=\"question.src\"></iframe>\n      </div>\n\n      <!-- file -->\n      <div style=\"width:100%;\" item-content *ngIf=\"question.type === 'file'\">\n        <p [class.showError]=\"!question.hideError\" [innerHTML]=\"question.text\"></p>\n\n        <ion-button color=\"primary\" fill=\"outline\" (click)=\"openExternalFile(question.src)\">\n          <ion-icon slot=\"start\" name=\"attach\"></ion-icon>\n          {{question.file_name}}\n        </ion-button>\n        <br><br>\n      </div>\n\n    </ion-item>\n    <!--submit button-->\n    <ion-item-group>\n      <!-- <ion-item-divider color=\"secondary\"></ion-item-divider> -->\n      <ion-item lines=\"none\" class=\"ion-text-center\" class=\"bottom-button\">\n        <ion-label>\n          <ion-button fill=\"outline\" class=\"submit-next-button\" (click)=\"submit()\" size=\"large\" expand=\"block\"\n            color=\"secondary\">{{this.submit_text}}</ion-button>\n        </ion-label>\n      </ion-item>\n    </ion-item-group>\n  </div>\n\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_survey_survey_module_ts.js.map