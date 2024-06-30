import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // private baseApiUrl: string = 'http://localhost:3000';
  private baseApiUrl: string = 'https://api.rmpokertour.fr';
  private token: string | null;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {
    this.token = this.localStorageService.getItem('token');
  }

  public setToken(value: string): void {
    this.token = value;
  }

  public getToken(): string | null {
    if (this.token === '') return null;
    return this.token;
  }

  public callToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.get<any>(`${this.baseApiUrl}/api/authentification/refresh`, { headers });
  }
}