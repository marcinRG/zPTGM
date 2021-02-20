import {Component, Input, OnInit} from '@angular/core';
import {PageStates} from '../model/PageStates';
import {ISearchResults} from '../model/ISearchResults';
import {createObserver, SearchService} from '../services/search.service';
import {IPageState} from '../model/IPageState';
import {IResponse} from '../model/IResponse';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})
export class ResultsComponent implements OnInit {
  pageState: IPageState = {pageState: PageStates.BLANK, currentPage: 1};
  data: IResponse = null;

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.searchService.getAppState().subscribe(createObserver<IPageState>((value: IPageState) => {
      this.pageState = value;
    }, 'Observer error getAppState in component: results-component'));

    this.searchService.getData().subscribe(createObserver<IResponse>((value: IResponse) => {
      console.log(value);
      this.data = value;
    }, 'Observer error getData in component: results-component'));
  }

  showBlank() {
    return this.pageState.pageState === PageStates.BLANK;
  }

  showResults() {
    return this.pageState.pageState === PageStates.RESULTS;
  }

  showError() {
    return this.pageState.pageState === PageStates.ERROR;
  }

  showLoading() {
    return this.pageState.pageState === PageStates.LOADING;
  }

  disableButton() {
    return (!!!(this.data && this.data.linkToNext));
  }

  readMoreData() {
    if (this.data && this.data.linkToNext) {
      this.searchService.changePage({
        link: this.data.linkToNext
      });
    }
  }
}
