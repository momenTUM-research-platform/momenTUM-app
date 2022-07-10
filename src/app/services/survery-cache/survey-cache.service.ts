import { Injectable } from '@angular/core';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { LoadingService } from '../loading/loading-service.service';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SurveyCacheService {
  win: any = window;

  mediaToCache: object = {};
  videoThumbnailsToCache: object = {};
  localMediaURLs: object = {};
  localThumbnailURLs: object = {};
  mediaCount = 0;
  mediaDownloadedCount = 0;

  constructor(
    private fileTransfer: FileTransfer,
    private file: File,
    private storage: Storage,
    private loadingService: LoadingService
  ) {}

  /**
   * Downloads a remote file and converts it to a local URL
   *
   * @param url Remote URL to a media file
   */
  async downloadFile(url: string): Promise<string> {
    try {
      const transfer: FileTransferObject = this.fileTransfer.create();

      // get the fileName from the URL
      const urlSplit = url.split('/');
      const fileName = urlSplit[urlSplit.length - 1];
      console.log('fileName: ' + fileName);
      const file: FileEntry = await transfer.download(
        url,
        this.file.dataDirectory + fileName,
        true
      );
      console.log('file: ' + file);
      return file.toURL();
    } catch (error) {
      console.log('error: ' + error);
      return '';
    }
  }

  /**
   * Gets all of the remote URLs from the media elements in this study
   *
   * @param study The study protocol
   */
  getMediaURLs(study) {
    // get banner url
    // @ts-ignore
    this.mediaToCache.banner = study.properties.banner_url;

    // get urls from media elements
    for (const module of study.modules) {
      for (const section of module.sections) {
        const mediaQuestions = section.questions.filter(
          (question) => question.type === 'media'
        );
        for (const question of mediaQuestions)
          {this.mediaToCache[question.id] = question.src;}
      }
    }
    // set mediaCount to be number of media items
    this.mediaCount = Object.keys(this.mediaToCache).length;
  }

  /**
   * Gets all of the media URLs from the study protocol and downloads the files
   *
   * @param study The study protocol
   */
  cacheAllMedia(study) {
    this.mediaCount = 0;
    this.mediaDownloadedCount = 0;
    // map media question ids to their urls
    this.getMediaURLs(study);
    this.downloadAllMedia();
  }

  /**
   * Downloads all of the media items from the remote URLs
   */
  downloadAllMedia() {
    // download all media items
    const keys = Object.keys(this.mediaToCache);
    for (let i = 0; i < keys.length; i++) {
      this.downloadFile(this.mediaToCache[keys[i]]).then((entryURL) => {
        this.localMediaURLs[keys[i]] =
          this.win.Ionic.WebView.convertFileSrc(entryURL);
        this.mediaDownloadedCount = this.mediaDownloadedCount + 1;
        this.checkIfFinished();
      });
    }
  }

  /**
   * Checks if all of the media has been downloaded, if so update the protocol
   */
  checkIfFinished() {
    if (this.mediaDownloadedCount === this.mediaCount)
      {this.updateMediaURLsInStudy();}
  }

  /**
   * Replaces the remote URLs for media items with the local URLs
   */
  updateMediaURLsInStudy() {
    this.storage.get('current-study').then((studyString) => {
      try {
        const studyObject = JSON.parse(studyString);
        // update the banner url first
        // @ts-ignore
        studyObject.properties.banner_url = this.localMediaURLs.banner;

        // update the other media items to the corresponding local URL
        // get urls from media elements
        for (const module of studyObject.modules)
          {for (const section of module)
            {for (const question of section) {
              if (question.id in this.localMediaURLs)
                {question.src = this.localMediaURLs[question.id];}
              if (question.subtype === 'video')
                { // @ts-ignore
                  question.thumb = this.localMediaURLs.banner;}
            }}}

        // update the study protocol in storage
        this.storage.set('current-study', JSON.stringify(studyObject));
      } catch (e) {
        console.log('error: ' + e);
      }

      // dismiss the loading spinner
      if (this.loadingService) {
        // Added this condition
        this.loadingService.dismiss();
      }
    });
  }
}
