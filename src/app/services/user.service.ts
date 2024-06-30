import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private baseApiUrl: string = 'http://localhost:3000';
  private baseApiUrl: string = 'https://api.rmpokertour.fr';
  private user: UserModel | null = null;

  constructor(private http: HttpClient) { }

  public setUser(user: UserModel | null) {
    this.user = user;
  }

  public getIdentifiant(): string | null {
    if (!this.user) return null;
    return this.user.identifiant;
  }

  public getUsername(): string | null {
    if (!this.user) return null;
    return this.user.username;
  }

  public callSignup(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseApiUrl}/api/authentification/signup`, data, { headers });
  }

  public callSignin(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseApiUrl}/api/authentification/signin`, data, { headers });
  }

  public callProfil(token: string, identifiant: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.get<any>(`${this.baseApiUrl}/api/user/${identifiant}`, { headers });
  }

  public callSearchUser(token: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.post<any>(`${this.baseApiUrl}/api/user/`, data, { headers });
  }

  public callSubsribe(token: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.post<any>(`${this.baseApiUrl}/api/user/subscribe`, data, { headers });
  }

  public callUnsubsribe(token: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    return this.http.post<any>(`${this.baseApiUrl}/api/user/unsubscribe`, data, { headers });
  }
}