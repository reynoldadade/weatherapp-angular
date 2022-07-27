import { Injectable } from '@angular/core';
import places, { PlacesInstance } from 'places.js';

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

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          return { latitude, longitude };
        },
        (error) => {
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
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
