
export class Properties {
  private  study_id: string;
  private study_name: string;
  private instructions: string;
  private banner_url: string;
  private support_email: string;
  private support_url: string;
  private ethics: string;
  private pls: string;
  private empty_message: string;
  private post_url: string;
  private conditions: string[];
  private cache: boolean;


	// constructor(study_id: string, study_name: string, instructions: string, banner_url: string, support_email: string, support_url: string, ethics: string, pls: string, empty_message: string, post_url: string, conditions: string[], cache: boolean) {
	// 	this.study_id = study_id;
	// 	this.study_name = study_name;
	// 	this.instructions = instructions;
	// 	this.banner_url = banner_url;
	// 	this.support_email = support_email;
	// 	this.support_url = support_url;
	// 	this.ethics = ethics;
	// 	this.pls = pls;
	// 	this.empty_message = empty_message;
	// 	this.post_url = post_url;
	// 	this.conditions = conditions;
	// 	this.cache = cache;
	// }

  constructor(instanceData?: Properties) {
    if (instanceData) {
      this.deserialize(instanceData);
    }
  }

  private deserialize(instanceData: Properties) {
    // Note this.active will not be listed in keys since it's declared, but not defined
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData.hasOwnProperty(key)) {
        this[key] = instanceData[key];
      }
    }
  }

}
