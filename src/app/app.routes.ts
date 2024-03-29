import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WeatherComponent } from './components/weather/weather.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'weather/:locationId', component: WeatherComponent },
];
