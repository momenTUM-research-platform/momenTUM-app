import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let angularStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    const spyStorage = jasmine.createSpyObj('Storage', [
      'create',
      'get',
      'set',
    ]);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Storage,
          useValue: spyStorage,
        },
      ],
    });
    service = TestBed.inject(StorageService);

    angularStorageSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //   set
  it('should test SET method for storage created', async () => {
    const _storage: Storage = await angularStorageSpy.create();
    const key: string = 'Key';
    const value: string = 'Value';
    await service.set(key, value);
    const result: any = await service.get(key);
    expect(result).toBe(value);
  });

  // get
  // removeItem
  // clear
  // keys
});
