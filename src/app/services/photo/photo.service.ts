import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';


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
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 90,
      });

      return  photo;
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


}
