import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlgoliaResults } from '../models/algolia-results';
import { Points } from '../models/points';
import { PlacesService } from '../places.service';
import { WeatherService } from '../services/weather.service';

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

  //Input results
  search: string = '';
  //  autoComplete instance
  placesAutoComplete: any;
  // value of search input
  initialPoints!: Points | null;

  constructor(
    private places: PlacesService,
    private weatherApi: WeatherService
  ) {}

  ngOnInit(): void {
    // set up auto complete instance
    this.placesAutoComplete = this.places.getPlaces(
      this.searchInput.nativeElement
    );
    // set change event on auto complete
    this.placesAutoComplete.on('change', this.onPlacesChanged.bind(this));
  }

  // handle when places change
  onPlacesChanged(places: any) {
    // get the location
    const { name, country, latlng } = places.suggestion;

    const algoliaResults: AlgoliaResults = { name, country, latlng };
    // emit the location details from algolia
    this.searchEmitted.emit(algoliaResults);
  }
}
