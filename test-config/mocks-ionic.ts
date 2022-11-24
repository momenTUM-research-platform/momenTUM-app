import { OpenOptions } from "@capacitor/browser";
import study_tasks from '../cypress/fixtures/study_tasks.json';

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

export class StudyTaskServiceMock{
  private data: Task[];

  getAllTasks() {
    const todos = JSON.parse(JSON.stringify(study_tasks.tasks));
    this.data = todos;
    return this;
  }

  then(callback) {
    callback(this.data);
  }
}
