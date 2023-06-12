import { SafeResourceUrl } from '@angular/platform-browser';
import { Option } from './types';

export default interface Survey {
  type: 'survey';
  id: string;
  name: string;
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

  hideSwitch?: boolean;
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
  options: [];
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
