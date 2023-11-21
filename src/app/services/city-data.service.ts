// city-data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CityDataService 
{
    markers: any[] = [];
    counter = 0;
    constructor(private http: HttpClient) {}

    getCityData(): Observable<any> 
    {
        return this.http.get('./assets/ZurichCity.txt');
    }

    fetchCityData() {
        if (this.counter == 0)
        {
            this.counter = 1;
          this.getCityData().subscribe((data: any) => {
            if (data && data.cities) {
              this.processCityData(data.cities);
            }
          });
        }
    }

    processCityData(cities: any[]) {
      for (const city of cities) {
        if (city.collecting_points) {
          for (const collectingPoint of city.collecting_points) {
            if (collectingPoint.lat && collectingPoint.lng) {
              this.markers.push({
                lat: collectingPoint.lat,
                lng: collectingPoint.lng,
              });
            }
          }
        }
      }
    }
}
