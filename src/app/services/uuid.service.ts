import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UuidService {
  constructor() {}
  // Math.random is not cryptographically secure, problably good enough for our purposes but the crypto library has a provably secure random number generator. See https://github.com/ai/nanoid#security
  // With 25 ** 8 charakters, there are 152 587 890 625 possible values, which according to https://zelark.github.io/nano-id-cc/ comes out to ~2 days needed, in order to have a 1% probability of at least one collision, when creating ~ 1000 ids per hour, which is not unreasonable for our purposes.
  // implementation taken from https://www.fiznool.com/blog/2014/11/16/short-id-generation-in-javascript/
  generateUUID(prefix) {
    const ALPHABET = '23456789ABDEGJKMNPQRVWXYZ';
    const ID_LENGTH = 8;

    let rtn = '';
    for (let i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return prefix + rtn;
  }
}
