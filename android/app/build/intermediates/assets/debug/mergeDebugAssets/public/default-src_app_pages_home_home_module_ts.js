"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_pages_home_home_module_ts"],{

/***/ 6610:
/*!***************************************************!*\
  !*** ./src/app/pages/home/home-routing.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageRoutingModule": () => (/* binding */ HomePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 7121);




const routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage
    }
];
let HomePageRoutingModule = class HomePageRoutingModule {
};
HomePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], HomePageRoutingModule);



/***/ }),

/***/ 7994:
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageModule": () => (/* binding */ HomePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-routing.module */ 6610);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 7514);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page */ 7121);








let HomePageModule = class HomePageModule {
};
HomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(),
            _home_routing_module__WEBPACK_IMPORTED_MODULE_0__.HomePageRoutingModule
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_1__.HomePage]
    })
], HomePageModule);



/***/ }),

/***/ 7121:
/*!*****************************************!*\
  !*** ./src/app/pages/home/home.page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePage": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _home_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page.html?ngResource */ 2565);
/* harmony import */ var _home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page.scss?ngResource */ 2260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic/storage-angular */ 190);
/* harmony import */ var _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/status-bar/ngx */ 1714);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/barcode-scanner/ngx */ 5684);
/* harmony import */ var _services_survey_data_survey_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/survey-data/survey-data.service */ 7965);
/* harmony import */ var _services_study_task_study_tasks_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/study-task/study-tasks.service */ 5443);
/* harmony import */ var _services_survey_cache_survey_cache_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/survey-cache/survey-cache.service */ 9357);
/* harmony import */ var _services_uuid_uuid_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/uuid/uuid.service */ 6611);
/* harmony import */ var _services_loading_loading_service_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/loading/loading-service.service */ 9911);
/* harmony import */ var _services_notification_notifications_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/notification/notifications.service */ 7054);
/* harmony import */ var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic-native/local-notifications/ngx */ 7265);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! moment */ 6908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _translate_config_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../translate-config.service */ 3855);
/* harmony import */ var _shared_change_theme__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../shared/change-theme */ 8716);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngx-translate/core */ 7514);





















let HomePage = class HomePage {
    constructor(barcodeScanner, surveyDataService, notificationsService, surveyCacheService, studyTasksService, uuidService, router, platform, statusBar, loadingService, alertController, localNotifications, storage, translateConfigService, translate) {
        this.barcodeScanner = barcodeScanner;
        this.surveyDataService = surveyDataService;
        this.notificationsService = notificationsService;
        this.surveyCacheService = surveyCacheService;
        this.studyTasksService = studyTasksService;
        this.uuidService = uuidService;
        this.router = router;
        this.platform = platform;
        this.statusBar = statusBar;
        this.loadingService = loadingService;
        this.alertController = alertController;
        this.localNotifications = localNotifications;
        this.storage = storage;
        this.translateConfigService = translateConfigService;
        this.translate = translate;
        // flag to display enrol options
        this.hideEnrolOptions = true;
        // track whether the user is currently enrolled in a study
        this.isEnrolledInStudy = false;
        // stores the details of the study
        this.study = null;
        // stores the list of tasks to be completed by the user
        this.task_list = [];
        // dark mode
        this.darkMode = false;
        //translations loaded from the appropriate language file
        // defaults are provided but will be overridden if language file
        // is loaded successfully
        this.translations = {
            btn_cancel: 'Cancel',
            btn_dismiss: 'Dismiss',
            btn_enrol: 'Enrol',
            'btn_enter-url': 'Enter URL',
            'btn_study-id': 'Study ID',
            'error_loading-qr-code': "We couldn't load your study. Please check your internet connection and ensure you are scanning the correct code.",
            'error_loading-study': "We couldn't load your study. Please check your internet connection and ensure you are entering the correct URL.",
            heading_error: 'Oops...',
            label_loading: 'Loading...',
            msg_caching: 'Downloading media for offline use - please wait!',
            msg_camera: 'Camera permission is required to scan QR codes. You can allow this permission in Settings.',
        };
        this.selectedLanguage =
            this.translateConfigService.getDefaultLanguage() || 'en';
    }
    toggleTheme() {
        if (_shared_change_theme__WEBPACK_IMPORTED_MODULE_13__.ChangeTheme.getTheme() === 'light') {
            // @ts-ignore
            document.querySelector('ion-icon').setAttribute('name', 'sunny');
            _shared_change_theme__WEBPACK_IMPORTED_MODULE_13__.ChangeTheme.setTheme(true);
            this.darkMode = true;
        }
        else {
            // @ts-ignore
            document.querySelector('ion-icon').setAttribute('name', 'moon');
            _shared_change_theme__WEBPACK_IMPORTED_MODULE_13__.ChangeTheme.setTheme(false);
            this.darkMode = false;
        }
    }
    ngOnInit() {
        // set statusBar to be visible on Android
        this.statusBar.styleLightContent();
        this.statusBar.backgroundColorByHexString('#0F2042');
        // Theme set to the stored preferred type
        _shared_change_theme__WEBPACK_IMPORTED_MODULE_13__.ChangeTheme.initializeTheme();
        // need to subscribe to this event in order
        // to ensure that the page will refresh every
        // time it is navigated to because ionViewWillEnter()
        // is not called when navigating here from other pages
        this.router.events.subscribe((event) => {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_14__.NavigationStart && event.url === '/' && !this.loadingService.isLoading) {
                this.ionViewWillEnter();
            }
        });
        // trigger this to run every time the app is resumed from the background
        this.resumeEvent = this.platform.resume.subscribe(() => {
            if (this.router.url === '/tabs/tab1') {
                if (!this.loadingService.isLoading) {
                    this.ionViewWillEnter();
                }
            }
        });
    }
    ionViewWillEnter() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            // check if dark mode
            this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            // load the correct translations for dynamic labels/messages
            const labels = [
                'btn_cancel',
                'btn_dismiss',
                'btn_enrol',
                'btn_enter-url',
                'btn_study-id',
                'error_loading-qr-code',
                'error_loading-study',
                'heading_error',
                'label_loading',
                'msg_caching',
                'msg_camera',
            ];
            // @ts-ignore
            this.translate.get(labels).subscribe((res) => {
                this.translations = res;
            });
            this.localNotifications.requestPermission();
            this.loadingService.isCaching = false;
            this.loadingService.present(this.translations.label_loading);
            this.hideEnrolOptions = true;
            this.isEnrolledInStudy = false;
            // check if user is currently enrolled in study
            try {
                yield this.storage.get('uuid');
            }
            catch (_a) {
                console.log('Storage did not exist, creating');
                yield this.storage.create();
            }
            Promise.all([this.storage.get('current-study')]).then((values) => {
                const studyObject = values[0];
                if (studyObject !== null) {
                    // convert the study to a JSON object
                    this.study = JSON.parse(studyObject);
                    // log the user visiting this tab
                    this.surveyDataService.logPageVisitToServer({
                        timestamp: moment__WEBPACK_IMPORTED_MODULE_11__().format(),
                        milliseconds: moment__WEBPACK_IMPORTED_MODULE_11__().valueOf(),
                        page: 'home',
                        event: 'entry',
                        module_index: -1,
                    });
                    // attempt to upload any pending logs and survey data
                    this.surveyDataService.uploadPendingData('pending-log');
                    this.surveyDataService.uploadPendingData('pending-data');
                    // set up next round of notifications
                    this.notificationsService.setNext30Notifications();
                    // load the study tasks
                    this.loadStudyDetails();
                }
                else {
                    this.hideEnrolOptions = false;
                    if (this.loadingService) {
                        // Added this condition
                        this.loadingService.dismiss();
                    }
                }
            });
            // on first run, generate a UUID for the user
            // and set the notifications-enabled to true
            this.storage.get('uuid-set').then((uuidSet) => {
                if (!uuidSet) {
                    // set a UUID
                    const uuid = this.uuidService.generateUUID('');
                    this.storage.set('uuid', uuid);
                    // set a flag that UUID was set
                    this.storage.set('uuid-set', true);
                    // set a flag that notifications are enabled
                    this.storage.set('notifications-enabled', true);
                }
            });
        });
    }
    /**
     * Lifecycle event called when the current page is about to become paused/closed
     */
    ionViewWillLeave() {
        if (this.isEnrolledInStudy) {
            // log the user exiting this tab
            this.surveyDataService.logPageVisitToServer({
                timestamp: moment__WEBPACK_IMPORTED_MODULE_11__().format(),
                milliseconds: moment__WEBPACK_IMPORTED_MODULE_11__().valueOf(),
                page: 'home',
                event: 'exit',
                module_index: -1,
            });
            // attempt to upload any pending logs and survey data
            this.surveyDataService.uploadPendingData('pending-log');
            this.surveyDataService.uploadPendingData('pending-data');
        }
    }
    /**
     * Attempt to download a study from the URL scanned/entered by a user
     *
     * @param url The URL to attempt to download a study from
     * @param isQRCode
     */
    attemptToDownloadStudy(url, isQRCode) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            // show loading bar
            this.loadingService.isCaching = false;
            this.loadingService.present(this.translations.label_loading);
            try {
                const result = yield this.surveyDataService.getRemoteData(url);
                // check if the data received from the URL contains JSON properties/modules
                // in order to determine if it's a schema study before continuing
                // @ts-ignore
                const study = JSON.parse(result.data);
                // checks if the returned text is parseable as JSON, and whether it contains
                // some of the key fields used by schema so it can determine whether it is
                // actually a schema study URL
                const validStudy = study.properties !== undefined && // @ts-ignore
                    study.modules !== undefined && // @ts-ignore
                    study.properties.study_id !== undefined;
                if (validStudy) {
                    this.enrolInStudy(study);
                }
            }
            catch (e) {
                // @ts-expect-error
                console.log('JSON Invalid format: exception: ' + e.message, e);
                if (this.loadingService) {
                    // Added this condition
                    this.loadingService.dismiss();
                }
                this.displayEnrolError(isQRCode);
            }
        });
    }
    /**
     * Uses the barcode scanner to enrol in a study
     */
    scanBarcode() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            this.barcodeScanner
                .scan()
                .then((barcodeData) => {
                if (!barcodeData.cancelled) {
                    this.attemptToDownloadStudy(barcodeData.text, true);
                }
            })
                .catch((err) => {
                if (!this.loadingService.isLoading) {
                    // Added this condition
                    this.loadingService.dismiss();
                }
                this.displayBarcodeError();
            });
        });
    }
    /**
     * Handles the alert dialog to enrol via URL
     */
    enterURL() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: this.translations['btn_enter-url'],
                cssClass: 'alertStyle',
                inputs: [
                    {
                        name: 'url',
                        type: 'url',
                        placeholder: 'e.g. https://bit.ly/2Q4O9jI',
                        value: 'https://',
                    },
                ],
                buttons: [
                    {
                        text: this.translations.btn_cancel,
                        role: 'cancel',
                        cssClass: 'secondary',
                    },
                    {
                        text: this.translations.btn_enrol,
                        handler: (response) => {
                            this.attemptToDownloadStudy(response.url, false);
                        },
                    },
                ],
            });
            yield alert.present();
        });
    }
    /**
     *
     * Handles the alert dialog to enrol via Study ID
     */
    enterStudyID() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: this.translations['btn_study-id'],
                cssClass: 'alertStyle',
                inputs: [
                    {
                        name: 'id',
                        type: 'text',
                        placeholder: 'e.g. STUDY01',
                    },
                ],
                buttons: [
                    {
                        text: this.translations.btn_cancel,
                        role: 'cancel',
                        cssClass: 'secondary',
                    },
                    {
                        text: this.translations.btn_enrol,
                        handler: (response) => {
                            // create URL for study
                            const url = 'https://tuspl22-momentum.srv.mwn.de/api/surveys/' + response.id;
                            this.attemptToDownloadStudy(url, false);
                        },
                    },
                ],
            });
            yield alert.present();
        });
    }
    /**
     * Enrols the user in the study, sets up notifications and tasks
     *
     * @param study
     */
    enrolInStudy(study) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            this.isEnrolledInStudy = true;
            this.hideEnrolOptions = true;
            // convert received data to JSON object
            this.study = study;
            // set the enrolled date
            this.storage.set('enrolment-date', new Date());
            // set an enrolled flag and save the JSON for the current study
            this.storage
                .set('current-study', JSON.stringify(this.study))
                .then(() => (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
                var _a;
                // log the enrolment event
                this.surveyDataService.logPageVisitToServer({
                    timestamp: moment__WEBPACK_IMPORTED_MODULE_11__().format(),
                    milliseconds: moment__WEBPACK_IMPORTED_MODULE_11__().valueOf(),
                    page: 'home',
                    event: 'enrol',
                    module_index: -1,
                });
                // cache all media files if this study has set this property to true
                if ((_a = this.study) === null || _a === void 0 ? void 0 : _a.properties.cache) {
                    this.loadingService.dismiss().then(() => {
                        this.loadingService.isCaching = true;
                        this.loadingService.present(this.translations.msg_caching);
                    });
                    this.surveyCacheService.cacheAllMedia(this.study);
                }
                // setup the study task objects
                yield this.studyTasksService.generateStudyTasks(study);
                // setup the notifications
                this.notificationsService.setNext30Notifications();
                this.loadStudyDetails();
                const studyTasks = yield this.storage.get('study-tasks');
            }));
        });
    }
    /**
     * Loads the details of the current study, including overdue tasks
     */
    loadStudyDetails() {
        this.studyTasksService.getTaskDisplayList().then((tasks) => {
            this.task_list = tasks;
            for (const task of this.task_list) {
                task.moment = moment__WEBPACK_IMPORTED_MODULE_11__(task.locale).fromNow();
            }
            // show the study tasks
            this.isEnrolledInStudy = true;
            this.hideEnrolOptions = true;
            // reverse the order of the tasks list to show oldest first
            this.sortTasksList();
            // hide loading controller if not caching
            if (!this.loadingService.isCaching) {
                setTimeout(() => {
                    if (this.loadingService) {
                        // Added this condition
                        this.loadingService.dismiss();
                    }
                }, 1000);
            }
        });
    }
    /**
     * Displays an alert to indicate that something went wrong during study enrolment
     *
     * @param isQRCode Denotes whether the error was caused via QR code enrolment
     */
    displayEnrolError(isQRCode) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            const msg = isQRCode
                ? "We couldn't load your study. Please check your internet connection and ensure you are scanning the correct code."
                : "We couldn't load your study. Please check your internet connection and ensure you are entering the correct URL or ID.";
            const alert = yield this.alertController.create({
                header: 'Oops...',
                message: msg,
                cssClass: 'alertStyle',
                buttons: ['Dismiss'],
            });
            yield alert.present();
        });
    }
    /**
     * Displays a message when camera permission is not allowed
     */
    displayBarcodeError() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Permission Required',
                cssClass: 'alertStyle',
                message: this.translations.msg_camera,
                buttons: ['Dismiss'],
            });
            yield alert.present();
        });
    }
    /**
     * Reverses the list of tasks for sorting purposes
     */
    sortTasksList() {
        this.task_list.reverse();
    }
    /**
     * Refreshes the list of tasks
     */
    doRefresh(refresher) {
        // What i
        if (!this.loadingService.isLoading) {
            this.ionViewWillEnter();
        }
        setTimeout(() => {
            refresher.target.complete();
        }, 250);
    }
};
HomePage.ctorParameters = () => [
    { type: _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_3__.BarcodeScanner },
    { type: _services_survey_data_survey_data_service__WEBPACK_IMPORTED_MODULE_4__.SurveyDataService },
    { type: _services_notification_notifications_service__WEBPACK_IMPORTED_MODULE_9__.NotificationsService },
    { type: _services_survey_cache_survey_cache_service__WEBPACK_IMPORTED_MODULE_6__.SurveyCacheService },
    { type: _services_study_task_study_tasks_service__WEBPACK_IMPORTED_MODULE_5__.StudyTasksService },
    { type: _services_uuid_uuid_service__WEBPACK_IMPORTED_MODULE_7__.UuidService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_14__.Router },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.Platform },
    { type: _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_2__.StatusBar },
    { type: _services_loading_loading_service_service__WEBPACK_IMPORTED_MODULE_8__.LoadingService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.AlertController },
    { type: _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_10__.LocalNotifications },
    { type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_17__.Storage },
    { type: _translate_config_service__WEBPACK_IMPORTED_MODULE_12__.TranslateConfigService },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslateService }
];
HomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_19__.Component)({
        selector: 'app-home',
        template: _home_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_home_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], HomePage);



/***/ }),

/***/ 9911:
/*!*************************************************************!*\
  !*** ./src/app/services/loading/loading-service.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoadingService": () => (/* binding */ LoadingService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ 3819);



let LoadingService = class LoadingService {
    constructor(loadingController) {
        this.loadingController = loadingController;
        this.isLoading = false;
        this.isCaching = false;
    }
    /**
     * Displays the loading dialog
     *
     * @param msg The message to display in the loading dialog
     */
    present(msg) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            this.isLoading = true;
            return yield this.loadingController
                .create({
                message: msg,
                spinner: 'crescent',
                duration: 7000,
            })
                .then((a) => {
                a.present().then(() => {
                    if (!this.isLoading) {
                        a.dismiss().then(() => console.log('abort presenting'));
                    }
                });
            });
        });
    }
    /**
     * Dismisses the loading dialog
     */
    dismiss() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            this.isLoading = false; // Seems unnecessary as dismiss() only runs if isLoading is false
            this.isCaching = false;
            const loader = yield this.loadingController.getTop();
            if (loader) {
                // Added this condition
                return loader.dismiss();
            }
            else {
                return;
            }
        });
    }
};
LoadingService.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.LoadingController }
];
LoadingService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)({
        providedIn: 'root',
    })
], LoadingService);



/***/ }),

/***/ 7054:
/*!****************************************************************!*\
  !*** ./src/app/services/notification/notifications.service.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationsService": () => (/* binding */ NotificationsService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage-angular */ 190);
/* harmony import */ var _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic-native/local-notifications/ngx */ 7265);




let NotificationsService = class NotificationsService {
    constructor(localNotifications, storage) {
        this.localNotifications = localNotifications;
        this.storage = storage;
    }
    /**
     * Schedules a notification, taking parameters from a task
     *
     * @param task The task that the notification is for
     */
    scheduleDummyNotification() {
        this.localNotifications.schedule({
            title: 'Hello',
            text: 'World',
            foreground: true,
            trigger: { at: new Date(new Date().getTime() + 10000) },
            smallIcon: 'res://notification_icon',
            icon: 'res//notification_icon',
            data: { task_index: 0 },
            launch: true,
            wakeup: true,
            priority: 2,
        });
    }
    /**
     * Schedules a notification, takoing parameters from a task
     *
     * @param task The task that the notification is for
     */
    scheduleNotification(task) {
        this.localNotifications.schedule({
            id: task.task_id,
            title: task.alert_title,
            text: task.alert_message,
            foreground: true,
            trigger: { at: new Date(Date.parse(task.time)) },
            smallIcon: 'res://notification_icon',
            icon: 'res//notification_icon',
            data: {
                task_index: task.index,
                task_id: task.task_id,
                task_time: task.time,
            },
            launch: true,
            wakeup: true,
            priority: 2,
        });
    }
    /**
     * Cancels all notifications that have been set
     */
    cancelAllNotifications() {
        this.localNotifications.cancelAll();
    }
    /**
     * Sets the next 30 notifications based on the next 30 tasks
     */
    setNext30Notifications() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            yield this.localNotifications.cancelAll();
            const notificationsEnabled = yield this.storage.get('notifications-enabled');
            if (notificationsEnabled) {
                const tasks = yield this.storage.get('study-tasks');
                if (tasks !== null) {
                    let alertCount = 0;
                    for (const task of tasks) {
                        const alertTime = new Date(Date.parse(task.time));
                        if (alertTime > new Date()) {
                            if (this.checkTaskIsUnlocked(task, tasks)) {
                                this.scheduleNotification(task);
                                alertCount++;
                            }
                        }
                        // only set 30 alerts into the future
                        if (alertCount === 30) {
                            break;
                        }
                    }
                }
            }
            /*this.localNotifications.cancelAll().then(() => {
              this.storage.get('notifications-enabled').then(notificationsEnabled => {
                if (notificationsEnabled) {
                  this.storage.get('study-tasks').then((tasks) => {
                    if (tasks !== null) {
                      var alertCount = 0;
                      for (var i = 0; i < tasks.length; i++) {
                        var task = tasks[i];
                        var alertTime = new Date(Date.parse(task.time));
        
                        if (alertTime > new Date()) {
                          if (this.checkTaskIsUnlocked(task, tasks)) {
                            this.scheduleNotification(task);
                            alertCount++;
                          }
                        }
        
                        // only set 30 alerts into the future
                        if (alertCount === 30) break;
                      }
                    }
                  });
                }
              });
            });*/
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
        for (const t of study_tasks) {
            if (t.completed) {
                completedUUIDs.add(t.uuid);
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
NotificationsService.ctorParameters = () => [
    { type: _ionic_native_local_notifications_ngx__WEBPACK_IMPORTED_MODULE_0__.LocalNotifications },
    { type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_2__.Storage }
];
NotificationsService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({
        providedIn: 'root',
    })
], NotificationsService);



/***/ }),

/***/ 9357:
/*!***************************************************************!*\
  !*** ./src/app/services/survey-cache/survey-cache.service.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SurveyCacheService": () => (/* binding */ SurveyCacheService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic-native/file-transfer/ngx */ 1059);
/* harmony import */ var _loading_loading_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../loading/loading-service.service */ 9911);
/* harmony import */ var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/file/ngx */ 2358);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage-angular */ 190);






let SurveyCacheService = class SurveyCacheService {
    constructor(fileTransfer, file, storage, loadingService) {
        this.fileTransfer = fileTransfer;
        this.file = file;
        this.storage = storage;
        this.loadingService = loadingService;
        this.win = window;
        this.mediaToCache = {};
        this.videoThumbnailsToCache = {};
        this.localMediaURLs = {};
        this.localThumbnailURLs = {};
        this.mediaCount = 0;
        this.mediaDownloadedCount = 0;
    }
    /**
     * Downloads a remote file and converts it to a local URL
     *
     * @param url Remote URL to a media file
     */
    downloadFile(url) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            try {
                const transfer = this.fileTransfer.create();
                // get the fileName from the URL
                const urlSplit = url.split('/');
                const fileName = urlSplit[urlSplit.length - 1];
                console.log('fileName: ' + fileName);
                const file = yield transfer.download(url, this.file.dataDirectory + fileName, true);
                console.log('file: ' + file);
                return file.toURL();
            }
            catch (error) {
                console.log('error: ' + error);
                return '';
            }
        });
    }
    /**
     * Gets all of the remote URLs from the media elements in this study
     *
     * @param study The study protocol
     */
    getMediaURLs(study) {
        // get banner url
        // @ts-ignore
        this.mediaToCache.banner = study.properties.banner_url;
        // get urls from media elements
        for (const module of study.modules) {
            for (const section of module.sections) {
                const mediaQuestions = section.questions.filter((question) => question.type === 'media');
                for (const question of mediaQuestions) {
                    this.mediaToCache[question.id] = question.src;
                }
            }
        }
        // set mediaCount to be number of media items
        this.mediaCount = Object.keys(this.mediaToCache).length;
    }
    /**
     * Gets all of the media URLs from the study protocol and downloads the files
     *
     * @param study The study protocol
     */
    cacheAllMedia(study) {
        this.mediaCount = 0;
        this.mediaDownloadedCount = 0;
        // map media question ids to their urls
        this.getMediaURLs(study);
        this.downloadAllMedia();
    }
    /**
     * Downloads all of the media items from the remote URLs
     */
    downloadAllMedia() {
        // download all media items
        const keys = Object.keys(this.mediaToCache);
        for (const key of keys) {
            this.downloadFile(this.mediaToCache[key]).then((entryURL) => {
                this.localMediaURLs[key] =
                    this.win.Ionic.WebView.convertFileSrc(entryURL);
                this.mediaDownloadedCount = this.mediaDownloadedCount + 1;
                this.checkIfFinished();
            });
        }
    }
    /**
     * Checks if all of the media has been downloaded, if so update the protocol
     */
    checkIfFinished() {
        if (this.mediaDownloadedCount === this.mediaCount) {
            this.updateMediaURLsInStudy();
        }
    }
    /**
     * Replaces the remote URLs for media items with the local URLs
     */
    updateMediaURLsInStudy() {
        this.storage.get('current-study').then((studyString) => {
            try {
                const studyObject = JSON.parse(studyString);
                // update the banner url first
                // @ts-ignore
                studyObject.properties.banner_url = this.localMediaURLs.banner;
                // update the other media items to the corresponding local URL
                // get urls from media elements
                for (const module of studyObject.modules) {
                    for (const section of module) {
                        for (const question of section) {
                            if (question.id in this.localMediaURLs) {
                                question.src = this.localMediaURLs[question.id];
                            }
                            if (question.subtype === 'video') {
                                // @ts-ignore
                                question.thumb = this.localMediaURLs.banner;
                            }
                        }
                    }
                }
                // update the study protocol in storage
                this.storage.set('current-study', JSON.stringify(studyObject));
            }
            catch (e) {
                console.log('error: ' + e);
            }
            // dismiss the loading spinner
            if (this.loadingService) {
                // Added this condition
                this.loadingService.dismiss();
            }
        });
    }
};
SurveyCacheService.ctorParameters = () => [
    { type: _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_0__.FileTransfer },
    { type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_2__.File },
    { type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_4__.Storage },
    { type: _loading_loading_service_service__WEBPACK_IMPORTED_MODULE_1__.LoadingService }
];
SurveyCacheService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root',
    })
], SurveyCacheService);



/***/ }),

/***/ 8716:
/*!****************************************!*\
  !*** ./src/app/shared/change-theme.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangeTheme": () => (/* binding */ ChangeTheme)
/* harmony export */ });
class ChangeTheme {
    static initializeTheme() {
        this.setTheme(localStorage.preferenceTheme === 'dark');
    }
    static setTheme(darkColor) {
        this.preferenceColor = darkColor ? 'dark' : 'light';
        document.body.setAttribute('color-theme', this.preferenceColor);
        localStorage.preferenceTheme = this.preferenceColor;
    }
    static getTheme() {
        return this.preferenceColor;
    }
}


/***/ }),

/***/ 2260:
/*!******************************************************!*\
  !*** ./src/app/pages/home/home.page.scss?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = "ion-content {\n  --offset-top: 1px;\n}\n\n.page-home .moment {\n  font-size: small;\n  color: gray;\n}\n\n.page-home .rotate-90 {\n  display: inline-block;\n  transform: rotate(90deg);\n}\n\n.secondary {\n  color: #005293;\n}\n\n.welcome-msg {\n  text-align: center;\n  width: 80%;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.enrolment-img-dark {\n  height: 40%;\n  width: 60%;\n  margin-top: 10%;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.enrolment-img-light {\n  height: 40%;\n  width: 60%;\n  margin-top: 10%;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.enrolment-text {\n  text-align: center;\n  width: 80%;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 5%;\n  font-weight: bold;\n}\n\nion-button {\n  --border-radius: 15px;\n  width: 80%;\n}\n\nion-footer {\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\n\nion-label {\n  margin-bottom: 3px;\n  margin-top: 3px;\n}\n\n.banner-img {\n  border-radius: 30px !important;\n  overflow: hidden;\n  width: 101%;\n  height: 101%;\n  margin-left: -5px;\n  padding: 20px;\n}\n\nion-img::part(image) {\n  border-radius: 20px;\n}\n\n.title-label {\n  margin: 3px;\n  font-size: 17px;\n  font-weight: bold;\n}\n\nion-item {\n  --ion-item-background: transparent;\n}\n\nion-list {\n  --ion-item-background: transparent;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0MsaUJBQUE7QUFDRDs7QUFHQztFQUNDLGdCQUFBO0VBQ0EsV0FBQTtBQUFGOztBQUdDO0VBQ0MscUJBQUE7RUFDQSx3QkFBQTtBQURGOztBQUtBO0VBQ0MsY0FBQTtBQUZEOztBQUtBO0VBQ0Msa0JBQUE7RUFDQSxVQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUZEOztBQUtBO0VBQ0MsV0FBQTtFQUNDLFVBQUE7RUFDRCxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUZEOztBQUtBO0VBQ0MsV0FBQTtFQUNDLFVBQUE7RUFDRCxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUZEOztBQUtBO0VBQ0Msa0JBQUE7RUFDQSxVQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7QUFGRDs7QUFJQTtFQUNFLHFCQUFBO0VBQ0EsVUFBQTtBQURGOztBQUlBO0VBQ0UsaUJBQUE7RUFDQSxvQkFBQTtBQURGOztBQUlBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0FBREY7O0FBSUE7RUFDRSw4QkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7QUFERjs7QUFJQTtFQUNFLG1CQUFBO0FBREY7O0FBSUE7RUFDRSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBREY7O0FBS0E7RUFDRSxrQ0FBQTtBQUZGOztBQUlBO0VBQ0Usa0NBQUE7QUFERiIsImZpbGUiOiJob21lLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jb250ZW50IHtcblx0LS1vZmZzZXQtdG9wOiAxcHg7XG59XG5cbi5wYWdlLWhvbWUge1xuXHQubW9tZW50IHtcblx0XHRmb250LXNpemU6IHNtYWxsO1xuXHRcdGNvbG9yOiBncmF5O1xuXHR9XG5cblx0LnJvdGF0ZS05MCB7XG5cdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRcdHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcblx0fVxufVxuXG4uc2Vjb25kYXJ5IHtcblx0Y29sb3I6ICMwMDUyOTM7XG59XG5cbi53ZWxjb21lLW1zZyB7XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0d2lkdGg6IDgwJTtcblx0bWFyZ2luLWxlZnQ6IGF1dG87XG5cdG1hcmdpbi1yaWdodDogYXV0bztcbn1cblxuLmVucm9sbWVudC1pbWctZGFyayB7XG5cdGhlaWdodDogNDAlO1xuICB3aWR0aDogNjAlO1xuXHRtYXJnaW4tdG9wOiAxMCU7XG5cdG1hcmdpbi1sZWZ0OiBhdXRvO1xuXHRtYXJnaW4tcmlnaHQ6IGF1dG87XG59XG5cbi5lbnJvbG1lbnQtaW1nLWxpZ2h0IHtcblx0aGVpZ2h0OiA0MCU7XG4gIHdpZHRoOiA2MCU7XG5cdG1hcmdpbi10b3A6IDEwJTtcblx0bWFyZ2luLWxlZnQ6IGF1dG87XG5cdG1hcmdpbi1yaWdodDogYXV0bztcbn1cblxuLmVucm9sbWVudC10ZXh0IHtcblx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHR3aWR0aDogODAlO1xuXHRtYXJnaW4tbGVmdDogYXV0bztcblx0bWFyZ2luLXJpZ2h0OiBhdXRvO1xuXHRtYXJnaW4tYm90dG9tOiA1JTtcblx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5pb24tYnV0dG9uIHtcbiAgLS1ib3JkZXItcmFkaXVzOiAxNXB4O1xuICB3aWR0aDogODAlO1xufVxuXG5pb24tZm9vdGVye1xuICBwYWRkaW5nLXRvcDogMTBweDtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG59XG5cbmlvbi1sYWJlbCB7XG4gIG1hcmdpbi1ib3R0b206IDNweDtcbiAgbWFyZ2luLXRvcDogM3B4O1xufVxuXG4uYmFubmVyLWltZyB7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHggIWltcG9ydGFudDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2lkdGg6MTAxJTtcbiAgaGVpZ2h0OjEwMSU7XG4gIG1hcmdpbi1sZWZ0Oi01cHg7XG4gIHBhZGRpbmc6MjBweDtcbn1cblxuaW9uLWltZzo6cGFydChpbWFnZSkge1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xufVxuXG4udGl0bGUtbGFiZWx7XG4gIG1hcmdpbjogM3B4O1xuICBmb250LXNpemU6IDE3cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG5cbmlvbi1pdGVtIHtcbiAgLS1pb24taXRlbS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cbmlvbi1saXN0IHtcbiAgLS1pb24taXRlbS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cbiJdfQ== */";

/***/ }),

/***/ 2565:
/*!******************************************************!*\
  !*** ./src/app/pages/home/home.page.html?ngResource ***!
  \******************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>\n\n      <span class=\"header-title-thin\">momenTUM</span>\n    </ion-title>\n    <ion-buttons slot=\"secondary\">\n      <ion-button (click)=\"toggleTheme()\">\n        <ion-icon slot=\"icon-only\" name=\"sunny\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class=\"page-home ion-no-padding\" scroll=\"false\">\n  <ion-refresher [hidden]=\"!hideEnrolOptions\" slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content color=\"primary\" pullingIcon=\"arrow-dropdown\" refreshingSpinner=\"crescent\">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <!-- Displayed if user is not enrolled in a study -->\n  <ion-img src=\"assets/imgs/tum-light.png\" *ngIf=\"darkMode\" [hidden]=\"hideEnrolOptions\" class=\"enrolment-img-dark\">\n  </ion-img>\n  <ion-img src=\"assets/imgs/tum-icon.png\" *ngIf=\"!darkMode\" [hidden]=\"hideEnrolOptions\" class=\"enrolment-img-light\">\n  </ion-img>\n  <div [hidden]=\"hideEnrolOptions\" style=\"margin-top:5%\">\n    <h1 style=\"text-align:center;\">Let's get started</h1>\n    <p class=\"welcome-msg\">\n      Welcome to <span style=\"color:#0065BD;\">momenTUM</span> - a platform to participate in research surveys directly\n      from your smartphone.\n    </p>\n  </div>\n  <!-- Displays if user is enrolled in a study -->\n  <div [hidden]=\"!hideEnrolOptions\" id=\"study-list\">\n\n    <ion-img *ngIf=\"study !== null\" [hidden]=\"!hideEnrolOptions\" [src]=\"study.properties.banner_url\" class=\"banner-img\"></ion-img>\n\n    <div *ngFor=\"let task of task_list\" [hidden]=\"!hideEnrolOptions\">\n      <ion-item *ngIf=\"task.type !== 'header'\" detail lines=\"none\">\n        <ion-icon color=\"medium\" name=\"{{task.type}}\" slot=\"start\"></ion-icon>\n        <ion-label [routerLink]=\"task.type === 'alarm-outline' ? '/pvt/' + task.task_id : '/survey/' + task.task_id\" routerDirection=\"forward\" class=\"ion-text-wrap\">\n          <ion-text color=\"secondary\"><span color=\"secondary\" [innerHTML]=\"task.name\"></span></ion-text>\n          <br>\n          <span *ngIf=\"!task.sticky\" class=\"moment\">{{task.moment}}</span>\n        </ion-label>\n      </ion-item>\n\n      <ion-item *ngIf=\"task.type === 'header'\"  lines=\"none\">\n        <ion-label stacked class=\"title-label\">\n          {{task.label}}\n        </ion-label>\n      </ion-item>\n    </div>\n\n    <ion-item lines=\"none\" class=\"ion-text-center\" [hidden]=\"task_list.length\">\n      <ion-label *ngIf=\"study !== null\" class=\"ion-text-wrap\">\n        {{study.properties.empty_msg}}\n        <br><br>\n        <ion-icon style=\"font-size:3em;\" color=\"secondary\" name=\"partly-sunny\"></ion-icon>\n      </ion-label>\n    </ion-item>\n\n  </div>\n</ion-content>\n\n<ion-footer [hidden]=\"hideEnrolOptions\">\n\n  <ion-item class=\"ion-text-center\" (click)=\"scanBarcode()\" lines=\"none\">\n    <ion-label>\n      <ion-button expand=\"fill\" size=\"medium\" color=\"secondary\">Scan QR Code</ion-button>\n    </ion-label>\n  </ion-item>\n  <ion-item class=\"ion-text-center\" (click)=\"enterURL()\" lines=\"none\">\n    <ion-label>\n      <ion-button expand=\"fill\" size=\"medium\" color=\"secondary\">Enter URL</ion-button>\n    </ion-label>\n  </ion-item>\n  <ion-item class=\"ion-text-center\" (click)=\"enterStudyID()\" lines=\"none\">\n    <ion-label>\n      <ion-button expand=\"fill\" size=\"medium\" color=\"secondary\">Study ID</ion-button>\n    </ion-label>\n  </ion-item>\n</ion-footer>\n";

/***/ })

}]);
//# sourceMappingURL=default-src_app_pages_home_home_module_ts.js.map