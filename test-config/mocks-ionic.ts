import { OpenOptions } from "@capacitor/browser";

export class NavMock {
  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function(resolve: Function): void {
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

export class BrowserMock{
  public open(options: OpenOptions): Promise<void>{
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
  public async create(options: any): Promise<void> {};
};
