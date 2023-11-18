import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ProfileComponent } from './components/profile.component';
import { RestService } from './services/rest.service';

export const routes = [
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: ProfileComponent},
];
