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
      'remove',
      'clear',
      'keys'
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

  // set
  it('should test SET method for storage created', async () => {

    const key = 'Key';
    const value = 'Value';

    await service.init();
    await angularStorageSpy.set(key, value);

    const result: any = await angularStorageSpy.get(key);

    expect(angularStorageSpy.set.calls.count())
    .withContext('spy method was called once')
    .toBe(1);

    expect(result).toBe(value);
  });

  // get
  // removeItem
  // clear
  // keys
});
