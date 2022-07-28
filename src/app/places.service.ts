import { Injectable } from '@angular/core';
import places, { PlacesInstance } from 'places.js';
import { Points } from './models/points';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor() {}

  getPlaces(element: HTMLInputElement): PlacesInstance {
    return places({
      style: true,
      container: element,
      autocompleteOptions: {
        autoSelect: false,
        autoSelectOnBlur: false,
      },
    });
  }

  getLocation(): Points | null {
    let points: Points | null = null;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          points = { latitude, longitude };
        },
        (error) => {
          this.handlePositionError(error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
    return points;
  }

  handlePositionError(error: GeolocationPositionError): void {
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
