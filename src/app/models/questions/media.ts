import { Questions } from '../questions';

export class Media extends Questions{
  type: 'media';
  subtype: 'image' | 'video' | 'audio';
  src: string;
  thumb: string;
}
