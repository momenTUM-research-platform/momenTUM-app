import { OpenOptions } from '@capacitor/browser';
import { AlertButton, AlertInput } from '@ionic/angular';
import study_tasks from '../cypress/fixtures/study_tasks.json';

export class NavMock {
  public pop(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      instance: {
        model: 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }

  public registerChildNav(nav: any): void {
    return;
  }

  public navigateBack(url: string | any[], options: any): void {
    return;
  }
  public navigateForward(url: string | any[], options: any): void {
    return;
  }
  public navigateRoot(url: string | any[], options: any): void {
    return;
  }
}

export class BrowserMock {
  public open(options: OpenOptions): Promise<void> {
    return;
  }
}

export const Storage = {
  async get(data: { key: string }): Promise<{ value: string | undefined }> {
    return { value: undefined };
  },

  async set(data: { key: string; value: string }): Promise<void> {},
  async clear(): Promise<void> {},
};

export class ToastMock {
  public async create(options: any): Promise<void> {}
}

export class MockAlert {
  header?: string;
  subHeader?: string;
  message?: string;
  cssClass?: string | string[];
  inputs?: AlertInput[];
  buttons?: (AlertButton | string)[];
  backdropDismiss?: boolean;
  translucent?: boolean;
  animated?: boolean;
  keyboardClose?: boolean;
  id?: string;
  response: string;

  constructor(props: any) {
    Object.assign(this, props);
  }

  present() {
    return Promise.resolve();
  }

  setRespose(response: string) {
    this.response = response;
  }

  dismiss() {
    return Promise.resolve();
  }
}

export class MockAlertController {
  public created: MockAlert[];

  constructor() {
    this.created = [];
  }

  create(props: any): Promise<any> {
    const toRet = new MockAlert(props);
    this.created.push(toRet);
    return Promise.resolve(toRet);
  }

  getLast() {
    if (!this.created.length) {
      return null;
    }
    return this.created[this.created.length - 1];
  }
}
