import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router } from '@angular/router';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { StorageService } from './services/storage/storage.service';
import { NotificationsService } from './services/notification/notifications.service';
import { DataService } from './services/data/data.service';
import { BarcodeService } from './services/barcode/barcode.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private storage: StorageService,
    private notificationsService: NotificationsService,
    private surveyDataService: DataService,
    private router: Router,
    private barcodeService: BarcodeService
  ) {
    defineCustomElements(window);
  }

  async ngOnInit() {
    // First wait for native platform to be ready
    await this.platform.ready();

    // Initialize persistent storage
    await this.storage.init();

    // Apply system dark/light preference
    this.initializeTheme();

    // -- Notifications setup --
    // 1) Ensure permissions + channel exists
    await this.notificationsService.initialize();
    console.log('[NOTIF]', 'notificationsService.initialize() complete');
    // 2) Schedule up to 30 future alerts right now
    console.log('[App] About to setNext30Notifications');
    await this.notificationsService.setNext30Notifications();
    console.log('[App] Done setNext30Notifications');
    // // 3) Handle taps on delivered notifications
    // this.notificationsService.addListenerOnClick();

    // 4) Re-schedule whenever the app resumes from background
    this.platform.resume.subscribe(async () => {
      await this.notificationsService.setNext30Notifications();
    });

    // Hide the splash screen last
    await SplashScreen.hide().catch(() => {});
  }

  private async initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
      .matches;
    document.body.classList.toggle('dark', prefersDark);
    await StatusBar.setStyle({
      style: prefersDark ? Style.Dark : Style.Light,
    }).catch(() => {});
  }
}