import { TestBed } from '@angular/core/testing';

import { SurveyCacheService } from './survey-cache.service';

describe('FileDownloaderService', () => {
 


  let service: SurveyCacheService;
  let storageIonicMock: Storage;
  /**
     * private fileTransfer: FileTransfer,
     * private file: File,
     * private storage: Storage,
     * private loadingService: LoadingService
     */


  beforeEach(() => {
    

    TestBed.configureTestingModule({
      imports: [Storage],
      providers: [SurveyCacheService]
    });
    service = TestBed.inject(SurveyCacheService);
    storageIonicMock = TestBed.inject(Storage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



});
