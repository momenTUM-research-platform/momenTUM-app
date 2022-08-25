"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_progress_progress_module_ts"],{

/***/ 402:
/*!***********************************************************!*\
  !*** ./src/app/pages/progress/progress-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressPageRoutingModule": () => (/* binding */ ProgressPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _progress_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress.page */ 774);




const routes = [
    {
        path: '',
        component: _progress_page__WEBPACK_IMPORTED_MODULE_0__.ProgressPage
    }
];
let ProgressPageRoutingModule = class ProgressPageRoutingModule {
};
ProgressPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ProgressPageRoutingModule);



/***/ }),

/***/ 5668:
/*!***************************************************!*\
  !*** ./src/app/pages/progress/progress.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressPageModule": () => (/* binding */ ProgressPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _progress_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress-routing.module */ 402);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 7514);
/* harmony import */ var _progress_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./progress.page */ 774);








let ProgressPageModule = class ProgressPageModule {
};
ProgressPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(),
            _progress_routing_module__WEBPACK_IMPORTED_MODULE_0__.ProgressPageRoutingModule
        ],
        declarations: [_progress_page__WEBPACK_IMPORTED_MODULE_1__.ProgressPage]
    })
], ProgressPageModule);



/***/ }),

/***/ 774:
/*!*************************************************!*\
  !*** ./src/app/pages/progress/progress.page.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressPage": () => (/* binding */ ProgressPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _progress_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress.page.html?ngResource */ 6659);
/* harmony import */ var _progress_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./progress.page.scss?ngResource */ 4521);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ 190);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ 6908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services_survey_data_survey_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/survey-data/survey-data.service */ 7965);
/* harmony import */ var _services_study_task_study_tasks_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/study-task/study-tasks.service */ 5443);
/* harmony import */ var _translate_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../translate-config.service */ 3855);









let ProgressPage = class ProgressPage {
    constructor(storage, studyTasksService, surveyDataService, translateConfigService) {
        this.storage = storage;
        this.studyTasksService = studyTasksService;
        this.surveyDataService = surveyDataService;
        this.translateConfigService = translateConfigService;
        // array to store the graphs
        this.graphs = new Array();
        // array to store the history
        this.history = new Array();
        // flag for study enrolment
        this.enrolledInStudy = false;
        // graph options
        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                xAxes: [
                    {
                        ticks: {
                            fontSize: 6,
                        },
                        barThickness: 20,
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            fontSize: 8,
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };
        // graph colours
        this.chartColors = [
            {
                backgroundColor: 'rgba(4,153,139,0.6)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)',
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            },
        ];
        // get the default language of the device
        this.selectedLanguage =
            this.translateConfigService.getDefaultLanguage() || 'en';
    }
    ionViewWillEnter() {
        this.graphs = [];
        this.history = [];
        this.enrolledInStudy = false;
        Promise.all([
            this.storage.get('current-study'),
            this.storage.get('enrolment-date'),
        ]).then((values) => {
            const studyObject = values[0];
            const enrolmentDate = values[1];
            if (studyObject !== null) {
                this.studyJSON = JSON.parse(studyObject);
                this.enrolledInStudy = true;
                // calculate the study day
                this.studyDay = this.diffDays(new Date(enrolmentDate), new Date());
                // log the user visiting this tab
                this.surveyDataService.logPageVisitToServer({
                    timestamp: moment__WEBPACK_IMPORTED_MODULE_3__().format(),
                    milliseconds: moment__WEBPACK_IMPORTED_MODULE_3__().valueOf(),
                    page: 'my-progress',
                    event: 'entry',
                    module_index: -1,
                });
                // check if any graphs are available and add history items
                this.studyTasksService.getAllTasks().then((tasks) => {
                    // get all entries for history
                    for (const task of tasks) {
                        if (task.completed && task.response_time) {
                            const historyItem = {
                                task_name: task.name.replace(/<\/?[^>]+(>|$)/g, ''),
                                moment_time: moment__WEBPACK_IMPORTED_MODULE_3__(task.response_time).fromNow(),
                                response_time: new Date(task.response_time),
                            };
                            this.history.unshift(historyItem);
                        }
                    }
                    // sort the history array by completion time
                    this.history.sort((x, y) => x.resonse_time - y.response_time);
                    // get all graphs
                    for (const module of this.studyJSON.modules) {
                        const graph = module.graph;
                        const study_name = module.name;
                        const graph_header = module.name;
                        // if the module is to display a graph
                        if (graph.display) {
                            // get the variable to graph
                            const variableToGraph = graph.variable;
                            // store the labels and data for this module
                            const task_labels = [];
                            const task_data = [];
                            const graph_title = graph.title;
                            const graph_blurb = graph.blurb;
                            const graph_type = graph.type;
                            const graph_maxpoints = -graph.max_points;
                            // loop through each study_task
                            for (const task of tasks) {
                                // check if the task is this task
                                if (task.name === study_name) {
                                    if (task.completed && task.responses) {
                                        // get the variable we are to graph
                                        for (const k in task.responses) {
                                            if (k === variableToGraph) {
                                                // format the response time
                                                const response_time = moment__WEBPACK_IMPORTED_MODULE_3__(task.response_time).format('MMM Do, h:mma');
                                                task_labels.push(response_time);
                                                task_data.push(task.responses[k]);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            // create a new graph object
                            const graphObj = {
                                data: [
                                    {
                                        data: task_data.slice(graph_maxpoints),
                                        label: graph_title,
                                    },
                                ],
                                labels: task_labels.slice(graph_maxpoints),
                                options: this.chartOptions,
                                colors: this.chartColors,
                                legend: graph_title,
                                type: graph_type,
                                blurb: graph_blurb,
                                header: graph_header,
                            };
                            // if the task had any data to graph, push it
                            if (task_data.length > 0) {
                                this.graphs.push(graphObj);
                            }
                        }
                    }
                });
            }
        });
    }
    diffDays(d1, d2) {
        let ndays = 0;
        const tv1 = d1.valueOf(); // msec since 1970
        const tv2 = d2.valueOf();
        ndays = (tv2 - tv1) / 1000 / 86400;
        ndays = Math.round(ndays - 0.5);
        return ndays;
    }
    ionViewWillLeave() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            if (this.enrolledInStudy) {
                this.surveyDataService.logPageVisitToServer({
                    timestamp: moment__WEBPACK_IMPORTED_MODULE_3__().format(),
                    milliseconds: moment__WEBPACK_IMPORTED_MODULE_3__().valueOf(),
                    page: 'my-progress',
                    event: 'exit',
                    module_index: -1,
                });
            }
        });
    }
};
ProgressPage.ctorParameters = () => [
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__.Storage },
    { type: _services_study_task_study_tasks_service__WEBPACK_IMPORTED_MODULE_5__.StudyTasksService },
    { type: _services_survey_data_survey_data_service__WEBPACK_IMPORTED_MODULE_4__.SurveyDataService },
    { type: _translate_config_service__WEBPACK_IMPORTED_MODULE_6__.TranslateConfigService }
];
ProgressPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-progress',
        template: _progress_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_progress_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ProgressPage);



/***/ }),

/***/ 4521:
/*!**************************************************************!*\
  !*** ./src/app/pages/progress/progress.page.scss?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "#stats-icon {\n  font-size: 3em;\n}\n\n.graph-style {\n  margin-left: 10px;\n  margin-right: 10px;\n  padding-right: 20px;\n}\n\n.blurb-style {\n  font-size: 13px;\n  color: #000000;\n}\n\np {\n  white-space: pre-wrap;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyZXNzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNDLGNBQUE7QUFDRDs7QUFFQTtFQUNDLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQUNEOztBQUVBO0VBQ0MsZUFBQTtFQUNBLGNBQUE7QUFDRDs7QUFFQTtFQUNDLHFCQUFBO0FBQ0QiLCJmaWxlIjoicHJvZ3Jlc3MucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI3N0YXRzLWljb24ge1xuXHRmb250LXNpemU6IDNlbTtcbn1cblxuLmdyYXBoLXN0eWxlIHtcblx0bWFyZ2luLWxlZnQ6IDEwcHg7XG5cdG1hcmdpbi1yaWdodDogMTBweDtcblx0cGFkZGluZy1yaWdodDogMjBweDtcbn1cblxuLmJsdXJiLXN0eWxlIHtcblx0Zm9udC1zaXplOiAxM3B4O1xuXHRjb2xvcjogIzAwMDAwMDtcbn1cblxucCB7XG5cdHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbn1cbiJdfQ== */";

/***/ }),

/***/ 6659:
/*!**************************************************************!*\
  !*** ./src/app/pages/progress/progress.page.html?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>\n\n      <span class=\"header-title-thin\">momenTUM</span>\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-item lines=\"none\" *ngIf=\"!(graphs.length > 0)\">\n      <ion-label class=\"ion-text-wrap ion-text-center\">\n          <br><br>\n          <ion-icon id=\"stats-icon\" color=\"secondary\" name=\"stats-chart\"></ion-icon><br><br> {{ 'placeholder_my-progress' | translate:params }}<br><br>\n      </ion-label>\n  </ion-item>\n\n  <div *ngFor=\"let graph of graphs\">\n      <ion-item-divider color=\"light\">{{graph.header}}</ion-item-divider>\n      <canvas class=\"graph-style\" baseChart [datasets]=\"graph.data\" [labels]=\"graph.labels\" [options]=\"graph.options\" [legend]=\"graph.legend\" [type]=\"graph.type\">\n    </canvas>\n      <ion-item lines=\"full\">\n          <ion-label class=\"ion-text-wrap\">\n              <p class=\"blurb-style\" [innerHTML]=\"graph.blurb\"></p>\n          </ion-label>\n      </ion-item>\n  </div>\n\n  <div *ngIf=\"enrolledInStudy\">\n      <ion-item-divider color=\"light\" *ngIf=\"history.length > 0\">\n          <ion-label>\n              Recently Completed\n          </ion-label>\n      </ion-item-divider>\n\n\n      <ion-item *ngFor=\"let record of history\">\n          <ion-label>\n              {{record.task_name}}\n          </ion-label>\n          <ion-label slot=\"end\" color=\"medium\" class=\"ion-text-right\">\n              {{record.moment_time}}\n          </ion-label>\n      </ion-item>\n  </div>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_progress_progress_module_ts.js.map