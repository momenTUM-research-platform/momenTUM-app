export class Graphs{
  private display: boolean;
  private variable: string;
  private title: string;
  private blurb: string;
  private type: string;
  private max_points: number;

	// constructor(display: boolean, variable: string, title: string, blurb: string, max_points: number) {
	// 	this.display = display;
	// 	this.variable = variable;
	// 	this.title = title;
	// 	this.blurb = blurb;
	// 	this.max_points = max_points;
	// }

  constructor(instanceData?: Graphs) {
    if (instanceData) {
      this.deserialize(instanceData);
    }
  }

  private deserialize(instanceData: Graphs) {
    // Note this.active will not be listed in keys since it's declared, but not defined
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData.hasOwnProperty(key)) {
        this[key] = instanceData[key];
      }
    }
  }

}
