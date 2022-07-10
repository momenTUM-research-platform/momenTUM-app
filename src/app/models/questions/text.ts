import { Questions } from '../questions';
export class Text extends Questions{
  type: 'text';
  subtype: 'short' | 'long' | 'numeric';
}
