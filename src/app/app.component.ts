import { Component } from '@angular/core';
import { AlgoliaResults } from './models/algolia-results';
import { CurrentWeather } from './models/current-weather';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'weatherapp-angular';
  currentWeather: CurrentWeather | null = null;
  historicalWeather: CurrentWeather[] = [];
  locationData: any;
  constructor(private weatherApi: WeatherService) {}

  // get current weather using search results
  getCurrentWeather(search: AlgoliaResults): void {
    this.locationData = search;
    // console.log(search);
    this.weatherApi
      .getCurrentWeather(search.latlng.lat, search.latlng.lng)
      .subscribe((data) => {
        this.currentWeather = data;
      });
  }
  getHistoricalWeather(): void {
    this.weatherApi
      .getHistoricalWeather(
        this.locationData.latlng.lat,
        this.locationData.latlng.lng
      )
      .subscribe((data) => {
        this.historicalWeather = data;
      });
  }
}
