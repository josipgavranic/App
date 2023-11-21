import { ChangeDetectorRef, Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import { MapsAPILoader } from '@agm/core';
import { CityDataService } from '../services/city-data.service';

@Component({
    selector: 'home',
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
        <h1>{{ title }}</h1>
        <div id="map">
            <agm-map [latitude]="lat" [longitude]="lng">
            <!--<agm-marker *ngFor="let marker of this.cityDataService.markers" [latitude]="marker.lat" [longitude]="marker.lng"></agm-marker>-->
                <agm-marker [latitude]="47.36991229592861" [longitude]="8.522110574370004">
                <!-- Add optional info window for debugging -->
                <agm-info-window [disableAutoPan]="true">
                    {{ 47.36991229592861 }}, {{ 8.522110574370004 }}
                </agm-info-window>
                </agm-marker>
                <agm-marker [latitude]="47.36991229592861" [longitude]="8.522110574370004" [label]="'M'">
                </agm-marker>
            </agm-map>
        </div>
        
    `,
})
export class HomeComponent 
{
    title = 'My first AGM project';
    lat = 47.36991229592861;
    lng = 8.522110574370004;
    data: any;
    constructor(public home: HomeService, private mapsAPILoader: MapsAPILoader, public cityDataService: CityDataService,
        private cdr: ChangeDetectorRef)
    {

    }

    ngOnInit()
    {
        this.getData();
        this.postData();
        this.loadGoogleMapsScript();
        //this.fetchCityData();
    }
    getData(): void 
    {
        this.home.getData().subscribe((result) => {
            this.data = result;
            console.log(this.data);
        });
      }    
    // Example POST operation
    postData(): void 
    {
        const newData = {Name: 'Davor'};
        this.home.postData(newData).subscribe(() => {
                console.log('Data inserted successfully');
                // Optionally, fetch updated data after insertion
                this.getData();
            },
            (error) => {
                console.error('Error inserting data:', error);
            }
        );
    }    

    loadGoogleMapsScript() {
        this.mapsAPILoader.load().then(() => {
          this.initMap();
        });
      }
    
      initMap() {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
    
        // Safely access the map element or provide a default value (e.g., document.body)
        const mapElement = document.getElementById('map') || document.body;
    
        const map = new google.maps.Map(mapElement, {
          center: { lat: this.lat, lng: this.lng },
          zoom: 8
        });
    
        directionsRenderer.setMap(map);
    
        // Example route from Sydney, Australia to Melbourne, Australia
        // const request: google.maps.DirectionsRequest = {
        //   origin: new google.maps.LatLng(this.lat, this.lng),
        //   destination: new google.maps.LatLng(47.44159273798436, 8.625458252230352),
        //   travelMode: 'DRIVING' as google.maps.TravelMode,
        // };
    
        // directionsService.route(request, (result: any, status: any) => {
        //     if (status === 'OK') {
        //       directionsRenderer.setDirections(result);
        //       console.log(result);
        //     } else {
        //       console.error('Directions request failed with status:', status);
        //     }
        //   });
      }  
}
