import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid';

@Injectable({
  providedIn: 'root',
})
export class UuidService {
  constructor() {}

  generateUUID(prefix: string) {
    return prefix + nanoid();
  }
}
