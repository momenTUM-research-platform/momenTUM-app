import { Questions } from '../questions';
import { Options } from './options';

export class Multi extends Questions{
  type: 'multi';
  radio: boolean;
  modal: boolean;
  options: string[];
  optionsChecked?: Options[]; // adjust in Generator
  shuffle: boolean;
  hide_id?: string;
  hide_value?: string;
  hide_if?: boolean;
}
