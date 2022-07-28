import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from '../places.service';

export interface AlgoliaResults {
  name: String;
  country: String;
  latlng: number[];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  // emit an event to toggle a loader
  @Output() toggleLoaderEmitted = new EventEmitter<boolean>();
  //emit an event that will send the location to the parent component
  @Output() searchEmitted = new EventEmitter<AlgoliaResults>();
  // get the input element
  @ViewChild('places', { static: true }) searchInput!: ElementRef;
  //  autoComplete instance
  placesAutoComplete: any;
  // value of search input
  search: String = '';

  //set up location form
  locationForm: FormGroup = new FormGroup({
    city: new FormControl('', [Validators.required]),
  });

  constructor(private places: PlacesService) {}

  ngOnInit(): void {
    // set up auto complete instance
    this.placesAutoComplete = this.places.getPlaces(
      this.searchInput.nativeElement
    );
    // set change event on auto complete
    this.placesAutoComplete.on('change', this.onPlacesChanged);

    // request for user location
    this.places.getLocation();
  }

  // handle when places change
  onPlacesChanged(places: any) {
    // get the location
    const { name, country, latlng } = places.suggestion;
    // emit the location
    const algoliaResults: AlgoliaResults = { name, country, latlng };

    this.searchEmitted.emit(algoliaResults);
  }

  onUseCityToGetWeatherData() {}
}
