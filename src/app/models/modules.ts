import { Alerts } from './alerts';
import { Graphs } from './graph';
import { Sections } from './sections';


export class Module {

  private type: string;
  private name: string;
  private submit_text: string;
  private condition: string;
  private alerts: Alerts;
  private graph: Graphs;
  private sections: Sections[];
  private uuid: string;
  private unlock_after: string[];
  private shuffle: boolean;


	// constructor(type: string, name: string, submit_text: string, condition: string, alerts: Alerts, graph: Graphs, sections: Sections[], uuid: string, unlock_after: string[], shuffle: boolean) {
	// 	this.type = type;
	// 	this.name = name;
	// 	this.submit_text = submit_text;
	// 	this.condition = condition;
	// 	this.alerts = alerts;
	// 	this.graph = graph;
	// 	this.sections = sections;
	// 	this.uuid = uuid;
	// 	this.unlock_after = unlock_after;
	// 	this.shuffle = shuffle;
	// }

  constructor(instanceData?: Module) {
    if (instanceData) {
      this.deserialize(instanceData);
    }
  }

  private deserialize(instanceData: Module) {
    // Note this.active will not be listed in keys since it's declared, but not defined
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData.hasOwnProperty(key)) {
        this[key] = instanceData[key];
      }
    }
  }


}
