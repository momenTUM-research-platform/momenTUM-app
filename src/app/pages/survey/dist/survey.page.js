"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.SurveyPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var browser_1 = require("@capacitor/browser");
var moment = require("moment");
var core_2 = require("@capacitor/core");
var splash_screen_1 = require("@capacitor/splash-screen");
var SurveyPage = /** @class */ (function () {
    function SurveyPage(route, storage, domSanitizer, navController, photoService, studyTasksService, surveyDataService, toastController, ngZone) {
        this.route = route;
        this.storage = storage;
        this.domSanitizer = domSanitizer;
        this.navController = navController;
        this.photoService = photoService;
        this.studyTasksService = studyTasksService;
        this.surveyDataService = surveyDataService;
        this.toastController = toastController;
        this.ngZone = ngZone;
        // variables to handle the sections
        this.sectionIndex = 0;
        this.sectionName = '';
        this.loaded = false;
        this.photoUrl = null;
    }
    /**
     * Triggered when the survey page is first opened
     * Initialises the survey and displays it on the screen
     */
    SurveyPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var task, todos, taskAvailable, _i, todos_1, task_1, _a, _b, _c, section, uuid, randomGroups, _d, _e, section, _f, _g, question, showThese, key, _h, _j, section, _k, _l, question, _m, _o, section, _p, _q, question;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        // necessary to update height of external embedded content
                        window.addEventListener('message', function (e) {
                            if (e.data.hasOwnProperty('frameHeight')) {
                                document.querySelector('iframe[src^="' + e.data.url + '"]').style.height = e.data.frameHeight + 10 + "px";
                                document.querySelector('iframe[src^="' + e.data.url + '"]').style.width = "99%";
                            }
                        });
                        // load the task
                        this.task_id = this.route.snapshot.paramMap.get('task_id');
                        return [4 /*yield*/, this.storage.getTaskByID(this.task_id)];
                    case 1:
                        task = _r.sent();
                        this.task_index = task.index;
                        return [4 /*yield*/, this.studyTasksService.getToDos()];
                    case 2:
                        todos = _r.sent();
                        taskAvailable = false;
                        for (_i = 0, todos_1 = todos; _i < todos_1.length; _i++) {
                            task_1 = todos_1[_i];
                            if (task_1.task_id === this.task_id) {
                                taskAvailable = true;
                                break;
                            }
                        }
                        if (!taskAvailable) {
                            this.showToast('This task had a time limit and is no longer available.', 'bottom');
                            this.navController.navigateRoot('/');
                            return [2 /*return*/];
                        }
                        // extract the JSON from the study object
                        _a = this;
                        return [4 /*yield*/, this.storage.getModuleByID(task.uuid)];
                    case 3:
                        // extract the JSON from the study object
                        _a.survey = (_r.sent())
                            .params;
                        // shuffle modules if required
                        if (this.survey.shuffle) {
                            this.survey.sections = this.shuffle(this.survey.sections);
                        }
                        // shuffle questions if required
                        for (_b = 0, _c = this.survey.sections; _b < _c.length; _b++) {
                            section = _c[_b];
                            if (section.shuffle) {
                                section.questions = this.shuffle(section.questions);
                            }
                        }
                        // get the name of the current section
                        this.sectionName = this.survey.sections[this.sectionIndex].name;
                        return [4 /*yield*/, this.storage.getUuid()];
                    case 4:
                        uuid = _r.sent();
                        this.setupQuestionVariables(uuid.toString());
                        randomGroups = {};
                        for (_d = 0, _e = this.survey.sections; _d < _e.length; _d++) {
                            section = _e[_d];
                            for (_f = 0, _g = section.questions; _f < _g.length; _f++) {
                                question = _g[_f];
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
                        showThese = [];
                        for (key in randomGroups) {
                            if (randomGroups.hasOwnProperty(key)) {
                                // select a random value from each array and add it to the "showThese array"
                                showThese.push(randomGroups[key][Math.floor(Math.random() * randomGroups[key].length)]);
                            }
                        }
                        // iterate back through and show the ones that have been randomly calculated
                        // while removing the branching attributes from those that are hidden
                        for (_h = 0, _j = this.survey.sections; _h < _j.length; _h++) {
                            section = _j[_h];
                            for (_k = 0, _l = section.questions; _k < _l.length; _k++) {
                                question = _l[_k];
                                if (showThese.includes(question.id)) {
                                    question.noToggle = false;
                                    question.response = 1;
                                    // hide any questions from the rand_group that were not made visible
                                    // and remove any branching logic attributes
                                    // ### How to do this in TS?
                                }
                                else if (question.noToggle) {
                                    question.hidden = true;
                                    delete question.hide_id;
                                    delete question.hide_value;
                                    delete question.hide_if;
                                }
                            }
                        }
                        // toggle dynamic question setup
                        for (_m = 0, _o = this.survey.sections; _m < _o.length; _m++) {
                            section = _o[_m];
                            for (_p = 0, _q = section.questions; _p < _q.length; _p++) {
                                question = _q[_p];
                                this.toggleDynamicQuestions(question);
                            }
                        }
                        splash_screen_1.SplashScreen.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handles the back button behaviour
     */
    SurveyPage.prototype.back = function () {
        var _this = this;
        if (this.sectionIndex > 0) {
            this.ngZone.run(function () {
                _this.sectionIndex--;
                _this.sectionName = _this.survey.sections[_this.sectionIndex].name;
            });
        }
        else {
            // nav back to the home screen
            this.navController.navigateRoot('/');
        }
    };
    /**
     * Sets up any questions that need initialisation before display
     * e.g. sets date/time objects to current date/time, set default values for sliders, etc.
     */
    SurveyPage.prototype.setupQuestionVariables = function (uuid) {
        // for all relevant questions add an empty response variable
        if (this.survey.sections) {
            for (var _i = 0, _a = this.survey.sections; _i < _a.length; _i++) {
                var section = _a[_i];
                for (var _b = 0, _c = section.questions; _b < _c.length; _b++) {
                    var question = _c[_b];
                    // for all question types that can be responded to, set default values
                    question.response = '';
                    question.model = '';
                    question.hideError = true;
                    question.hidden = false;
                    // for datetime questions, default to the current date/time
                    if (question.type === 'datetime') {
                        // placeholder for dates
                        question.model = moment().format();
                        // for audio/video questions, sanitize the URLs to make them safe/work in html5 tags ### Not sanitizing at themoment
                    }
                    else if (question.type === 'media' &&
                        (question.subtype === 'audio' || question.subtype === 'video')) {
                        question.safeurl = this.domSanitizer.bypassSecurityTrustResourceUrl(question.src);
                        if (question.subtype === 'video') {
                            question.safethumb =
                                this.domSanitizer.bypassSecurityTrustResourceUrl(question.thumb);
                        }
                        // for slider questions, set the default value to be halfway between min and max
                    }
                    else if (question.type === 'slider') {
                        // get min and max
                        var min = question.min;
                        var max = question.max;
                        // set the default value of the slider to the middle value
                        var model = min + (max - min) / 2;
                        question.model = model;
                        // a starting value must also be set for the slider to work properly
                        question.value = model;
                        // for checkbox items, the response is set to an empty array
                    }
                    else if (question.type === 'multi') {
                        // set up checked tracking for checkbox questions types
                        var tempOptions = [];
                        for (var _d = 0, _e = question.options; _d < _e.length; _d++) {
                            var option = _e[_d];
                            tempOptions.push({
                                text: option,
                                checked: false
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
    };
    /**
     * Saves the response to a question and triggers and branching
     *
     * @param question The question that has been answered
     */
    SurveyPage.prototype.setAnswer = function (question) {
        // save the response and hide error
        question.response = question.model;
        question.hideError = true;
        // trigger any branching tied to this question
        this.toggleDynamicQuestions(question);
    };
    /**
     * Create a take photo function that returns the file blob text
     */
    SurveyPage.prototype.takePhoto = function (question) {
        return __awaiter(this, void 0, void 0, function () {
            var savedPhoto, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.photoService.takePhoto()];
                    case 1:
                        savedPhoto = _a.sent();
                        if (savedPhoto) {
                            question.model = 'data:image/jpeg;base64,' + savedPhoto.base64String;
                            this.setAnswer(question);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error taking photo:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SurveyPage.prototype.deletePhoto = function (question) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.photoService.deletePhoto(question);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Fires every time a checkbox question is answered; converts the response(s) to a String
     *
     * @param option The option selected in a checkbox group
     * @param question The question that has been answered
     */
    SurveyPage.prototype.changeCheckStatus = function (option, question) {
        // get question responses and split
        var responses = [];
        // split all of the responses up into individual strings
        if (question.response && question.response !== '') {
            responses = question.response.toString().split(';');
            responses.pop();
        }
        // if the checked item was unchecked then remove it
        // otherwise add it to the response array
        if (responses.indexOf(option.text) > -1) {
            // remove it
            var index = responses.indexOf(option.text);
            if (index !== -1) {
                responses.splice(index, 1);
            }
        }
        else {
            responses.push(option.text);
        }
        // write the array back to a single string
        var response_string = '';
        for (var _i = 0, responses_1 = responses; _i < responses_1.length; _i++) {
            var response = responses_1[_i];
            response_string += response + ';';
        }
        // hide any non-response error
        question.hideError = true;
        question.response = response_string;
    };
    /**
     * Opens an external file in the in app browser
     *
     * @param url The url of the PDF file to open
     */
    SurveyPage.prototype.openExternalFile = function (url) {
        if (core_2.Capacitor.isNativePlatform()) {
            browser_1.Browser.open({ url: url, windowName: '_system' })["catch"](function (e) {
                console.log('ERROR in promise caught: settings.page.ts: Browser.open() threw: + ' +
                    e);
            });
        }
        else {
            window.open(url, '_blank');
        }
    };
    /**
     *
     * @param question
     * @returns
     */
    SurveyPage.prototype.toggleDynamicQuestions = function (question) {
        for (var _i = 0, _a = this.survey.sections; _i < _a.length; _i++) {
            var section = _a[_i];
            for (var _b = 0, _c = section.questions; _b < _c.length; _b++) {
                var q = _c[_b];
                if (q.hide_id === question.id) {
                    if ((q.hide_value === question.response) === q.hide_if) {
                        this.hideQuestion(q);
                    }
                    else {
                        q.hidden = false;
                        this.toggleDynamicQuestions(q);
                    }
                }
            }
        }
    };
    /**
     * Handles the submit/next button in each section.
     * Checks if all required questions have been answered and then moves to the next section/saves the response.
     */
    SurveyPage.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var valid, task, response_time, response_time_ms, responses, _i, _a, section, _b, _c, question, response;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        valid = !this.checkErrors();
                        if (!valid) {
                            this.content.scrollToTop(500);
                            this.showToast('You must answer all required (*) questions', 'bottom');
                            return [2 /*return*/];
                        }
                        // not the last section: go to the next section
                        if (this.sectionIndex + 1 !== this.survey.sections.length) {
                            this.ngZone.run(function () {
                                _this.sectionIndex++;
                                _this.sectionName = _this.survey.sections[_this.sectionIndex].name;
                                _this.content.scrollToTop(0);
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.storage.getTaskByID(this.task_id)];
                    case 1:
                        task = _d.sent();
                        task.alert_time = moment(new Date(task.time).toISOString()).format();
                        response_time = moment().format();
                        task.response_time = response_time;
                        response_time_ms = moment().valueOf();
                        task.response_time_ms = response_time_ms;
                        // indicate that the current task is completed
                        task.completed = true;
                        responses = {};
                        for (_i = 0, _a = this.survey.sections; _i < _a.length; _i++) {
                            section = _a[_i];
                            for (_b = 0, _c = section.questions; _b < _c.length; _b++) {
                                question = _c[_b];
                                responses[question.id] = question.response;
                            }
                        }
                        task.responses = responses;
                        response = {
                            module_index: task.index,
                            module_name: task.name,
                            alert_time: task.alert_time,
                            response_time: response_time,
                            response_time_in_ms: response_time_ms,
                            data: responses
                        };
                        return [4 /*yield*/, this.surveyDataService.sendResponse(response, 'survey_response')];
                    case 2:
                        _d.sent();
                        // write tasks back to storage
                        return [4 /*yield*/, this.storage.saveTask(task)];
                    case 3:
                        // write tasks back to storage
                        _d.sent();
                        this.navController.navigateRoot('/');
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks, whether there are any errors in the current section.
     *
     * @returns A boolean value indicating whether the section has errors (true) or not (false)
     */
    SurveyPage.prototype.checkErrors = function () {
        var currentQuestions = this.survey.sections[this.sectionIndex].questions;
        var errorCount = 0;
        for (var _i = 0, currentQuestions_1 = currentQuestions; _i < currentQuestions_1.length; _i++) {
            var question = currentQuestions_1[_i];
            var error = question.required &&
                !question.hidden &&
                question.type !== 'instruction' &&
                question.type !== 'media' &&
                (question.response === '' || question.response === undefined);
            if (error) {
                question.hideError = false;
                errorCount++;
            }
            else {
                question.hideError = true;
            }
        }
        return errorCount !== 0;
    };
    /**
     * Creates a Toast object to display a message to the user
     *
     * @param message A message to display in the toast
     * @param position The position on the screen to display the toast
     */
    SurveyPage.prototype.showToast = function (message, position) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            position: position,
                            keyboardClose: true,
                            color: 'danger',
                            buttons: [
                                {
                                    text: 'Dismiss',
                                    role: 'cancel',
                                    handler: function () { }
                                },
                            ]
                        })];
                    case 1:
                        toast = _a.sent();
                        toast === null || toast === void 0 ? void 0 : toast.present()["catch"](function () { });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Hides a question and all the questions whose visibility depends on the question.
     */
    SurveyPage.prototype.hideQuestion = function (question) {
        question.hidden = true;
        for (var _i = 0, _a = this.survey.sections; _i < _a.length; _i++) {
            var section = _a[_i];
            for (var _b = 0, _c = section.questions; _b < _c.length; _b++) {
                var q = _c[_b];
                if (q.hide_id === question.id) {
                    this.hideQuestion(q);
                }
            }
        }
    };
    /**
     * Randomly shuffle an array
     * https://stackoverflow.com/a/2450976/1293256
     *
     * @param array The array to shuffle
     * @return      The first item in the shuffled array
     */
    SurveyPage.prototype.shuffle = function (array) {
        var currentIndex = array.length;
        var temporaryValue;
        var randomIndex;
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
    };
    __decorate([
        core_1.ViewChild(angular_1.IonContent, { static: false })
    ], SurveyPage.prototype, "content");
    SurveyPage = __decorate([
        core_1.Component({
            selector: 'app-survey',
            templateUrl: './survey.page.html',
            styleUrls: ['./survey.page.scss']
        })
    ], SurveyPage);
    return SurveyPage;
}());
exports.SurveyPage = SurveyPage;
