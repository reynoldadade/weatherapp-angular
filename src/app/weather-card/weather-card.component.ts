import { Component, Input, OnInit } from '@angular/core';
import { CurrentWeather, Weather } from '../models/current-weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit {
  // prop to get current weather object
  @Input() currentWeather!: CurrentWeather | null;
  // weather metadata object
  weather: Weather;
  //weather icon url
  weatherIcon: string = '';
  // if user clicks to view more
  viewingMore: boolean = false;
  constructor(private weatherService: WeatherService) {
    this.weather = {
      id: 0,
      main: '',
      description: '',
      icon: '',
    };
  }

  ngOnInit(): void {
    this.weather = this.getWeather();
    this.weatherIcon = this.weatherService.getWeatherIconUrl(
      this.weather?.icon
    );
  }

  // get weather object from current weather object
  getWeather(): Weather {
    const weather = this.currentWeather?.current?.weather;
    // check weather object is not null
    if (weather) {
      // get first element from weather array
      const [first] = weather;
      return first;
    }
    // else return the default weather object
    return this.weather;
  }
  // set viewingMore to inverse of viewingMore
  showMore(): void {
    this.viewingMore = !this.viewingMore;
  }
}
