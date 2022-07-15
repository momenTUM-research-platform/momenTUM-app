import { OnInit, OnDestroy } from '@angular/core';
import { isBoolean } from 'util';

export class ChangeTheme {

    public static preferenceColor: string;

    constructor() { }

    static initializeTheme() {
        this.preferenceColor = localStorage.preferenceTheme;
        this.setDarkTheme (this.preferenceColor === 'dark');
    }

    static setTheme (darkColor) {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
        systemDark.addListener(this.colorTest);

        if (darkColor) {
            this.preferenceColor = 'dark';
        } else {
            this.preferenceColor = 'light';
        }

        document.body.setAttribute('color-theme', this.preferenceColor);
        localStorage.preferenceTheme = this.preferenceColor;
    }

    static getTheme(){
      return this.preferenceColor;
    }

    private static colorTest(systemInitiatedDark) {
        if (systemInitiatedDark.matches) {
            console.log('test data-theme', 'dark');
            document.body.setAttribute('color-theme', 'dark');
        } else {
            console.log('test data-theme', 'light');
            document.body.setAttribute('color-theme', 'light');
        }
    }
}
