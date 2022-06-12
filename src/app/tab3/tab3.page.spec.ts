import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab3Page } from './tab3.page';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab3Page],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
