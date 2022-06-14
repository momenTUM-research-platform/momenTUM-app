import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading: boolean = false;
  isCaching: boolean = false;

  constructor(public loadingController: LoadingController) {}

  /**
   * Displays the loading dialog
   * @param msg The message to display in the loading dialog
   */
  async present(msg: string) {
    this.isLoading = true;
    return await this.loadingController
      .create({
        message: msg,
        spinner: 'crescent',
        duration: 7000,
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  /**
   * Dismisses the loading dialog
   */
  async dismiss() {
    this.isLoading = false; // Seems unnecessary as dismiss() only runs if isLoading is false
    this.isCaching = false;
    const loader = await this.loadingController.getTop();
    if (loader) {
      // Added this condition
      return loader.dismiss();
    } else {
      return;
    }
  }
}
