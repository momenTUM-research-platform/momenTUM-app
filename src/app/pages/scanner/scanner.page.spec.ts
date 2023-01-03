import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { ScannerPage } from './scanner.page';
import { BarcodeService } from '../../services/barcode/barcode.service';

describe('ScannerPage', () => {
  let component: ScannerPage;
  let fixture: ComponentFixture<ScannerPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ScannerPage],
      imports: [IonicModule.forRoot()],
      providers: [BarcodeService, NavController],
    }).compileComponents();

    fixture = TestBed.createComponent(ScannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ionViewWillEnter', async () => {
    const barcodeService = fixture.debugElement.injector.get(BarcodeService);
    const navController = fixture.debugElement.injector.get(NavController);
    const spyCheckPremission = spyOn(
      barcodeService,
      'checkPermission'
    ).and.returnValue(Promise.resolve());

    const spyNavigationRoot = spyOn(
      navController,
      'navigateRoot'
    ).and.returnValue(Promise.resolve(true));

    const spyStartScan = spyOn(barcodeService, 'startScan').and.returnValue(
      Promise.resolve(null)
    );

    await component.ionViewWillEnter();

    expect(spyCheckPremission).toHaveBeenCalledTimes(1);
    expect(spyStartScan).toHaveBeenCalledTimes(1);
    expect(spyNavigationRoot).toHaveBeenCalledTimes(1);
  });

  it('should test ionViewWillLeave', async () => {
    const barcodeService = fixture.debugElement.injector.get(BarcodeService);

    const spystopScan = spyOn(barcodeService, 'stopScan').and.returnValue(
      Promise.resolve()
    );

    await component.ionViewWillLeave();
    expect(spystopScan).toHaveBeenCalledTimes(1);
  });
});
