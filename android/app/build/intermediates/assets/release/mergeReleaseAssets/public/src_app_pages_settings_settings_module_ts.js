"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_pages_settings_settings_module_ts"],{

/***/ 2760:
/*!***********************************************************!*\
  !*** ./src/app/pages/settings/settings-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsPageRoutingModule": () => (/* binding */ SettingsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var _settings_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings.page */ 1902);




const routes = [
    {
        path: '',
        component: _settings_page__WEBPACK_IMPORTED_MODULE_0__.SettingsPage
    }
];
let SettingsPageRoutingModule = class SettingsPageRoutingModule {
};
SettingsPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], SettingsPageRoutingModule);



/***/ }),

/***/ 7850:
/*!***************************************************!*\
  !*** ./src/app/pages/settings/settings.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsPageModule": () => (/* binding */ SettingsPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 587);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _settings_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings-routing.module */ 2760);
/* harmony import */ var _settings_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.page */ 1902);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 7514);








let SettingsPageModule = class SettingsPageModule {
};
SettingsPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule.forChild(),
            _settings_routing_module__WEBPACK_IMPORTED_MODULE_0__.SettingsPageRoutingModule
        ],
        declarations: [_settings_page__WEBPACK_IMPORTED_MODULE_1__.SettingsPage]
    })
], SettingsPageModule);



/***/ }),

/***/ 1902:
/*!*************************************************!*\
  !*** ./src/app/pages/settings/settings.page.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsPage": () => (/* binding */ SettingsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _settings_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings.page.html?ngResource */ 6364);
/* harmony import */ var _settings_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.page.scss?ngResource */ 297);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/storage-angular */ 190);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _services_notification_notifications_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/notification/notifications.service */ 7054);
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ 9048);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ 6908);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _translate_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../translate-config.service */ 3855);
/* harmony import */ var _services_survey_data_survey_data_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/survey-data/survey-data.service */ 7965);











let SettingsPage = class SettingsPage {
    constructor(storage, navController, alertController, iab, notificsationsService, translateConfigService, surveyDataService) {
        this.storage = storage;
        this.navController = navController;
        this.alertController = alertController;
        this.iab = iab;
        this.notificsationsService = notificsationsService;
        this.translateConfigService = translateConfigService;
        this.surveyDataService = surveyDataService;
        // flag to track whether the user is in a study
        this.isEnrolled = false;
        // flag to track whether notifications are enabled
        this.notificationsEnabled = true;
        // store a reference to the study object
        // empty template used prior to loading data
        this.study = {
            properties: {
                study_name: '',
                instructions: '',
                support_email: '',
                support_url: '',
                ethics: '',
                pls: '',
            },
        };
        // get the default language of the device
        this.selectedLanguage =
            this.translateConfigService.getDefaultLanguage() || 'en';
    }
    ionViewWillEnter() {
        this.isEnrolled = false;
        Promise.all([
            this.storage.get('current-study'),
            this.storage.get('uuid'),
            this.storage.get('notifications-enabled'),
        ]).then((values) => {
            // check if user is currently enrolled in study
            // to show/hide additional options
            const studyObject = values[0];
            if (studyObject !== null) {
                console.log('I found a study!');
                this.isEnrolled = true;
                this.study = JSON.parse(studyObject);
            }
            else {
                this.isEnrolled = false;
            }
            // get the uuid from storage to display in the list
            this.uuid = values[1];
            // get the status of the notifications
            const notificationsEnabled = values[2];
            if (notificationsEnabled === null) {
                this.notificationsEnabled = false;
            }
            else {
                this.notificationsEnabled = notificationsEnabled;
            }
            // log the user visiting this tab
            this.surveyDataService.logPageVisitToServer({
                timestamp: moment__WEBPACK_IMPORTED_MODULE_4__().format(),
                milliseconds: moment__WEBPACK_IMPORTED_MODULE_4__().valueOf(),
                page: 'settings',
                event: 'entry',
                module_index: -1,
            });
        });
    }
    ionViewWillLeave() {
        if (this.isEnrolled) {
            this.surveyDataService.logPageVisitToServer({
                timestamp: moment__WEBPACK_IMPORTED_MODULE_4__().format(),
                milliseconds: moment__WEBPACK_IMPORTED_MODULE_4__().valueOf(),
                page: 'settings',
                event: 'exit',
                module_index: -1,
            });
        }
    }
    /**
     * Display a dialog to withdraw from the study
     */
    withdrawFromStudy() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Are you sure?',
                message: 'By withdrawing, you will lose all progress.',
                cssClass: 'alertStyle',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                    },
                    {
                        text: 'Withdraw',
                        handler: () => {
                            // log a withdraw event to the server
                            this.surveyDataService.logPageVisitToServer({
                                timestamp: moment__WEBPACK_IMPORTED_MODULE_4__().format(),
                                milliseconds: moment__WEBPACK_IMPORTED_MODULE_4__().valueOf(),
                                page: 'settings',
                                event: 'withdraw',
                                module_index: -1,
                            });
                            // upload any pending logs and data
                            this.surveyDataService
                                .uploadPendingData('pending-log')
                                .then(() => this.surveyDataService.uploadPendingData('pending-data'))
                                .then(() => this.storage.remove('current-study')
                            // then remove all the pending study tasks from storage
                            )
                                .then(() => this.storage.remove('study-tasks')
                            // then cancel all remaining notifications and navigate to home
                            )
                                .then(() => {
                                // cancel all notifications
                                this.notificsationsService.cancelAllNotifications();
                                // navigate to the home tab
                                this.navController.navigateRoot('/');
                            });
                        },
                    },
                ],
            });
            yield alert.present();
        });
    }
    /**
     * Enables/disables the notifications
     */
    toggleNotifications() {
        // update the notifications flag
        this.storage.set('notifications-enabled', this.notificationsEnabled);
        // set the next 30 notifications (cancels all notifications before setting them if enabled)
        this.notificsationsService.setNext30Notifications();
    }
    /**
     * Opens the support website for the current study in a web browser
     *
     * @param support_url The current study's support website URL
     */
    openSupportURL(support_url) {
        //window.location.href = support_url;
        const browser = this.iab.create(support_url, '_system');
    }
    /**
     * Opens a new email addressed to the current study's support email address
     *
     * @param support_email The current study's support email address
     * @param study_name The current study's name
     */
    openSupportEmail(support_email, study_name) {
        window.location.href =
            'mailto:' + support_email + '?subject=Support: ' + study_name;
    }
};
SettingsPage.ctorParameters = () => [
    { type: _ionic_storage_angular__WEBPACK_IMPORTED_MODULE_8__.Storage },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.NavController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.AlertController },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_3__.InAppBrowser },
    { type: _services_notification_notifications_service__WEBPACK_IMPORTED_MODULE_2__.NotificationsService },
    { type: _translate_config_service__WEBPACK_IMPORTED_MODULE_5__.TranslateConfigService },
    { type: _services_survey_data_survey_data_service__WEBPACK_IMPORTED_MODULE_6__.SurveyDataService }
];
SettingsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
        selector: 'app-settings',
        template: _settings_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_settings_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], SettingsPage);



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

/***/ 297:
/*!**************************************************************!*\
  !*** ./src/app/pages/settings/settings.page.scss?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "ion-item {\n  --min-height: 0px;\n}\n\n.title-label {\n  margin: 3px;\n  font-size: 12px;\n}\n\nion-content {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nion-col {\n  display: flex;\n  align-items: center;\n}\n\nion-item-group {\n  padding-top: 20px;\n  padding-right: 20px;\n  padding-left: 20px;\n}\n\n.icon-image {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nion-img::part(image) {\n  height: 100px;\n  /* or whatever value */\n  /* you can set the height value too */\n}\n\nion-item {\n  --ion-item-background: transparent;\n}\n\nion-list {\n  --ion-item-background: transparent;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmdzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUNBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFFRjs7QUFDQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQUVGOztBQUNBO0VBQ0UsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBRUY7O0FBQ0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQUVGOztBQUNBO0VBRUUsYUFBQTtFQUFlLHNCQUFBO0VBQ2YscUNBQUE7QUFFRjs7QUFDQTtFQUNFLGtDQUFBO0FBRUY7O0FBQUE7RUFDRSxrQ0FBQTtBQUdGIiwiZmlsZSI6InNldHRpbmdzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1pdGVtIHtcbiAgLS1taW4taGVpZ2h0OiAwcHg7XG59XG5cbi50aXRsZS1sYWJlbHtcbiAgbWFyZ2luOiAzcHg7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cbmlvbi1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbmlvbi1jb2wge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5pb24taXRlbS1ncm91cHtcbiAgcGFkZGluZy10b3A6IDIwcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XG4gIHBhZGRpbmctbGVmdDogMjBweDtcbn1cblxuLmljb24taW1hZ2V7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5pb24taW1nOjpwYXJ0KGltYWdlKSB7XG5cbiAgaGVpZ2h0OiAxMDBweDsgLyogb3Igd2hhdGV2ZXIgdmFsdWUgKi9cbiAgLyogeW91IGNhbiBzZXQgdGhlIGhlaWdodCB2YWx1ZSB0b28gKi9cbn1cblxuaW9uLWl0ZW0ge1xuICAtLWlvbi1pdGVtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuaW9uLWxpc3Qge1xuICAtLWlvbi1pdGVtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuIl19 */";

/***/ }),

/***/ 6364:
/*!**************************************************************!*\
  !*** ./src/app/pages/settings/settings.page.html?ngResource ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title>\n\n      <span class=\"header-title-thin\">momenTUM</span>\n    </ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-item-group>\n    <ion-grid>\n      <ion-row>\n        <ion-col stacked class=\"icon-image\"  size=\"4\">\n          <ion-img  src=\"assets/imgs/person.png\"></ion-img>\n        </ion-col>\n        <ion-col size=\"8\">\n          <!-- <ion-item>User ID</ion-item>\n      <ion-item >\n          {{this.uuid}}\n      </ion-item> -->\n      <ion-list>\n        <ion-item lines=\"none\">\n          <ion-label color=\"secondary\" stacked class=\"title-label\">\n            User ID\n          </ion-label>\n        </ion-item>\n\n        <ion-item lines=\"none\">\n          <ion-label>\n            {{this.uuid}}\n          </ion-label>\n        </ion-item>\n        </ion-list>\n    </ion-col>\n      </ion-row>\n    </ion-grid>\n\n  </ion-item-group>\n  <ion-item-group [hidden]=\"!isEnrolled\">\n    <ion-label color=\"secondary\" stacked class=\"title-label\">\n      Notifications\n          </ion-label>\n\n      <ion-item lines=\"none\">\n          <ion-label>Enable Notifications</ion-label>\n          <ion-toggle color=\"secondary\" (ionChange)=\"toggleNotifications()\" [(ngModel)]=\"notificationsEnabled\"></ion-toggle>\n      </ion-item>\n      <div *ngIf=\"this.study?.properties.instructions?.length > 0\">\n          <ion-label color=\"secondary\" stacked class=\"title-label\">\n            About this study\n                </ion-label>\n          <ion-item lines=\"none\">\n              <ion-label style=\"white-space: pre-wrap !important;\" [innerHTML]=\"this.study?.properties.instructions\" class=\"ion-text-wrap\">\n              </ion-label>\n          </ion-item>\n      </div>\n      <div *ngIf=\"this.study?.properties.support_email?.length > 0 || this.study?.properties.support_url?.length > 0\">\n\n          <ion-label color=\"secondary\" stacked class=\"title-label\">\n            Support\n                </ion-label>\n          <ion-item lines=\"none\" *ngIf=\"this.study?.properties.support_email?.length > 0\" (click)=\"openSupportEmail(this.study?.properties.support_email, this.study?.properties.study_name)\" detail>\n              <ion-label>\n                  Contact us by email\n              </ion-label>\n          </ion-item>\n          <ion-item lines=\"none\" *ngIf=\"this.study?.properties.support_url?.length > 0\" (click)=\"openSupportURL(this.study?.properties.support_url)\" detail>\n              <ion-label>\n                  Support website\n              </ion-label>\n          </ion-item>\n      </div>\n      <div *ngIf=\"this.study?.properties.ethics?.length > 0 || this.study?.properties.pls?.length > 0\">\n\n          <ion-label color=\"secondary\" stacked class=\"title-label\">\n            Ethics Information\n                </ion-label>\n          <ion-item lines=\"none\" *ngIf=\"this.study?.properties.ethics?.length > 0\">\n              <ion-label style=\"white-space: pre-wrap !important;\" [innerHTML]=\"this.study?.properties.ethics\" class=\"ion-text-wrap\">\n              </ion-label>\n          </ion-item>\n          <ion-item lines=\"none\" *ngIf=\"this.study?.properties.pls?.length > 0\" (click)=\"openSupportURL(this.study?.properties.pls)\" detail>\n              <ion-label>\n                  Plain Language Statement\n              </ion-label>\n          </ion-item>\n      </div>\n      <ion-label color=\"secondary\" stacked class=\"title-label\">\n        Withdraw\n            </ion-label>\n      <ion-item lines=\"none\" (click)=\"withdrawFromStudy()\" detail>\n          <ion-label>\n              Withdraw from study\n          </ion-label>\n      </ion-item>\n  </ion-item-group>\n\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_pages_settings_settings_module_ts.js.map