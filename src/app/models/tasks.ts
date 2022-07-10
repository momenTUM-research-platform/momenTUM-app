import { Responses } from './responses';
export class Tasks{
  private uuid: string;
  private index: number;
  private task_id: number;
  private name: string;
  private type: string;
  private hidden: boolean;
  private unlock_after: string[];
  private sticky: boolean;
  private sticky_label: string;
  private alert_title: string;
  private alert_time?: string;
  private response_time?: string;
  private response_time_ms?: number;
  private alert_message: string;
  private timeout: boolean;
  private timeout_after: number;
  private responses?: Responses;
  private time: string;
  private locale: string;
  private completed: boolean;

	// constructor(uuid: string, index: number, task_id: number, name: string, type: string, hidden: boolean, unlock_after: string[], sticky: boolean, sticky_label: string, alert_title: string, alert_message: string, timeout: boolean, timeout_after: number, time: string, locale: string, completed: boolean) {
	// 	this.uuid = uuid;
	// 	this.index = index;
	// 	this.task_id = task_id;
	// 	this.name = name;
	// 	this.type = type;
	// 	this.hidden = hidden;
	// 	this.unlock_after = unlock_after;
	// 	this.sticky = sticky;
	// 	this.sticky_label = sticky_label;
	// 	this.alert_title = alert_title;
	// 	this.alert_message = alert_message;
	// 	this.timeout = timeout;
	// 	this.timeout_after = timeout_after;
	// 	this.time = time;
	// 	this.locale = locale;
	// 	this.completed = completed;
	// }
  constructor(instanceData?: Tasks) {
    if (instanceData) {
      this.deserialize(instanceData);
    }
  }


  private deserialize(instanceData: Tasks) {
    // Note this.active will not be listed in keys since it's declared, but not defined
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData.hasOwnProperty(key)) {
        this[key] = instanceData[key];
      }
    }
  }

}
