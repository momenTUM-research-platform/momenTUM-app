import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import {ViewWillEnter, ViewWillLeave} from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {

  constructor() { }

  async ionViewWillEnter() {
    await BarcodeScanner.checkPermission({force:true});
    console.log("view did enter");
    BarcodeScanner.hideBackground();
    document.querySelector('body').classList.add('scanner-active');
    BarcodeScanner.startScan();
  }

  async ionViewWillLeave() {
    await BarcodeScanner.showBackground();
    await BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
  }
}
