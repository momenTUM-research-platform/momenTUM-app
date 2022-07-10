import { Questions } from './questions';
export class Sections{
  name: string;
    private shuffle: boolean;
    private questions: Questions[];

	// constructor(shuffle: boolean, questions: Questions[]) {
	// 	this.shuffle = shuffle;
	// 	this.questions = questions;
	// }

  constructor(instanceData?: Sections) {
    if (instanceData) {
      this.deserialize(instanceData);
    }
  }

  private deserialize(instanceData: Sections) {
    // Note this.active will not be listed in keys since it's declared, but not defined
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData.hasOwnProperty(key)) {
        this[key] = instanceData[key];
      }
    }
  }

}
