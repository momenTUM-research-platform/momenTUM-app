import { Injectable } from '@angular/core';
import { BarcodeScanner, ScanResult } from '@capacitor-community/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  constructor() { }

  public async startScan(): Promise<ScanResult> {
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await this.checkPermission();

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
    }

    return result;
  };

  async checkPermission() {
    const status = await this.didUserGrantPermission();

    if (!status) {
      // the user denied permission for good
      // redirect user to app settings if they want to grant it anyway
      const c = confirm('If you want to grant permission for using your camera, enable it in the app settings.');
      if (c) {
        BarcodeScanner.openAppSettings();
      }
    }
  };

  async didUserGrantPermission() {
    // check if user already granted permission
    const status = await BarcodeScanner.checkPermission({ force: false });

    if (status.granted) {
      // user granted permission
      return true;
    }

    if (status.denied) {
      // user denied permission
      return false;
    }

    if (status.asked) {
      // system requested the user for permission during this call
      // only possible when force set to true
    }

    if (status.neverAsked) {
      // user has not been requested this permission before
      // it is advised to show the user some sort of prompt
      // this way you will not waste your only chance to ask for the permission
      const c = confirm('We need your permission to use your camera to be able to scan barcodes');
      if (!c) {
        return false;
      }
    }

    if (status.restricted || status.unknown) {
      // ios only
      // probably means the permission has been denied
      return false;
    }

    // user has not denied permission
    // but the user also has not yet granted the permission
    // so request it
    const statusRequest = await BarcodeScanner.checkPermission({ force: true });

    if (statusRequest.asked) {
      // system requested the user for permission during this call
      // only possible when force set to true
    }

    if (statusRequest.granted) {
      // the user did grant the permission now
      return true;
    }

    // user did not grant the permission, so he must have declined the request
    return false;
  };


  public async stopScan(): Promise<void> {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }

  public prepare(): void {
    BarcodeScanner.prepare();
  };


  askUser(): void {
    this.prepare();

    const c = confirm('Do you want to scan a barcode?');

    if (c) {
      this.startScan();
    } else {
      this.stopScan();
    }
  };
}
