import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getItem(key: string): any | null {
    let item: string | null = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  }

  public setItem(key: string, item: any): void {
    let value: string = JSON.stringify(item);
    localStorage.setItem(key, value);
  }
}