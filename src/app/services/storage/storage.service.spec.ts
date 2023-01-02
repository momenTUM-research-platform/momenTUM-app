import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let angularStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Storage,
          useValue: new Storage(),
        },
      ],
    });

    service = TestBed.inject(StorageService);
    angularStorageSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call init', async () => {
    const spyCreate = spyOn(angularStorageSpy, 'create').and.callThrough();

    //init storage
    await service.init();

    expect(spyCreate)
      .withContext('spy method was called once')
      .toHaveBeenCalledTimes(1);
  });

  it('should call the set method from storage', async () => {
    const keyValue = 'test';
    const stubValue = 'As2342fAfgsdr';
    await service.init();

    // Making a set return
    const spy = spyOn(angularStorageSpy, 'set').and.returnValue(
      Promise.resolve()
    );

    await service.set(keyValue, stubValue);

    expect(spy)
      .withContext('spy method was called once')
      .toHaveBeenCalledTimes(1);
  });

  it('should get an item from storage after setting it', async () => {
    const keyValue = 'Key';
    const stubValue = 'As2342fAfgsdr';
    await service.init();

    // Making the return value of the get function call to be stubValue
    const spy = spyOn(angularStorageSpy, 'get').and.returnValue(
      Promise.resolve(stubValue)
    );

    // Getting the value of key
    const response: any = await service.get(keyValue);

    expect(spy)
      .withContext('spy method was called once')
      .toHaveBeenCalledTimes(1);

    expect(response)
      .withContext('response was same as stubValue')
      .toBe(stubValue);
  });

  // removeItem
  it('should remove an Item from the storage', async () => {
    await service.init();
    // Making a remove response undefined
    const spy = spyOn(angularStorageSpy, 'remove').and.returnValue(
      Promise.resolve(undefined)
    );

    // Calling the remove function on the key
    await service.removeItem(undefined);

    expect(spy)
      .withContext('spy method was called once')
      .toHaveBeenCalledTimes(1);
  });
  // clear
  it('should clear all the data in the storage', async () => {
    await service.init();
    // Calling the clear from the spy function
    const spy = spyOn(angularStorageSpy, 'clear').and.returnValue(
      Promise.resolve()
    );
    // Getting the value of key
    await service.clear();

    expect(spy)
      .withContext('spy method was called once')
      .toHaveBeenCalledTimes(1);
  });

  // keys
  it('should get all the keys', async () => {
    const keys: string[] = ['test', 'keys'];
    await service.init();
    // Setting the item value stubValue
    const spy = spyOn(angularStorageSpy, 'keys').and.returnValue(
      Promise.resolve(keys)
    );
    // Getting the value of key
    const response: any = await service.keys();

    expect(spy)
      .withContext('spy method was called once')
      .toHaveBeenCalledTimes(1);

    expect(response).withContext('response was same as stubValue').toBe(keys);
  });
});
