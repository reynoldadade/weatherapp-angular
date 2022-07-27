import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('places', { static: true }) searchInput: any;
  //  autoComplete instance
  placesAutoComplete: any;

  constructor(private places: PlacesService) {}

  ngOnInit(): void {
    this.placesAutoComplete = this.places.getPlaces(
      this.searchInput.nativeElement
    );
    this.placesAutoComplete.on('change', this.onPlacesChanged);
  }

  // handle when places change
  onPlacesChanged(places: any) {
    // get the location
    const { name, country, latlng } = places.suggestion;
    // emit the location

    this.searchEmitted.emit({ name, country, latlng });
  }
}
