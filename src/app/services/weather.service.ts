import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private $http: HttpService) {}

  //get current weather from weatherapi
  getCurrentWeather(lat: number, lon: number): Observable<any> {
    return this.$http.getRequest(
      `${environment.baseURL}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${environment.appId}`
    );
  }

  // use the latitude logitude to get the current users location
  getPlaceByLatLng(lat: number, lon: number): Observable<any> {
    return this.$http.getRequest(
      `${environment.baseURL}geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${environment.appId}`
    );
  }
}
