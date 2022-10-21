// @ts-nocheck

import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading-service.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('expect to generate a message', () => {
    expect(service.present('test message')).toBeTruthy();
  });

  it('expect to dismiss a message', () => {
    expect(service.dismiss()).toBeTruthy();
  });
});
