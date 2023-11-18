import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RestService {


    constructor(private http: HttpClient) {}
  

    // Generic HTTP GET request
    get<T>(url: string): Observable<T> 
    {
        return this.http.get<T>(url);
    }

    // Generic HTTP POST request
    post<T>(url: string, body: any): Observable<T> 
    {
        return this.http.post<T>(url, {body});
    }

    // Generic HTTP CONNECT request
    connect<T>(url: string, body: any): Observable<T> 
    {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // Add any additional headers if needed
        });

        return this.http.request<T>('CONNECT', url, {
            body: JSON.stringify(body),
            headers: headers,
        });
    }
}
