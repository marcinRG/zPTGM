import {Component, Input, OnInit} from '@angular/core';
import {SearchStates} from '../model/SearchStates';
import {ILastQuery} from '../model/ILastQuery';
import {ISearchResults} from '../model/ISearchResults';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})
export class ResultsComponent implements OnInit {
  @Input() searchState: SearchStates;
  @Input() previousQuery: ILastQuery;
  @Input() results: ISearchResults;

  constructor() {
  }

  ngOnInit(): void {
  }

  showResults() {
    return this.results.searchState === SearchStates.RESULTS;
  }

  showError() {
    return this.results.searchState === SearchStates.ERROR;
  }

  showLoading() {
    return this.results.searchState === SearchStates.LOADING;
  }

  disableButton() {
    return !(this.results.results.currentPage < Math.ceil(this.results.results.count / this.results.results.itemsPerPage));
  }

  readMoreData() {
    console.log('rerad more');
  }

}
