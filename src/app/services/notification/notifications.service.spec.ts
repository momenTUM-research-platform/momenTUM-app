import { TestBed } from '@angular/core/testing';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

import { NotificationsService } from './notifications.service';
import { Storage } from '@ionic/storage-angular';


describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LocalNotifications, Storage] });
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('expect to schedule Dummy Notification', () => {
  //   expect(service.scheduleDummyNotification()).toBeTruthy();
  // });

  // it('expect to cancel all notifications', () => {
  //   expect(service.cancelAllNotifications()).toBeTruthy();
  // });

  // it('expect to set next 30 notifications', () => {
  //   expect(service.setNext30Notifications()).toBeTruthy();
  // });


});
