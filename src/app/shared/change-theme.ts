export class ChangeTheme {
  public static preferenceColor: string;

  static initializeTheme() {
    this.setTheme(localStorage.preferenceTheme === 'dark');
  }

  static setTheme(darkColor: boolean) {
    if (darkColor) {
      this.preferenceColor = 'dark';
    } else {
      this.preferenceColor = 'light';
    }

    document.body.setAttribute('color-theme', this.preferenceColor);
    localStorage.preferenceTheme = this.preferenceColor;
  }

  static getDarkTheme() {
    return this.preferenceColor;
  }
}
