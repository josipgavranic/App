import { MapsAPILoader } from '@agm/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    styles: [`
    agm-map {
        height: 300px;
      }
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
    <!--
    <agm-map [latitude]="lat" [longitude]="lng">
      <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
    </agm-map>
    -->
    <div id="map"></div>
        <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    title = 'My first AGM project';
    lat = 47.36991229592861;
    lng = 8.522110574370004;
    constructor(private mapsAPILoader: MapsAPILoader)
    {

    }

    ngOnInit()
    {
        this.loadGoogleMapsScript();
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
        const request: google.maps.DirectionsRequest = {
          origin: new google.maps.LatLng(this.lat, this.lng),
          destination: new google.maps.LatLng(47.44159273798436, 8.625458252230352),
          travelMode: 'DRIVING' as google.maps.TravelMode,
        };
    
        directionsService.route(request, (result: any, status: any) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);
              console.log(result);
            } else {
              console.error('Directions request failed with status:', status);
            }
          });
      }
}
