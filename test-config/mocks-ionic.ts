import { OpenOptions } from '@capacitor/browser';
import {
  AlertButton,
  AlertInput,
  RefresherCustomEvent,
  RefresherEventDetail,
} from '@ionic/angular';

export class NavMock {
  public pop(): any {
    return Promise.resolve();
  }

  public push(): any {
    return Promise.resolve();
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

export class MockRefresher implements RefresherCustomEvent {
  public bubbles: boolean;
  public cancelBubble: boolean;
  public cancelable: boolean;
  public composed: boolean;
  public currentTarget: EventTarget;
  public defaultPrevented: boolean;
  public eventPhase: number;
  public isTrusted: boolean;
  public returnValue: boolean;
  public srcElement: EventTarget;
  public timeStamp: number;
  public type: string;
  public AT_TARGET: number;
  public BUBBLING_PHASE: number;
  public CAPTURING_PHASE: number;
  public NONE: number;

  detail: RefresherEventDetail = {
    complete: () => {},
  };
  target: HTMLIonRefresherElement;

  constructor(target: HTMLIonRefresherElement) {
    this.target = target;
  }
  initCustomEvent(
    type: string,
    bubbles?: boolean,
    cancelable?: boolean,
    detail?: any
  ): void {
    throw new Error('Method not implemented.');
  }

  composedPath(): EventTarget[] {
    throw new Error('Method not implemented.');
  }
  initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void {
    throw new Error('Method not implemented.');
  }
  preventDefault(): void {
    throw new Error('Method not implemented.');
  }
  stopImmediatePropagation(): void {
    throw new Error('Method not implemented.');
  }
  stopPropagation(): void {
    throw new Error('Method not implemented.');
  }
}
