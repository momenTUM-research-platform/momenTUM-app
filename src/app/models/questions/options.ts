export class Options{
  private text: string;
  private checked: boolean;

	// constructor(text: string, checked: boolean) {
	// 	this.text = text;
	// 	this.checked = checked;
	// }

  constructor(instanceData?: Options) {
    if (instanceData) {
      this.deserialize(instanceData);
    }
  }

  private deserialize(instanceData: Options) {
    // Note this.active will not be listed in keys since it's declared, but not defined
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData.hasOwnProperty(key)) {
        this[key] = instanceData[key];
      }
    }
  }

}
