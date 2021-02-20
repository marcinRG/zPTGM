import {Component, Input, OnInit} from '@angular/core';
import {createObserver, SearchService} from '../../services/search.service';
import {IHasText} from '../../model/IHasText';
import {IHasCategory} from '../../model/IHasCategory';

@Component({
  selector: 'app-last-search-query',
  templateUrl: './last-search-query.component.html'
})

export class LastSearchQueryComponent implements OnInit {

  lastQuery: ITextCategory = {};
  private queries: ITextCategory[] = [];

  constructor(private searchService: SearchService) {
  }

  getPreviousSearchQuery(): ITextCategory {
    let obj: ITextCategory = {};
    if (this.queries.length >= 2) {
      obj = this.queries[1];
    }
    return obj;
  }

  ngOnInit(): void {
    this.searchService.getCategoryAndText().subscribe(createObserver<IHasText & IHasCategory>((value) => {
      this.queries = [value, ...this.queries];
      this.lastQuery = this.getPreviousSearchQuery();

    }, 'Observer error in component: last-search-query'));
  }
}

interface ITextCategory {
  text?: string;
  category?: string;
}
