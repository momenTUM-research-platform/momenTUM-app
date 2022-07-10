import { Module } from './modules';
import { Properties } from './properties';

export class Study {
  private properties: Properties;
  private modules: Module[];


	// constructor(properties: Properties, modules: Module[]) {
	// 	this.properties = properties;
	// 	this.modules = modules;
	// }

  constructor(instanceData?: Study) {
    if (instanceData) {
      this.deserialize(instanceData);
    }
  }

  private deserialize(instanceData: Study) {
    // Note this.active will not be listed in keys since it's declared, but not defined
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData.hasOwnProperty(key)) {
        this[key] = instanceData[key];
      }
    }
  }

}
