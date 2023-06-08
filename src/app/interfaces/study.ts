import { Pvt } from './pvt';
import Survey from './survey';

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
