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

  it('expect to call start scan', (done) => {
    service.startScan().catch((message) => {
      expect(message.toString()).toBe("Error: Not implemented on web.");
      done();
    });
  });

  it('expect to check premission if they are granted for barcode', (done) => {
    service.didUserGrantPermission().catch((message) => {
      expect(message.toString()).toBe("Error: Not implemented on web.");
      done();
    });
  });
});
