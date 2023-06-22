/**
 * Definition of a valid study
 */
export interface Study {
  /** General information about the study. */
  properties: Properties;

  /** A list of module descriptions */
  modules: Module[];
}

/**
 * Definition of study properties.
 * */
export interface Properties {
  /** The unique identifier for the study. */
  study_id: string;

  /** Name of the study. */
  study_name: string;

  /** Short description of this study */
  instructions: string;

  /** Banner image for the study. */
  banner_url: string;

  /** Support contact email for participants. */
  support_email: string;

  /** Support URL for participants. */
  support_url: string;

  /** Short ethics information. */
  ethics: string;

  /** A URL pointing to the plain language statement. */
  pls: string;

  /** The creator of this study. */
  created_by: string;

  /** A message to the participant when there are currently no tasks. */
  empty_msg: string;

  /** The base URL of the server. */
  post_url: string;

  /** A list of conditions in which participants should be randomized in. */
  conditions: string[];

  /** A value indicating whether or not media from surveys should be cached. */
  cache: boolean;
}

/**
 * Definition of an intervention module.
 */
export interface Module {
  /** A unique identifier for this module */
  id: string;

  /** The name of this module */
  name: string;

  /** The condition that the participant needs to be in in order to participate in this module. */
  condition: string;

  /** An object containing information about the scheduling of this module (intervention). */
  alerts: Alerts;

  /** An object containing information about the progress chart of this module. */
  graph: Graph;

  /** A list of module ID's, which indicate the tasks that need to be completed before any scheduled instance at the current day of this module will unlock. */
  unlock_after: string[];

  /** An object containing information about the content of this module. */
  params: Survey | Pvt;
}

/**
 * Definition of the scheduling of a study intervention.
 */
export interface Alerts {
  /** The title of the notifications of this module. */
  title: string;

  /** The message in the notifications of this module. */
  message: string;

  /**
   * The number of days after which this the tasks should start being scheduled for this module.
   * 0 means they will be scheduled for the day of enrolment.
   */
  start_offset: number;

  /** The total number of days that the tasks should be scheduled for this module. */
  duration: number;

  /** A list of hours-minutes pairs which define the time of the day at which an intervention for this module will be scheduled. */
  times: Time[];

  /** Indicates whether the time of every intervention should be chosen randomly. */
  random: boolean;

  /** Defines a random interval in minutes for the randomization of the scheduling of tasks. */
  random_interval: number;

  /** Indicates whether the tasks should stay or disappear after being completed. */
  sticky: boolean;

  /** Defines a group name under which the tasks of this module should be grouped. */
  sticky_label: string;

  /** Indicates whether every task of this module should disappear after a specified amount of time. */
  timeout: boolean;

  /** Defines the amount of time after which every task of this module should disappear, in milliseconds. */
  timeout_after: number;
}

/** Definition of a progress graph that will be displayed for each module in the progress page. */
export interface Graph {
  /** Indicates wether a graph should be displayed for the module. */
  display: boolean;

  /** The question ID of a question whose response will be tracked for each task of the respective module. */
  variable: string;

  /** A title for the graph. */
  title: string;

  /** A brief description of the graph. */
  blurb: string;

  /** The type of the graph. */
  type: 'bar' | 'line';

  /** The maximum number of data points that will be displayed. */
  max_points: number;
}

/** Definition of a point in time (during a day) */
export interface Time {
  hours: number;
  minutes: number;
}

/**
 * Definition of the PVT parameters
 */
export interface Pvt {
  /** The type of these parameters */
  type: 'pvt';

  /** The total valid reaction time measurements that will be taken. */
  trials: number;

  /** The minimum time that can pass before the visual stimulus appears. */
  min_waiting: number;

  /** The maximum time that can pass before the visual stimulus appears. */
  max_waiting: number;

  /** Indicates, whether a list of results will be shown to the participant after the PVT. */
  show: boolean;

  /** Minimum time for a lapse. */
  max_reaction: number;

  /** Indicates whether the participant should be able to exit the PVT early. */
  exit: boolean;
}

/**
 * Definition of the Survey parameters.
 */
export interface Survey {
  /** The type of these parameters. */
  type: 'survey';

  /** Indicates whether survey sections should be randomly shuffled. */
  shuffle: boolean;

  /** The sections of this survey. */
  sections: Section[];

  /** A short text that should appear on the submit button. */
  submit_text: string;
}

export interface Section {
  /** A unique identifier for the section. */
  id: string;

  /** A name for this section. */
  name: string;

  /** Indicates, whether the questions in this section should be shuffled randomly. */
  shuffle: boolean;

  /** The questions in this section. */
  questions: Question[];
}

export interface Question {
  /** A unique identifier for the question. */
  id: string;

  /** The question. */
  text: string;

  /** Parameters for this question. */
  type:
    | Instruction
    | DateTime
    | Multi
    | Text
    | Slider
    | Media
    | YesNo
    | External
    | File;

  /** Indicates whether the question can be left unanswered. */
  required: boolean;

  /** The question ID to which a branching logic mechanism will apply. */
  hide_id: string;

  /** The response of the question whose ID was given in hide_id, that decides the visibility of this question. */
  hide_value: string;

  /** Indicates whether this question should become visible if the response (of the question with the id hide_id) equals the value in hide_value or invisible. */
  hide_if: boolean;
  rand_group?: string;

  hidden?: boolean;
  hideError?: boolean;
  model?: any;
  noToggle?: boolean;
  response?: any;
  value?: any;
}

export interface Instruction {
  type: 'instruction';
}

export interface YesNo {
  type: 'yesno';
  yes_text: string;
  no_text: string;
}

export interface Text {
  type: 'text';
  subtype: 'short' | 'long' | 'numeric';
}

export interface DateTime {
  type: 'datetime';
  subtype: 'date' | 'time' | 'datetime';
}

export interface Slider {
  type: 'slider';
  min: number;
  max: number;
  hint_left: string;
  hint_right: string;
}

export interface Multi {
  type: 'multi';
  radio: boolean;
  modal: boolean;
  options: string[];
  shuffle: boolean;

  optionsChecked?: Option[];
}

export interface File {
  type: 'file';
  src: string;
  file_name: string;
}

export interface Media {
  type: 'media';
  subtype: 'image' | 'video' | 'audio';
  src: string;
  thumb: string;

  safethumb?: any;
  safeurl?: any;
}

export interface External {
  type: 'external';
  src: string;

  safeurl?: any;
}

export interface Option {
  text: string;
  checked: boolean;
}
