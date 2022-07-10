import { Questions } from '../questions';
export class Slider extends Questions{
  type: 'slider';
  min: number;
  max: number;
  hint_left: string;
  hint_right: string;
  hide_id?: string;
  hide_value?: string; //  prefix with < or > => <50
  hide_if?: boolean;


}
