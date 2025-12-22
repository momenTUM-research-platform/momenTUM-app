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

/** Definition of the scheduling of a study intervention. */
export interface Alerts {
  /** ─── Mode selector ──────────────────────────────────────────────── */
  /** Choose absolute (calendar) or relative (enrollment) scheduling */
  scheduleMode: 'absolute' | 'relative';

  /** Designer-only preview: assumed enrollment date (ignored by Ionic) */
  expectedEnrollmentDate?: string;

  /** ─── Absolute scheduling ───────────────────────────────────────── */
  /** Initial notification date & time (ISO string) – absolute mode only */
  startDateTime?: string;

  /** ─── Relative scheduling ───────────────────────────────────────── */
  /** Days after enrollment for first notification – relative mode only */
  offsetDays?: number;
  /** Time of day (HH:MM) on offset day for first notification */
  offsetTime?: string;
  /** Number of additional notifications after first (relative mode) */
  repeatCount?: number;

  /** ─── Notification content ──────────────────────────────────────── */
  /** Notification title text */
  title: string;
  /** Notification message/body text */
  message: string;

  /** Extra times of day (HH:MM strings) */
  times?: string[];

  /** ─── Repeat configuration ─────────────────────────────────────── */
  /** Repeat frequency */
  repeat: 'never' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** Repeat interval count (e.g. every N days/weeks) */
  interval: number;
  /** End date for repeating notifications (YYYY-MM-DD) – absolute mode only */
  until?: string;

  /** ─── Random / Sticky / Timeout ────────────────────────────────── */
  random: boolean;
  randomInterval: number;
  sticky: boolean;
  stickyLabel: string;
  timeout: boolean;
  timeoutAfter: number;
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
  questions: (Instruction | Photo | DateTime | YesNo | Slider | Media | Multi | Text)[];
}

export interface Question {
  /** A unique identifier for the question. */
  id: string;

  /** The question. */
  text: string;

  /** The question type. */
  type:
    | 'instruction'
    | 'photo'
    | 'text'
    | 'yesno'
    | 'datetime'
    | 'multi'
    | 'media'
    | 'slider';

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

  // new field for inline validation
  errorMessage?: string;

  /** Optional semantic role, e.g. participant_id */
  role?: 'participant_id' | string;

  /** Optional pop-up message after submitting the answer. */
  post_confirm_message?: string;
}

export interface Instruction extends Question {
  type: 'instruction';
}

export interface Photo extends Question {
  type: 'photo';
}

export interface YesNo extends Question {
  type: 'yesno';
  yes_text: string;
  no_text: string;
}

export interface Text extends Question {
  type: 'text';
  subtype: 'short' | 'long' | 'numeric';
  /** Only for numeric subtype: inclusive lower bound */
  min_value?: number;
  /** Only for numeric subtype: inclusive upper bound */
  max_value?: number;
}

export interface DateTime extends Question {
  type: 'datetime';
  subtype: 'date' | 'time' | 'datetime';
}

export interface Slider extends Question {
  type: 'slider';
  min: number;
  max: number;
  hint_left: string;
  hint_right: string;
}

export interface Multi extends Question {
  type: 'multi';
  radio: boolean;
  modal: boolean;
  options: string[];
  shuffle: boolean;

  optionsChecked?: Option[];
}

export interface Media extends Question {
  type: 'media';
  subtype: 'image' | 'video' | 'audio';
  src: string;
  thumb: string;

  safethumb?: any;
  safeurl?: any;
}

export interface Option {
  text: string;
  checked: boolean;
}
