import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<{ value: any }> {
    return await this._storage?.get(key);
  }

  async removeItem(key: string) {
    return await this._storage?.remove(key);
  }

  async clear() {
    return await this._storage?.clear();
  }

  async keys(){
    return await this._storage?.keys();
  }
}
