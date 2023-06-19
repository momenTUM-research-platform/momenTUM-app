import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router } from '@angular/router';
import { DataService } from './services/data/data.service';
import * as moment from 'moment';
import { StorageService } from './services/storage/storage.service';
import { NotificationsService } from './services/notification/notifications.service';
import { ActionPerformed } from '@capacitor/local-notifications';
import { BarcodeService } from './services/barcode/barcode.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private notificationsService: NotificationsService,
    private surveyDataService: DataService,
    private router: Router,
    private storage: StorageService
  ) {}

  /**
   * Angular component lifecycle method: [Docs](https://angular.io/guide/lifecycle-hooks).
   * Executed only once upon creation of the component but before rendering of the component.
   *
   * Initializes the app by performing the following tasks:
   * - waiting until the platform is ready
   * - initializing the storage
   * - initializing the theme
   */
  async ngOnInit() {
    this.storage.init();
    this.initializeTheme();
    this.notificationsService.addListenerOnClick();
    await this.platform.ready();
  }

  /**
   * Initializes the theme to the systems preference.
   */
  async initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    document.body.classList.toggle('dark', prefersDark.matches);
    await StatusBar.setStyle({
      style: prefersDark.matches ? Style.Dark : Style.Light,
    }).catch((e) => {
      console.log(e);
    });
  }
}
