export class Questions{
  private id: string;
  private text: string;
  type:  'instruction'
    | 'datetime'
    | 'multi'
    | 'text'
    | 'slider'
    | 'media'
    | 'yesno'
    | 'external';
  private required: boolean;
  private rand_group: string;

  // find out whats really needed
  private noToggle?: boolean;
  private response?: number | string | [];
  private hideSwitch?: boolean;
  private model?: string | number;
  private hideError?: boolean;
  private value?: number;

  // constructor(id: string, text: string, required: boolean, rand_group: string) {
	// 	this.id = id;
	// 	this.text = text;
	// 	this.required = required;
	// 	this.rand_group = rand_group;
	// }

  constructor(instanceData?: Questions) {
    if (instanceData) {
      this.deserialize(instanceData);
    }
  }

  private deserialize(instanceData: Questions) {
    // Note this.active will not be listed in keys since it's declared, but not defined
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData.hasOwnProperty(key)) {
        this[key] = instanceData[key];
      }
    }
  }

}
