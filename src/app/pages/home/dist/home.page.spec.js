"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var angular_1 = require("@ionic/angular");
var testing_1 = require("@angular/core/testing");
var storage_1 = require("@ionic/storage");
var testing_2 = require("@angular/router/testing");
var data_service_1 = require("../../services/data/data.service");
var core_1 = require("@ngx-translate/core");
var app_module_1 = require("../../app.module");
var testing_3 = require("@angular/common/http/testing");
var http_1 = require("@angular/common/http");
var home_page_1 = require("./home.page");
var status_bar_1 = require("@capacitor/status-bar");
var change_theme_1 = require("../../shared/change-theme");
var loading_service_service_1 = require("../../services/loading/loading-service.service");
var storage_service_1 = require("src/app/services/storage/storage.service");
var study_tasks_json_1 = require("../../../../cypress/fixtures/study_tasks.json");
var notifications_service_1 = require("../../services/notification/notifications.service");
var study_tasks_service_1 = require("../../services/study-tasks/study-tasks.service");
var survey_cache_service_1 = require("src/app/services/survey-cache/survey-cache.service");
var mocks_ionic_1 = require("test-config/mocks-ionic");
var core_2 = require("@angular/core");
var mocks_ionic_2 = require("../../../../test-config/mocks-ionic");
describe('HomePage', function () {
    var component;
    var fixture;
    var statusBarSpy;
    beforeEach(testing_1.waitForAsync(function () {
        statusBarSpy = jasmine.createSpyObj('StatusBar', [
            'setStyle',
            'setBackgroundColor',
        ]);
        testing_1.TestBed.configureTestingModule({
            declarations: [home_page_1.HomePage],
            schemas: [core_2.CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                testing_3.HttpClientTestingModule,
                testing_2.RouterTestingModule,
                http_1.HttpClientModule,
                core_1.TranslateModule.forRoot({
                    loader: {
                        provide: core_1.TranslateLoader,
                        useFactory: app_module_1.LanguageLoader,
                        deps: [http_1.HttpClient]
                    }
                }),
                angular_1.IonicModule.forRoot({
                    _testing: true
                }),
            ],
            providers: [
                { provide: angular_1.AlertController, useValue: new mocks_ionic_1.MockAlertController() },
                { provide: status_bar_1.StatusBar, useValue: statusBarSpy },
                { provide: core_1.USE_DEFAULT_LANG, useValue: true },
                { provide: core_1.USE_STORE, useValue: true },
                { provide: core_1.USE_EXTEND, useValue: true },
                { provide: core_1.DEFAULT_LANGUAGE, useValue: 'en' },
                storage_1.Storage,
                File,
            ]
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(home_page_1.HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should toggle theme and change status bar', function () { return __awaiter(void 0, void 0, void 0, function () {
        var el, el_body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    statusBarSpy = jasmine.createSpyObj('StatusBar', [
                        'setStyle',
                        'setBackgroundColor',
                    ]);
                    Object.getOwnPropertyDescriptor(statusBarSpy, 'setStyle').value.and.callThrough();
                    Object.getOwnPropertyDescriptor(statusBarSpy, 'setBackgroundColor').value.and.callThrough();
                    el = document.querySelector('ion-icon');
                    expect(el).toBeDefined();
                    expect(el.getAttribute('name')).toEqual('sunny');
                    el_body = document.body;
                    expect(el_body).toBeDefined();
                    expect(el_body.getAttribute('color-theme')).toEqual('light');
                    // Because statusbar is not implemented on web
                    return [4 /*yield*/, component.toggleTheme().then(function () {
                            expect(statusBarSpy.setStyle).not.toHaveBeenCalled();
                            expect(statusBarSpy.setBackgroundColor).not.toHaveBeenCalled();
                        })];
                case 1:
                    // Because statusbar is not implemented on web
                    _a.sent();
                    return [4 /*yield*/, fixture.whenRenderingDone()];
                case 2:
                    _a.sent();
                    fixture.whenStable().then(function () {
                        fixture.detectChanges();
                        expect(el.getAttribute('name')).toEqual('sunny');
                        expect(el_body.getAttribute('color-theme')).toEqual('dark');
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should call ngOnInIt', function () {
        fixture.whenStable().then(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Check assignment
                fixture.detectChanges();
                expect(change_theme_1.ChangeTheme.preferenceColor).toBeDefined();
                return [2 /*return*/];
            });
        }); });
    });
    describe('Testing functions', function () { return __awaiter(void 0, void 0, void 0, function () {
        var spyStorageGet, spyStorageSet, spyStorageInit, spyLoadingServicePresent, spyLoadingServiceDismiss, spylogPageVisitToServer, spyrequestPermissions, spySetNext30Notifications, spyUploadPendingData, spyGetTaskDisplayList, spyCacheAllMedia, spyGenerateStudyTasks, spyGetRemoteData;
        return __generator(this, function (_a) {
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var stubValueStudy, stubValue, stubValueTask, uniqueId, studyTaskServiceCtrl, storageServiceCtrl, surveyDataService, surveyCacheService, notificationService, loadCtrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, JSON.stringify(study_tasks_json_1["default"].study)];
                        case 1:
                            stubValueStudy = _a.sent();
                            stubValue = JSON.stringify(study_tasks_json_1["default"].tasks_display);
                            stubValueTask = JSON.parse(JSON.stringify(study_tasks_json_1["default"].tasks));
                            uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
                            studyTaskServiceCtrl = fixture.debugElement.injector.get(study_tasks_service_1.StudyTasksService);
                            storageServiceCtrl = fixture.debugElement.injector.get(storage_service_1.StorageService);
                            surveyDataService = fixture.debugElement.injector.get(data_service_1.DataService);
                            surveyCacheService = fixture.debugElement.injector.get(survey_cache_service_1.SurveyCacheService);
                            notificationService = fixture.debugElement.injector.get(notifications_service_1.NotificationsService);
                            loadCtrl = fixture.debugElement.injector.get(loading_service_service_1.LoadingService);
                            spyGetTaskDisplayList = spyOn(studyTaskServiceCtrl, 'getTaskDisplayList').and.returnValue(Promise.resolve(JSON.parse(stubValue)));
                            spyGenerateStudyTasks = spyOn(studyTaskServiceCtrl, 'generateStudyTasks').and.returnValue(Promise.resolve(stubValueTask));
                            spyCacheAllMedia = spyOn(surveyCacheService, 'cacheAllMedia').and.callThrough();
                            spyLoadingServicePresent = spyOn(loadCtrl, 'present').and.callThrough();
                            spyLoadingServiceDismiss = spyOn(loadCtrl, 'dismiss').and.callThrough();
                            spylogPageVisitToServer = spyOn(surveyDataService, 'logPageVisitToServer').and.returnValue(Promise.resolve());
                            spyGetRemoteData = spyOn(surveyDataService, 'getRemoteData').and.returnValue(Promise.resolve(JSON.parse(stubValueStudy)));
                            spyrequestPermissions = spyOn(notificationService, 'requestPermissions').and.returnValue(Promise.resolve());
                            spySetNext30Notifications = spyOn(notificationService, 'setNext30Notifications').and.returnValue(Promise.resolve());
                            spyUploadPendingData = spyOn(surveyDataService, 'uploadPendingData').and.callFake(function (dataType) {
                                if (dataType === 'pending-log') {
                                    return Promise.resolve();
                                }
                                if (dataType === 'pending-data') {
                                    return Promise.resolve();
                                }
                                return null;
                            });
                            spyStorageSet = spyOn(storageServiceCtrl, 'set').and.callFake(function (param) {
                                if (param === 'condition') {
                                    return Promise.resolve();
                                }
                                if (param === 'study-tasks') {
                                    return Promise.resolve();
                                }
                                if (param === 'current-study') {
                                    return Promise.resolve();
                                }
                                if (param === 'enrolment-date') {
                                    return Promise.resolve();
                                }
                                return null;
                            });
                            spyStorageInit = spyOn(storageServiceCtrl, 'init').and.callThrough();
                            spyStorageGet = spyOn(storageServiceCtrl, 'get').and.callFake(function (param) {
                                if (param === 'current-study') {
                                    return Promise.resolve(stubValueStudy);
                                }
                                if (param === 'uuid') {
                                    // throw EmptyError;
                                    return Promise.resolve(uniqueId);
                                }
                                if (param === 'uuid-set') {
                                    return Promise.resolve(false);
                                }
                                if (param === 'notifications-enabled') {
                                    return Promise.resolve(false);
                                }
                                if (param === 'study-tasks') {
                                    return Promise.resolve(JSON.stringify(stubValueTask));
                                }
                                return null;
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should call ionViewWillEnter', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Check assignment
                        return [4 /*yield*/, component.ionViewWillEnter()];
                        case 1:
                            // Check assignment
                            _a.sent();
                            expect(component.themeIconName).toBeDefined();
                            expect(spyrequestPermissions).toHaveBeenCalledTimes(1);
                            expect(spyLoadingServicePresent).toHaveBeenCalledTimes(1);
                            expect(component.hideEnrolOptions).toBe(true);
                            expect(component.showLogin).toBe(false);
                            expect(spyStorageGet).toHaveBeenCalledTimes(3);
                            expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
                            expect(spyGetTaskDisplayList).toHaveBeenCalledTimes(1);
                            expect(spySetNext30Notifications).toHaveBeenCalledTimes(1);
                            expect(spyUploadPendingData).toHaveBeenCalledTimes(2);
                            expect(spyStorageSet).toHaveBeenCalledTimes(3);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should call attempt To Download Study', function () { return __awaiter(void 0, void 0, void 0, function () {
                var stubValueStudy, localURL;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stubValueStudy = JSON.parse(JSON.stringify(study_tasks_json_1["default"].study));
                            localURL = 'http://localhost:3001/api/surveys/study_for_ios.json';
                            return [4 /*yield*/, component.enrolInStudy(localURL, false, false)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, fixture.whenStable()];
                        case 2:
                            _a.sent();
                            expect(component.showLogin).toBe(true);
                            expect(component.hideEnrolOptions).toBe(true);
                            expect(spyStorageSet).toHaveBeenCalledTimes(2);
                            expect(spyGetRemoteData).toHaveBeenCalledTimes(1);
                            expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
                            expect(spyLoadingServiceDismiss).toHaveBeenCalledTimes(1);
                            expect(spyLoadingServicePresent).toHaveBeenCalled();
                            expect(component.study).toEqual(stubValueStudy);
                            expect(spyGenerateStudyTasks).toHaveBeenCalledTimes(1);
                            expect(spySetNext30Notifications).toHaveBeenCalledTimes(1);
                            expect(spyGetTaskDisplayList).toHaveBeenCalledTimes(1);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should call attempt To Enroll in a study', function () { return __awaiter(void 0, void 0, void 0, function () {
                var stubValueStudy;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stubValueStudy = JSON.parse(JSON.stringify(study_tasks_json_1["default"].study));
                            return [4 /*yield*/, component.enrolInStudy(stubValueStudy)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, fixture.whenStable()];
                        case 2:
                            _a.sent();
                            expect(component.showLogin).toBe(true);
                            expect(component.hideEnrolOptions).toBe(true);
                            expect(component.study).toEqual(stubValueStudy);
                            expect(spyStorageSet).toHaveBeenCalledTimes(2);
                            expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
                            expect(spyLoadingServiceDismiss).toHaveBeenCalledTimes(1);
                            expect(spyCacheAllMedia).toHaveBeenCalledTimes(1);
                            expect(spyGenerateStudyTasks).toHaveBeenCalledTimes(1);
                            expect(spySetNext30Notifications).toHaveBeenCalledTimes(1);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should call ionViewWillLeave', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Check assignment
                            component.showLogin = true;
                            expect(component.showLogin).toBe(true);
                            return [4 /*yield*/, component.ionViewWillLeave()];
                        case 1:
                            _a.sent();
                            expect(spylogPageVisitToServer).toHaveBeenCalledTimes(1);
                            expect(spyUploadPendingData).toHaveBeenCalledTimes(2);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should call attempt to enter URL', function () { return __awaiter(void 0, void 0, void 0, function () {
                var localURL, stubValueStudy, mockAlertController, alertSpy, alertControllerStub, alertArg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            localURL = 'http://localhost:3001/api/surveys/study_for_ios.json';
                            stubValueStudy = JSON.parse(JSON.stringify(study_tasks_json_1["default"].study));
                            mockAlertController = fixture.debugElement.injector.get(angular_1.AlertController);
                            alertSpy = jasmine.createSpyObj(mocks_ionic_1.MockAlert, ['present']);
                            alertControllerStub = spyOn(mockAlertController, 'create').and.returnValue(Promise.resolve(alertSpy));
                            return [4 /*yield*/, component.enterURL()];
                        case 1:
                            _a.sent();
                            expect(alertControllerStub).toHaveBeenCalledTimes(1);
                            expect(alertSpy.present).toHaveBeenCalledTimes(1);
                            alertArg = alertControllerStub.calls.mostRecent().args[0];
                            alertArg.buttons[1].handler(localURL);
                            return [4 /*yield*/, fixture.whenStable()];
                        case 2:
                            _a.sent();
                            expect(component.showLogin).toBe(true);
                            expect(component.hideEnrolOptions).toBe(true);
                            expect(spyStorageSet).toHaveBeenCalledTimes(2);
                            expect(spyGetRemoteData).toHaveBeenCalledTimes(1);
                            expect(spyLoadingServicePresent).toHaveBeenCalledTimes(1);
                            expect(component.study).toEqual(stubValueStudy);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should call attempt to enter Study ID', function () { return __awaiter(void 0, void 0, void 0, function () {
                var ID, mockAlertController, alertSpy, alertControllerStub, alertArg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ID = '3ZDOGRH';
                            mockAlertController = fixture.debugElement.injector.get(angular_1.AlertController);
                            alertSpy = jasmine.createSpyObj(mocks_ionic_1.MockAlert, ['present']);
                            alertControllerStub = spyOn(mockAlertController, 'create').and.returnValue(Promise.resolve(alertSpy));
                            return [4 /*yield*/, component.enterStudyID()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, fixture.whenStable()];
                        case 2:
                            _a.sent();
                            expect(alertControllerStub).toHaveBeenCalledTimes(1);
                            expect(alertSpy.present).toHaveBeenCalledTimes(1);
                            alertArg = alertControllerStub.calls.first().args[0];
                            alertArg.buttons[1].handler(ID);
                            expect(spyGetRemoteData).toHaveBeenCalledTimes(1);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should call load Study Details', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, component.loadStudyDetails()];
                        case 1:
                            _a.sent();
                            expect(component.showLogin).toBe(true);
                            expect(component.hideEnrolOptions).toBe(true);
                            expect(spyGetTaskDisplayList).toHaveBeenCalledTimes(1);
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    it('should call attempt display enrol error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockAlertController, alert, alertControllerStub, alertArg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockAlertController = fixture.debugElement.injector.get(angular_1.AlertController);
                    alert = jasmine.createSpyObj(mocks_ionic_1.MockAlert, ['present']);
                    alertControllerStub = spyOn(mockAlertController, 'create').and.returnValue(Promise.resolve(alert));
                    return [4 /*yield*/, component.displayEnrolError(true, true, true, true)];
                case 1:
                    _a.sent();
                    expect(alertControllerStub).toHaveBeenCalledTimes(1);
                    expect(alert.present).toHaveBeenCalledTimes(1);
                    alertArg = alertControllerStub.calls.mostRecent().args[0];
                    expect(alertArg.header).toBe('Oops...');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should call attempt to display barcode error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockAlertController, alert, alertSpy, alertControllerStub, alertArg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockAlertController = fixture.debugElement.injector.get(angular_1.AlertController);
                    alert = {
                        header: 'Permission Required',
                        message: 'Camera permission is required to scan QR codes. You can allow this permission in Settings.',
                        buttons: ['Dismiss']
                    };
                    alertSpy = jasmine.createSpyObj(mocks_ionic_1.MockAlert, ['present']);
                    alertControllerStub = spyOn(mockAlertController, 'create').and.returnValue(Promise.resolve(alertSpy));
                    return [4 /*yield*/, component.displayBarcodeError()];
                case 1:
                    _a.sent();
                    expect(alertControllerStub).toHaveBeenCalledTimes(1);
                    expect(alertControllerStub).toHaveBeenCalledWith(alert);
                    expect(alertSpy.present).toHaveBeenCalledTimes(1);
                    alertArg = alertControllerStub.calls.mostRecent().args[0];
                    expect(alertArg.header).toBe(alert.header);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should call attempt to sort Task List', function () { return __awaiter(void 0, void 0, void 0, function () {
        var stubValueTask;
        return __generator(this, function (_a) {
            stubValueTask = JSON.parse(JSON.stringify(study_tasks_json_1["default"].tasks));
            component.tasks = stubValueTask;
            expect(component.tasks).toEqual(stubValueTask);
            component.sortTasksList();
            expect(component.tasks[0].index).toEqual(stubValueTask[0].index);
            return [2 /*return*/];
        });
    }); });
    it('should call ionViewWillEnter and complete the refresher after a delay', function (done) {
        var myRefresherElement = jasmine.createSpyObj('HTMLIonRefresherElement', ['complete']);
        var refresher = new mocks_ionic_2.MockRefresher(myRefresherElement);
        spyOn(component, 'ionViewWillEnter');
        component.refresh(refresher);
        expect(component.ionViewWillEnter).toHaveBeenCalled();
        setTimeout(function () {
            expect(refresher.target.complete).toHaveBeenCalled();
            done();
        }, 250);
    });
});
