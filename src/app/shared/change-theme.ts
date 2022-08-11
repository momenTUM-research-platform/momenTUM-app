export class ChangeTheme {
  public static preferenceColor: string;

  static initializeTheme() {
    this.setTheme(localStorage.preferenceTheme === 'dark');
  }

  static setTheme(darkColor: boolean) {
    this.preferenceColor = darkColor ? 'dark' : 'light';

    document.body.setAttribute('color-theme', this.preferenceColor);
    localStorage.preferenceTheme = this.preferenceColor;
  }
  static getTheme() {
    return this.preferenceColor;
  }
}
