import { Question } from './study';

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
  alert_message: string;
  timeout: boolean;
  timeout_after: number;
  time: string;
  locale: string;
  completed: boolean;
  alert_time?: string;
  response_time?: string;
  response_time_ms?: number;
  responses?: SurveyResponse;
  moment?: string;
  label?: string;
}

type SurveyData =
  | {
      module_index: number;
      module_name: string;
      responses: SurveyResponse;
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
  btn_enter_url: string;
  btn_scan_qr_code: string;
  btn_study_id: string;
  error_loading_qr_code: string;
  error_loading_study: string;
  heading_about_this_study: string;
  heading_error: string;
  heading_ethics_information: string;
  heading_notifications: string;
  heading_permission_required: string;
  heading_recently_completed: string;
  heading_support: string;
  heading_user_id: string;
  heading_withdraw: string;
  label_contact_us_by_email: string;
  label_enable_notifications: string;
  label_home: string;
  label_loading: string;
  label_my_progress: string;
  label_plain_language_statement: string;
  label_settings: string;
  label_support_website: string;
  label_withdraw_from_study: string;
  msg_caching: string;
  msg_camera: string;
  placeholder_my_progress: string;
}

interface Response {
  module_name: string;
  module_id: number;
  alert_time: string;
  submission_time: string;
  data: SurveyResponse | PvtResponse;
}

interface SurveyResponse {
  [id: string]: Question['response'];
}

interface PvtResponse {
  reaction_times: number[];
}
