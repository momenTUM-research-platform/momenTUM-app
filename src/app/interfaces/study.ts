export interface Study {
  properties: Properties;
  modules: Module[];
}

export interface Properties {
  study_id: string;
  study_name: string;
  instructions: string;
  banner_url: string;
  support_email: string;
  support_url: string;
  ethics: string;
  pls: string;
  created_by: string;
  empty_msg: string;
  post_url: string;
  conditions: string[];
  cache: boolean;
}

export interface Module {
  name: string;
  condition: string;
  alerts: Alerts;
  graph: Graph;
  id: string;
  unlock_after: string[];
  body: Survey | Pvt;
}

export interface Alerts {
  title: string;
  message: string;
  start_offset: number;
  duration: number;
  times: Time[];
  random: boolean;
  random_interval: number;
  sticky: boolean;
  sticky_label: string;
  timeout: boolean;
  timeout_after: number;
}

export interface Graph {
  display: boolean;
  variable: string;
  title: string;
  blurb: string;
  type: 'bar' | 'line';
  max_points: number;
}

export interface Time {
  hours: number;
  minutes: number;
}

export interface Pvt {
  type: 'pvt';
  trials: number;
  min_waiting: number;
  max_waiting: number;
  show: boolean;
  max_reaction: number;
  exit: boolean;
}

export interface Survey {
  type: 'survey';
  shuffle: boolean;
  sections: Section[];
  submit_text: string;
}

export interface Section {
  id: string;
  name: string;
  shuffle: boolean;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  body:
    | Instruction
    | DateTime
    | Multi
    | Text
    | Slider
    | Media
    | YesNo
    | External
    | File;
  required: boolean;
  hide_id: string;
  hide_value: string;
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
