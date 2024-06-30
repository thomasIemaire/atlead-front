import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdviceService {

    // private baseApiUrl: string = 'http://localhost:3000';
    private baseApiUrl: string = 'https://api.rmpokertour.fr';

    constructor(private http: HttpClient) { }

    public callGetAllAdvices(token: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': token
        });
        return this.http.get<any>(`${this.baseApiUrl}/api/post/advice`, { headers });
    }

    public callSetAdvice(token: string, data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': token
        });
        return this.http.post<any>(`${this.baseApiUrl}/api/post/advice`, data, { headers });
    }

    public callGetUserAdvices(token: string, identifiant: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': token
        });
        return this.http.get<any>(`${this.baseApiUrl}/api/post/advice/${identifiant}`, { headers });
    }

    public callLikeAdvice(token: string, data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': token
        });
        return this.http.post<any>(`${this.baseApiUrl}/api/post/advice/like`, data, { headers });
    }

    public callUnlikeAdvice(token: string, data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': token
        });
        return this.http.post<any>(`${this.baseApiUrl}/api/post/advice/unlike`, data, { headers });
    }
}