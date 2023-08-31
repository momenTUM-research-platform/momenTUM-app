import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor() {}

  async deletePhoto(question: any) {
    if (question.model) {
      try {
        await Filesystem.deleteFile({
          path: question.model,
          directory: Directory.Data,
        });
        question.model = null;
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
    }
  }

  async takePhoto() {
    try {
      const photo: Photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 90,
      });

      // Save photo file to a specific directory
      const savedPhoto = await this.savePhotoFile(photo);
      return savedPhoto;
    } catch (error) {
      console.error('Error taking photo:', error);
      return null;
    }
  }




  async savePhotoFile(photo: Photo) {
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: photo.base64String,
      directory: Directory.Data,
    });
    return savedFile;
  }


  async getPhotoAsBlobString(photoFile: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(photoFile);
    });
  }

  async createImageFromBlobString(
    blobString: string
  ): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = blobString;
    });
  }
}
