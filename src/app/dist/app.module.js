"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = exports.LanguageLoader = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var angular_1 = require("@ionic/angular");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var ng2_charts_1 = require("ng2-charts");
var forms_1 = require("@angular/forms");
/* plugins */
var storage_angular_1 = require("@ionic/storage-angular");
var ngx_1 = require("@ionic-native/file/ngx");
var http_1 = require("@angular/common/http");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
function LanguageLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
exports.LanguageLoader = LanguageLoader;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            imports: [
                platform_browser_1.BrowserModule,
                ng2_charts_1.NgChartsModule,
                angular_1.IonicModule.forRoot(),
                storage_angular_1.IonicStorageModule.forRoot(),
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: LanguageLoader,
                        deps: [http_1.HttpClient]
                    }
                }),
            ],
            providers: [
                ngx_1.File,
                forms_1.FormsModule,
                { provide: router_1.RouteReuseStrategy, useClass: angular_1.IonicRouteStrategy },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
