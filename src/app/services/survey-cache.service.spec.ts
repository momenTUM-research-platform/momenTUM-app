// @ts-nocheck

import { TestBed, waitForAsync } from '@angular/core/testing';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { LoadingService } from './loading-service.service';
import { Storage } from '@ionic/storage-angular';

import { SurveyCacheService } from './survey-cache.service';
import { FileTransferMock } from '@ionic-native-mocks/file-transfer';
import { FileMock } from '@ionic-native-mocks/file';

describe('FileDownloaderService', () => {
  let service: SurveyCacheService;
  let storageIonicMock: Storage;
  let file: File;
  let fileTransfer: FileTransfer;

  /**
   * private fileTransfer: FileTransfer,
   * private file: File,
   * private storage: Storage,
   * private loadingService: LoadingService
   */

  // beforeEach(async () => {
  //   TestBed.configureTestingModule({
  //     //imports: [FileTransferMock, FileMock],
  //     providers: [
  //       SurveyCacheService,
  //       Storage,
  //       { provide: File, useValue: FileMock },
  //       { provide: FileTransfer, useValue: FileTransferMock },
  //       LoadingService,
  //     ],
  //   });

  //   service = TestBed.inject(SurveyCacheService);
  //   file = TestBed.inject(FileTransferMock);
  //   fileTransfer = TestBed.inject(FileMock);
  // });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      //imports: [FileTransferMock, FileMock],
      providers: [
        SurveyCacheService,
        Storage,
        File,
        FileTransfer,
        LoadingService,
      ],
    });

    service = TestBed.inject(SurveyCacheService);
    file = TestBed.inject(File);
    fileTransfer = TestBed.inject(FileTransfer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should extract media urls', () => {
    const study = {
      properties: {
        banner_url: 'https://www.google.com/',
      },
      modules: [
        {
          sections: [
            {
              questions: [
                {
                  type: 'media',
                  src: 'https://this.leads.nowhere.com/media/1.mp4',
                },
              ],
            },
          ],
        },
      ],
    };
    // Any ideas how to properly test a function that does not return anything?
    expect(service.getMediaURLs(study)).toBeUndefined();
  });
  it('should download the survey', waitForAsync(() => {
    service
      .downloadFile('https://tuspl22-momentum.srv.mwn.de/api/surveys/demo.json')
      .then((file) => {
        console.log(file);
        expect(file).toContain("'name': 'demo'");
      })
      .catch((error) => {
        console.log(error);
      });
  }));
});
