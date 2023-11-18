import { Injectable } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Observable, tap } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class HomeService 
{
    private apiUrl = 'http://localhost:3000';
    private connection: any;
    constructor(public rest: RestService)
    {
        try {
            this.connectToServer(this.connection);
        }
        catch (err) {
            console.error(err);
        }
    }

    // Example GET operation
    getData(): Observable<any> 
    {
        const url = `${this.apiUrl}/api/data`;
        return this.rest.get<any>(url).pipe(
            tap((data: any) => console.log('Server response:', data)),
          );
    }

    // Example POST operation
    postData(data: any): Observable<any> 
    {
        const url = `${this.apiUrl}/api/data`;
        return this.rest.post<any>(url, data);
    }

    // Example CONNECT operation
    connectToServer(data: any): Observable<any> 
    {
        const url = `${this.apiUrl}/connect`;
        return this.rest.connect<any>(url, data);
    }    
}
