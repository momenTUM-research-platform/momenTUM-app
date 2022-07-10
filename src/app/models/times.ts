export class Times{
  private hours: number;
  private minutes: number;

	// constructor(hours: number, minutes: number) {
	// 	this.hours = hours;
	// 	this.minutes = minutes;
	// }

  constructor(instanceData?: Times) {
    if (instanceData) {
      this.deserialize(instanceData);
    }
  }

  private deserialize(instanceData: Times) {
    // Note this.active will not be listed in keys since it's declared, but not defined
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData.hasOwnProperty(key)) {
        this[key] = instanceData[key];
      }
    }
  }

}
