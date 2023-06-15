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
