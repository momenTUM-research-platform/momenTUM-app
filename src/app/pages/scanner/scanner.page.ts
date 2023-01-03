import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { BarcodeService } from '../../services/barcode/barcode.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  constructor(
    private barcodeService: BarcodeService,
    private navController: NavController
  ) {}

  async ionViewWillEnter() {
    await this.barcodeService.checkPermission({ force: true });
    document.querySelector('body').classList.add('scanner-active');
    const result = await this.barcodeService.startScan();

    const navigationExtras: NavigationExtras = {
      state: {
        qrURL: result?.content,
      },
    };


    this.navController.navigateRoot('/', navigationExtras);
  }

  async ionViewWillLeave() {
    await this.barcodeService.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
  }
}
