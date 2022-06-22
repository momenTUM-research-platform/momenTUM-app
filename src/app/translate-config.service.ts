import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateConfigService {
  constructor(private translate: TranslateService) {}

  /**
   * Get the default language of the current device
   */
  getDefaultLanguage() {
    const language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    return language;
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
