import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateConfigService {
  constructor(private translate: TranslateService) {}

  /**
   * Get the default language of the current device.
   * @developer: In case you want to add other languages,
   * choose a language inside of this method.
   * Then add the correct translate json file in assets/i18n
   */
  getDefaultLanguage() {
    this.translate.setDefaultLang('en');
    return 'en';
  }

  /**
   * Set the current language of the device
   *
   * @param setLang The language to set
   */
  setLanguage(setLang: string) {
    this.translate.use(setLang);
  }
}
