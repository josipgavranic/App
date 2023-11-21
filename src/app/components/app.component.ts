import { MapsAPILoader } from '@agm/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CityDataService } from '../services/city-data.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-root',
    styles: [`

      #map {
        height: 500px; /* Set the desired height of the map container */
        width: 100%;   /* Make the map container take the full width of its parent */
        border: 1px solid #ccc; /* Add a border for visual distinction */
        border-radius: 8px;     /* Optional: Add border-radius for rounded corners */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle box shadow */
      }      
    `],
    template: `
    <!--
        <h1>{{ title }}</h1>
        <div id="map">
            <agm-map [latitude]="lat" [longitude]="lng">
                <agm-marker *ngFor="let marker of this.markers" [latitude]="marker.lat" [longitude]="marker.lng"></agm-marker>
            </agm-map>
        </div>
        -->
        <router-outlet></router-outlet>
        
    `,
})
export class AppComponent {
    title = 'My first AGM project';
    lat = 47.36991229592861;
    lng = 8.522110574370004;
    markers: any[] = [];
    constructor(private mapsAPILoader: MapsAPILoader, public cityDataService: CityDataService,
                private cdr: ChangeDetectorRef)
    {
    }

    ngOnInit()
    {
        this.cityDataService.fetchCityData();
        setTimeout(() => {
            console.log(this.cityDataService.markers);
        }, 20000);
    }

    //   fetchCityData() {
    //     this.cityDataService.getCityData().subscribe((data: any) => {
    //       if (data && data.cities) {
    //         this.processCityData(data.cities);
    //       }
    //     });
    //   }

    //   processCityData(cities: any[]) {
    //     for (const city of cities) {
    //       if (city.collecting_points) {
    //         for (const collectingPoint of city.collecting_points) {
    //           if (collectingPoint.lat && collectingPoint.lng) {
    //             this.markers.push({
    //               lat: collectingPoint.lat,
    //               lng: collectingPoint.lng,
    //             });
    //           }
    //         }
    //       }
    //     }
    //   }      
}
