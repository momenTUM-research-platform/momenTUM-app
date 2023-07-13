import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading = false;
  isCaching = false;

  constructor(public loadingController: LoadingController) {}

  /**
   * Displays the loading dialog
   *
   * @param msg The message to display in the loading dialog
   */
  async present(msg: string) {
    const loading = await this.loadingController.create({
      message: msg,
      spinner: 'crescent',
      duration: 7000,
    });

    loading.present();
  }

  /**
   * Dismisses the loading dialog
   */
  async dismiss() {
    const loader = await this.loadingController.getTop();
    if (loader) {
      await loader.dismiss();
    }
  }
}
