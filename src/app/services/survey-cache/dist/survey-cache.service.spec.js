"use strict";
// @ts-nocheck
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
var testing_1 = require("@angular/core/testing");
var loading_service_service_1 = require("../loading/loading-service.service");
var storage_service_1 = require("../storage/storage.service");
var survey_cache_service_1 = require("./survey-cache.service");
var study_tasks_json_1 = require("../../../../cypress/fixtures/study_tasks.json");
var barcode_service_1 = require("../../services/barcode/barcode.service");
describe('SurveyCacheService', function () {
    var service;
    var StorageServiceSpy;
    var file;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var storageSpy;
        return __generator(this, function (_a) {
            storageSpy = jasmine.createSpyObj('StorageServiceeSpy', [
                'init',
                'set',
                'get',
            ]);
            testing_1.TestBed.configureTestingModule({
                providers: [
                    survey_cache_service_1.SurveyCacheService,
                    File,
                    loading_service_service_1.LoadingService,
                    barcode_service_1.BarcodeService,
                    { provide: storage_service_1.StorageService, useValue: storageSpy },
                ]
            });
            service = testing_1.TestBed.inject(survey_cache_service_1.SurveyCacheService);
            file = testing_1.TestBed.inject(File);
            StorageServiceSpy = testing_1.TestBed.inject(storage_service_1.StorageService);
            return [2 /*return*/];
        });
    }); });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
    it('should extract media urls', function () { return __awaiter(void 0, void 0, void 0, function () {
        var study;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, JSON.parse(JSON.stringify(study_tasks_json_1["default"].study))];
                case 1:
                    study = _a.sent();
                    // Get media from the study
                    service.getMediaURLs(study);
                    // Any ideas how to properly test a function that does not return anything?
                    expect(service.mediaToCache.banner)
                        .withContext('check if the "banner_url" media to cache has been set')
                        .toEqual(study.properties.banner_url);
                    expect(Object.keys(service.mediaToCache).length)
                        .withContext('check if the media count is similar to cache length')
                        .toEqual(service.mediaCount);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should download the survey', testing_1.waitForAsync(function () {
        // Need to make sure it doesn't return undefined
        var result = service.downloadFile('https://upload.wikimedia.org/wikipedia/commons/e/e0/Farberware-Minute-Timer-White.jpg');
        expect(result)
            .withContext('Just making sure I get a response')
            .toBeTruthy();
    }));
    it('should show cache all media', function () { return __awaiter(void 0, void 0, void 0, function () {
        var study;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    study = JSON.parse(JSON.stringify(study_tasks_json_1["default"].study));
                    StorageServiceSpy.get.and.returnValue(Promise.resolve(JSON.stringify(study)));
                    return [4 /*yield*/, service.cacheAllMedia(study)];
                case 1:
                    _a.sent();
                    // Make sure everything is in place
                    expect(service.mediaToCache.banner)
                        .withContext('Has banner url')
                        .toBeTruthy();
                    expect(service.mediaCount)
                        .withContext('Has a media count')
                        .toBeGreaterThan(0);
                    expect(service.localMediaURLs)
                        .withContext('Has local media url')
                        .toBeTruthy();
                    expect(service.mediaCount)
                        .withContext('Has media Downloaded Count')
                        .toBeGreaterThan(0);
                    expect(service.mediaDownloadedCount)
                        .withContext('Has downloaded media')
                        .toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should download all the media', function () { return __awaiter(void 0, void 0, void 0, function () {
        var study;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    study = JSON.parse(JSON.stringify(study_tasks_json_1["default"].study));
                    StorageServiceSpy.get.and.returnValue(Promise.resolve(JSON.stringify(study)));
                    service.getMediaURLs(study);
                    return [4 /*yield*/, service.downloadAllMedia()];
                case 1:
                    _a.sent();
                    expect(service.localMediaURLs)
                        .withContext('Has local media url')
                        .toBeTruthy();
                    expect(service.mediaDownloadedCount)
                        .withContext('Has downloaded media')
                        .toBeGreaterThan(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check if finished', function () { return __awaiter(void 0, void 0, void 0, function () {
        var study;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    study = JSON.parse(JSON.stringify(study_tasks_json_1["default"].study));
                    // Sets storage key 'current-study' with a Study
                    StorageServiceSpy.get.and.returnValue(Promise.resolve(JSON.stringify(study)));
                    service.getMediaURLs(study);
                    // Check if the media count is greater than 0
                    expect(service.mediaCount)
                        .withContext('Has media Downloaded Count')
                        .toBeGreaterThan(0);
                    return [4 /*yield*/, service.downloadAllMedia()];
                case 1:
                    _a.sent();
                    // Check if the media count and downloaded media count is similar
                    expect(service.mediaCount)
                        .withContext('Making sure we have the same count')
                        .toEqual(service.mediaDownloadedCount);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check update Media URLs In Study', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); });
});
