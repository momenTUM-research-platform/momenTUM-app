import { Question } from './survey';

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

declare interface Option {
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
