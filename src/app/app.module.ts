import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app.component';
import { RouterOutlet, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HomeComponent } from './components/home.component';
import { ProfileComponent } from './components/profile.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProfileComponent
    ],
    imports: [
        RouterModule,
        BrowserModule,
        RouterOutlet,
        HttpClientModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyAQCxWfFd4zjq7a3NTw5fjnNcS_hyi--rw'
        })
    ],
    providers: [provideRouter(routes)],
    bootstrap: [AppComponent]
})
export class AppModule { }
