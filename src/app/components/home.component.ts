import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
    selector: 'home',
    styles: [``],
    template: `<h1>Home Works</h1>`
})
export class HomeComponent 
{
    data: any;
    constructor(public home: HomeService)
    {

    }

    ngOnInit()
    {
        this.getData();
        this.postData();
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
}
