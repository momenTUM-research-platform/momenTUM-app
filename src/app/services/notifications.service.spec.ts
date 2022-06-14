import { TestBed } from '@angular/core/testing';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

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
});
