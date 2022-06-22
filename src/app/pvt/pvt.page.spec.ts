import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PvtPage } from './pvt.page';
import { RouterTestingModule } from '@angular/router/testing';

import { ChildrenOutletContexts } from '@angular/router';

import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PvtPage', () => {
  let component: PvtPage;
  let fixture: ComponentFixture<PvtPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PvtPage ],
      imports: [
        RouterTestingModule,
        IonicModule.forRoot(),

      ],
      providers: [
        Storage,
        HttpClient,
        HttpHandler,
        HTTP,
        ChildrenOutletContexts,
      ],
    }).compileComponents();


    fixture = TestBed.createComponent(PvtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
