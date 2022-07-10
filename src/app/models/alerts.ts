import { Times } from './times';
export class Alerts{
  private title: string;
  private message: string;
  private start_offset: number;
  private duration: number;
  private times: Times[];
  private random: boolean;
  private random_interval: number;
  private sticky: boolean;
  private sticky_label: string;
  private timeout: boolean;
  private timeout_after: number;


	// constructor(title: string, message: string, start_offset: number, duration: number, times: Times[], random: boolean, random_interval: number, sticky: boolean, sticky_label: string, timeout: boolean, timeout_after: number) {
	// 	this.title = title;
	// 	this.message = message;
	// 	this.start_offset = start_offset;
	// 	this.duration = duration;
	// 	this.times = times;
	// 	this.random = random;
	// 	this.random_interval = random_interval;
	// 	this.sticky = sticky;
	// 	this.sticky_label = sticky_label;
	// 	this.timeout = timeout;
	// 	this.timeout_after = timeout_after;
	// }

  constructor(instanceData?: Alerts) {
    if (instanceData) {
      this.deserialize(instanceData);
    }
  }

  private deserialize(instanceData: Alerts) {
    // Note this.active will not be listed in keys since it's declared, but not defined
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData.hasOwnProperty(key)) {
        this[key] = instanceData[key];
      }
    }
  }

}
