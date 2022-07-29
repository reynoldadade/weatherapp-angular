import { Injectable } from '@angular/core';
import places, { PlacesInstance } from 'places.js';
import { Observable } from 'rxjs';
import { Points } from './models/points';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor() {}

  // create places intance and return it
  getPlaces(element: HTMLInputElement): PlacesInstance {
    return places({
      style: true,
      container: element,
      type: 'city',
      autocompleteOptions: {
        autoSelect: false,
        autoSelectOnBlur: false,
      },
    });
  }

  // request for user location and return it
  getLocation(): Observable<Points | null> {
    // to be able to return the value from the callback we need an promise or an observable
    return new Observable((observer) => {
      // check to see if geolocation is supported
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const points: Points = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            // when successful return points as observable
            observer.next(points);
          },
          (error) => {
            // on failure return null as observable and handle error with alerts
            this.handleLocationRequestError(error);
            observer.next(null);
          }
        );
      } else {
        // in case there is no geolocation support
        alert('Geolocation is not supported by this browser.');
        observer.next(null);
      }
    });
  }

  handleLocationRequestError(error: GeolocationPositionError): void {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        alert('The request to get user location timed out.');
        break;
    }
  }
}
