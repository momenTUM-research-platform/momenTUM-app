// @ts-nocheck

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
      'keys',
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

  // setting test
  it('should call the set method from storage', async () => {
    const keyValue = 'test';
    const stubValue = 'As2342fAfgsdr';

    // Making a call Through
    await angularStorageSpy.set.and.callThrough();

    await angularStorageSpy.set(keyValue, stubValue);

    expect(angularStorageSpy.set.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });

  it('should get an item from storage after setting it', async () => {
    const keyValue = 'Key';
    const stubValue = 'As2342fAfgsdr';

    // Making the return value of the get function call to be stubValue
    await angularStorageSpy.get.and.returnValue(Promise.resolve(stubValue));

    // Getting the value of key
    const response: any = await angularStorageSpy.get(keyValue);

    expect(angularStorageSpy.get.calls.count())
      .withContext('spy method was called once')
      .toBe(1);

    expect(response)
      .withContext('response was same as stubValue')
      .toBe(stubValue);
  });

  it('should get an item from storage after setting it', async () => {
    const key = 'test';
    const stubValue = 'As2342fAfgsdr';

    // Setting the item value stubValue
    await angularStorageSpy.get.and.returnValue(Promise.resolve(stubValue));

    // Getting the value of key
    const response: any = await angularStorageSpy.get(key);

    expect(angularStorageSpy.get.calls.count())
      .withContext('spy method was called once')
      .toBe(1);

    expect(response)
      .withContext('response was same as stubValue')
      .toBe(stubValue);
  });

  // removeItem
  it('should remove an Item from the storage', async () => {
    const key1 = 'Key1';
    const stubValue1 = 'As2342fAfgsdr1';

    // Setting the item value stubValue1 and stubValue2
    await angularStorageSpy.get.and.returnValue(Promise.resolve(stubValue1));

    // Getting the value of key
    const response: any = await angularStorageSpy.get(key1);

    expect(angularStorageSpy.get.calls.count())
      .withContext('spy method get was called once')
      .toBe(1);

    expect(response)
      .withContext('response was same as stubValue')
      .toBe(stubValue1);

    // Making a remove response undefined
    await angularStorageSpy.remove.and.returnValue(Promise.resolve(undefined));

    // Calling the remove function on the key
    const removed_response: any = await angularStorageSpy.remove(key1);

    // Making sure the get returns the same value as the remove, because the remove returns undefined after removing
    await angularStorageSpy.get.and.returnValue(
      Promise.resolve(removed_response)
    );

    // Getting the value of key
    const response1: any = await angularStorageSpy.get(key1);

    expect(angularStorageSpy.remove.calls.count())
      .withContext('spy method remove was called once')
      .toBe(1);

    expect(response1)
      .withContext('response was same as stubValue')
      .toBe(removed_response);
  });
  // clear
  it('should clear all the data in the storage', async () => {
    const keyValue = 'Key';
    const stubValue = 'As2342fAfgsdr';

    // Setting the item value stubValue
    await angularStorageSpy.get.and.returnValue(Promise.resolve(stubValue));

    // Getting the value of key
    const response: any = await angularStorageSpy.get(keyValue);

    expect(angularStorageSpy.get.calls.count())
      .withContext('spy method get was called once')
      .toBe(1);

    expect(response)
      .withContext('response was same as stubValue')
      .toBe(stubValue);

    // Calling the clear from the spy function
    await angularStorageSpy.clear.and.returnValue(Promise.resolve());

    // Getting the value of key
    const cleared_response: any = await angularStorageSpy.clear();

    expect(angularStorageSpy.clear.calls.count())
      .withContext('spy method clear was called once')
      .toBe(1);

    expect(cleared_response)
      .withContext('response was same as undefined')
      .toBe(undefined);
  });

  // keys
  it('should get all the keys', async () => {
    const keys: string[] = ['test', 'keys'];
    // Setting the item value stubValue
    await angularStorageSpy.keys.and.returnValue(Promise.resolve(keys));

    // Getting the value of key
    const response: any = await angularStorageSpy.keys();

    expect(angularStorageSpy.keys.calls.count())
      .withContext('spy method was called once')
      .toBe(1);

    expect(response).withContext('response was same as stubValue').toBe(keys);
  });
});
