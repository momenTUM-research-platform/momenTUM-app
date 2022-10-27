import { TestBed } from '@angular/core/testing';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { BarcodeService } from './barcode.service';

describe('BarcodeService', () => {
  let service: BarcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('expect to call start scan', () => {
  //   expect(service.startScan()).toBeTruthy();
  // });

  // it('expect to call prepare for barcode scanner', () => {
  //   expect(service.prepare()).toBeTruthy();
  // });

  // it('expect to call ask users before scan', () => {
  //   expect(service.askUser()).toBeTruthy();
  // });

  // it('expect to check premission if they are granted for barcode', () => {
  //   expect(service.didUserGrantPermission()).toBeTruthy();
  // });
});
