import { Questions } from '../questions';
export class YesNo extends Questions{
  type: 'yesno';
  yes_text: string;
  no_text: string;
  hide_id?: string;
  hide_value?: boolean;
  hide_if?: boolean;
}
