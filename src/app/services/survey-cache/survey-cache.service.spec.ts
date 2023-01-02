// @ts-nocheck

import { TestBed, waitForAsync } from '@angular/core/testing';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { LoadingService } from '../loading/loading-service.service';
import { StorageService } from '../storage/storage.service';
import { SurveyCacheService } from './survey-cache.service';
import study_tasks from '../../../../cypress/fixtures/study_tasks.json';
import { BarcodeService } from '../../services/barcode/barcode.service';

describe('SurveryCacheService', () => {
  let service: SurveyCacheService;
  let StorageServiceSpy: jasmine.SpyObj<StorageService>;
  let file: File;

  beforeEach(async () => {
    const storageSpy = jasmine.createSpyObj('StorageServiceeSpy', [
      'init',
      'set',
      'get',
    ]);
    TestBed.configureTestingModule({
      providers: [
        SurveyCacheService,
        File,
        LoadingService,
        BarcodeService,
        { provide: StorageService, useValue: storageSpy },
      ],
    });

    service = TestBed.inject(SurveyCacheService);
    file = TestBed.inject(File);
    StorageServiceSpy = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should extract media urls', async () => {
    const study: Study = await JSON.parse(JSON.stringify(study_tasks.study));
    // Get media from the study
    service.getMediaURLs(study);

    // Any ideas how to properly test a function that does not return anything?
    expect(service.mediaToCache.banner)
      .withContext('check if the "banner_url" media to cache has been set')
      .toEqual(study.properties.banner_url);

    expect(Object.keys(service.mediaToCache).length)
      .withContext('check if the media count is similar to cache length')
      .toEqual(service.mediaCount);
  });

  it('should download the survey', waitForAsync(() => {
    // Need to make sure it doesn't return undefined
    const result: string = service.downloadFile(
      'https://upload.wikimedia.org/wikipedia/commons/e/e0/Farberware-Minute-Timer-White.jpg'
    );
    expect(result)
      .withContext('Just making sure I get a response')
      .toBeTruthy();
  }));

  it('should show cache all media', async () => {
    const study: Study = JSON.parse(JSON.stringify(study_tasks.study));
    StorageServiceSpy.get.and.returnValue(
      Promise.resolve(JSON.stringify(study))
    );

    await service.cacheAllMedia(study);

    // Make sure everything is in place
    expect(service.mediaToCache.banner)
      .withContext('Has banner url')
      .toBeTruthy();

    expect(service.mediaCount)
      .withContext('Has a media count')
      .toBeGreaterThan(0);

    expect(service.localMediaURLs)
      .withContext('Has local media url')
      .toBeTruthy();

    expect(service.mediaCount)
      .withContext('Has media Downloaded Count')
      .toBeGreaterThan(0);

    expect(service.mediaDownloadedCount)
      .withContext('Has downloaded media')
      .toBeGreaterThan(0);
  });

  it('should download all the media', async () => {
    // Call this method to store all the urls in the service
    const study: Study = JSON.parse(JSON.stringify(study_tasks.study));
    StorageServiceSpy.get.and.returnValue(
      Promise.resolve(JSON.stringify(study))
    );

    service.getMediaURLs(study);
    await service.downloadAllMedia();

    expect(service.localMediaURLs)
      .withContext('Has local media url')
      .toBeTruthy();

    expect(service.mediaDownloadedCount)
      .withContext('Has downloaded media')
      .toBeGreaterThan(0);
  });

  it('should check if finished', async () => {
    const study: Study = JSON.parse(JSON.stringify(study_tasks.study));
    // Sets storage key 'current-study' with a Study
    StorageServiceSpy.get.and.returnValue(
      Promise.resolve(JSON.stringify(study))
    );

    service.getMediaURLs(study);

    // Check if the media count is greater than 0
    expect(service.mediaCount)
      .withContext('Has media Downloaded Count')
      .toBeGreaterThan(0);

    await service.downloadAllMedia();

    // Check if the media count and downloaded media count is similar
    expect(service.mediaCount)
      .withContext('Making sure we have the same count')
      .toEqual(service.mediaDownloadedCount);
  });

  it('should check update Media URLs In Study', async () => {
   // To be discussed
   // Can't locate the approprate file folder path after being downloaded in browser
   // Works on android and ios (tested manually)
  });
});
