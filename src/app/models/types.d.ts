declare interface Study {
  properties: Properties;
  modules: Module[];
}

declare interface Properties {
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

declare interface Alerts {
  title: string;
  message: string;
  start_offset: number;
  duration: number;
  times: {
    hours: number;
    minutes: number;
  }[];
  random: boolean;
  random_interval: number;
  sticky: boolean;
  sticky_label: string;
  timeout: boolean;
  timeout_after: number;
}

declare interface Module {
  name: string;
  condition: string;
  alerts: Alerts;
  graph: {
    display: boolean;
    variable: string;
    title: string;
    blurb: string;
    type: 'bar' | 'line';
    max_points: number;
  };
  id: string;
  unlock_after: string[];
  params: {
    type: 'survey';
    submit_text: string;
    shuffle: boolean;
    sections: Section[];
  } | {
    type: 'pvt';
    trials: number;
    min_waiting: number;
    max_waiting: number;
    show: boolean;
    max_reaction: number;
    exit: boolean;
  };
}


declare interface Section {
  id: string;
  name: string;
  shuffle: boolean;
  questions: Question[];
}

interface Question {
  id: string;
  text: string;
  type:
    | 'instruction'
    | 'datetime'
    | 'multi'
    | 'text'
    | 'slider'
    | 'media'
    | 'yesno'
    | 'external'
    | 'file';
  required: boolean;
  rand_group?: string;
  noToggle?: boolean;
  response?: number | string | [];
  hideSwitch?: boolean;
  model?: string | number;
  hideError?: boolean;
  value?: number;
  hide_id?: string;
  hide_value?: string;
  hide_if?: boolean;
  subtype?: 'date' | 'time' | 'datetime' | 'image' | 'video' | 'audio' |  'short' | 'long' | 'numeric';
  min?: number;
  max?: number;
  hint_left?: string;
  hint_right?: string;
  yes_text?: string;
  no_text?: string;

  radio?: boolean;
  modal?: boolean;
  options?: string[];
  optionsChecked?: Option[]; // adjust in Generator
  shuffle?: boolean;
  src?: string;
  thumb?: string;
  file_name?: string;

}

interface Instruction extends Question {
  type: 'instruction';
}
interface Text extends Question {
  type: 'text';
  subtype: 'short' | 'long' | 'numeric';
}
interface DateTime extends Question {
  type: 'datetime';
  subtype: 'date' | 'time' | 'datetime';
}
interface YesNo extends Question {
  type: 'yesno';
  yes_text: string;
  no_text: string;
  hide_id?: string;
  hide_value?: string;
  hide_if?: boolean;
}
interface Slider extends Question {
  type: 'slider';
  min: number;
  max: number;
  hint_left: string;
  hint_right: string;
  hide_id?: string;
  hide_value?: string; //  prefix with < or > => <50
  hide_if?: boolean;
}
interface Multi extends Question {
  type: 'multi';
  radio: boolean;
  modal: boolean;
  options: string[];
  optionsChecked?: Option[]; // adjust in Generator
  shuffle: boolean;
  hide_id?: string;
  hide_value?: string;
  hide_if?: boolean;
}
interface Media extends Question {
  type: 'media';
  subtype: 'image' | 'video' | 'audio';
  src: string;
  thumb: string;
}
interface ExternalQuestion extends Question {
  type: 'external';
  src: string;
}

interface Files extends Question {
  type: 'file';
  src: string;
  file_name: string;
}

interface Task {
  uuid: string;
  index: number;
  task_id: number;
  name: string;
  type: string;
  hidden: boolean;
  unlock_after: string[];
  sticky: boolean;
  sticky_label: string;
  alert_title: string;
  alert_time?: string;
  response_time?: string;
  response_time_ms?: number;
  alert_message: string;
  timeout: boolean;
  timeout_after: number;
  responses?: Responses;
  time: string;
  locale: string;
  completed: boolean;
}
interface Option {
  text: string;
  checked: boolean;
}

type SurveyData =
  | {
      module_index: number;
      module_name: string;
      responses: Responses;
      response_time: string;
      response_time_in_ms: number;
      alert_time: string;
    }
  | {
      module_index: number;
      module_name: string;
      entries: number[];
      response_time: string;
      response_time_in_ms: number;
      alert_time: string;
    };

interface Responses {
  [id: string]: Question['response'];
}
interface LogEvent {
  timestamp: string;
  milliseconds: number;
  page: string;
  event: string;
  module_index: any;
}
interface Translations {
  btn_cancel: string;
  btn_dismiss: string;
  btn_enrol: string;
  'btn_enter-url': string;
  'btn_study-id': string;
  'error_loading-qr-code': string;
  'error_loading-study': string;
  heading_error: string;
  label_loading: string;
  msg_caching: string;
  msg_camera: string;
}
