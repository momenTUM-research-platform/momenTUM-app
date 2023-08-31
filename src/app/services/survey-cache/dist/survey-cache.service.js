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
exports.SurveyCacheService = void 0;
var core_1 = require("@angular/core");
var capacitor_plugin_filedownload_1 = require("capacitor-plugin-filedownload");
var SurveyCacheService = /** @class */ (function () {
    function SurveyCacheService(storage, loadingService) {
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
    SurveyCacheService.prototype.downloadFile = function (url) {
        return __awaiter(this, void 0, Promise, function () {
            var urlSplit, fileName, file, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        urlSplit = url.split('/');
                        fileName = urlSplit[urlSplit.length - 1];
                        return [4 /*yield*/, capacitor_plugin_filedownload_1.FileDownload.download({
                                url: url,
                                fileName: fileName
                            })];
                    case 1:
                        file = _a.sent();
                        console.log('Downloaded file: ' + file);
                        // Return the local URL of the downloaded file
                        return [2 /*return*/, file.path];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets all of the remote URLs from the media elements in this study
     *
     * @param study The study protocol
     */
    SurveyCacheService.prototype.getMediaURLs = function (study) {
        // get banner url
        this.mediaToCache.banner = study.properties.banner_url;
        // get urls from media elements
        for (var _i = 0, _a = study.modules; _i < _a.length; _i++) {
            var module = _a[_i];
            // Must check if the sections exist,
            // they don't for pvt modules
            if (module.params.type === 'survey' && module.params.sections) {
                for (var _b = 0, _c = module.params.sections; _b < _c.length; _b++) {
                    var section = _c[_b];
                    var mediaQuestions = section.questions.filter(function (question) {
                        question.type === 'media';
                    });
                    for (var _d = 0, mediaQuestions_1 = mediaQuestions; _d < mediaQuestions_1.length; _d++) {
                        var question = mediaQuestions_1[_d];
                        // @ts-ignore
                        this.mediaToCache[question.id] = question.type.src;
                    }
                }
            }
        }
        // set mediaCount to be number of media items
        this.mediaCount = Object.keys(this.mediaToCache).length;
    };
    /**
     * Gets all of the media URLs from the study protocol and downloads the files
     *
     * @param study The study protocol
     */
    SurveyCacheService.prototype.cacheAllMedia = function (study) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mediaCount = 0;
                        this.mediaDownloadedCount = 0;
                        // map media question ids to their urls
                        this.getMediaURLs(study);
                        return [4 /*yield*/, this.downloadAllMedia()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Downloads all of the media items from the remote URLs
     */
    SurveyCacheService.prototype.downloadAllMedia = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keys, _loop_1, this_1, _i, keys_1, key;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = Object.keys(this.mediaToCache);
                        _loop_1 = function (key) {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this_1.downloadFile(this_1.mediaToCache[key]).then(function (entryURL) {
                                            if (_this.win !== undefined &&
                                                _this.win.Ionic !== undefined &&
                                                _this.win.Ionic.WebView !== undefined) {
                                                _this.localMediaURLs[key] =
                                                    _this.win.Ionic.WebView.convertFileSrc(entryURL);
                                            }
                                            _this.mediaDownloadedCount = _this.mediaDownloadedCount + 1;
                                            _this.checkIfFinished();
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, keys_1 = keys;
                        _a.label = 1;
                    case 1:
                        if (!(_i < keys_1.length)) return [3 /*break*/, 4];
                        key = keys_1[_i];
                        return [5 /*yield**/, _loop_1(key)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if all of the media has been downloaded, if so update the protocol
     */
    SurveyCacheService.prototype.checkIfFinished = function () {
        if (this.mediaDownloadedCount === this.mediaCount) {
            this.updateMediaURLsInStudy();
        }
    };
    /**
     * Replaces the remote URLs for media items with the local URLs
     */
    SurveyCacheService.prototype.updateMediaURLsInStudy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var studyObject, _i, _a, module, _b, _c, section, mediaQuestions, _d, mediaQuestions_2, question;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.storage.getStudy()];
                    case 1:
                        studyObject = _e.sent();
                        try {
                            // update the banner url first
                            studyObject.properties.banner_url = this.localMediaURLs.banner;
                            // update the other media items to the corresponding local URL
                            // get urls from media elements
                            for (_i = 0, _a = studyObject.modules; _i < _a.length; _i++) {
                                module = _a[_i];
                                if (module.params.type === 'survey' && module.params.sections) {
                                    for (_b = 0, _c = module.params.sections; _b < _c.length; _b++) {
                                        section = _c[_b];
                                        mediaQuestions = section.questions.filter(function (question) { return question.type === 'media'; });
                                        for (_d = 0, mediaQuestions_2 = mediaQuestions; _d < mediaQuestions_2.length; _d++) {
                                            question = mediaQuestions_2[_d];
                                            if (question.id in this.localMediaURLs) {
                                                // @ts-ignore
                                                question.type.src = this.localMediaURLs[question.id];
                                            }
                                            // @ts-ignore
                                            if (question.type.subtype === 'video') {
                                                // @ts-ignore
                                                question.thumb = this.localMediaURLs.banner;
                                            }
                                        }
                                    }
                                }
                            }
                            // update the study protocol in storage
                            this.storage.saveStudy(studyObject);
                        }
                        catch (e) {
                            console.log(e);
                        }
                        // dismiss the loading spinner
                        if (this.loadingService) {
                            // Added this condition
                            this.loadingService.dismiss();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SurveyCacheService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SurveyCacheService);
    return SurveyCacheService;
}());
exports.SurveyCacheService = SurveyCacheService;
