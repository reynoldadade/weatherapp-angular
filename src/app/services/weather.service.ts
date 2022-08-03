import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentWeather } from '../models/current-weather';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private $http: HttpService) {}

  //get current weather from weatherapi
  getCurrentWeather(lat: number, lon: number): Observable<any> {
    return this.$http.getRequest(
      `${environment.baseURL}data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${environment.appId}`
    );
  }

  // use the latitude logitude to get the current users location
  getPlaceByLatLng(lat: number, lon: number): Observable<any> {
    return this.$http.getRequest(
      `${environment.baseURL}geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${environment.appId}`
    );
  }

  // weather icon url
  getWeatherIconUrl(weatherIcon: string): string {
    return `${environment.weatherIconUrl}${weatherIcon}@2x.png`;
  }

  // since only one day can be made at a time for historical data, we need to make concurrent requests hence the need to create a request array
  createHistoricalDataRequests(
    lat: number,
    lon: number
  ): Observable<CurrentWeather>[] {
    // save requests to history array
    const weatherHistoryRequests = [];
    // get history from last 5 days
    for (let i = 5; i > 0; i--) {
      // get todays timestamp
      const today = Math.floor(Date.now() / 1000);
      // keep subtracting one day from today but keep it in the same timezone
      const yesterday = today - i * 24 * 60 * 60;
      // create a request
      const request = this.$http.getRequest(
        `${environment.baseURL}data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&appid=${environment.appId}&units=metric&exclude=hourly&dt=${yesterday}&only_current=true`
      );
      weatherHistoryRequests.push(request);
    }
    return weatherHistoryRequests;
  }

  // get historical weather from weatherapi
  getHistoricalWeather(lat: number, lon: number): Observable<CurrentWeather[]> {
    // use forkjoin to make concurrent requests
    return forkJoin(this.createHistoricalDataRequests(lat, lon));
  }
}
