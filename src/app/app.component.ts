import {Component} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {SearchService} from './services/search.service';
import {Observable, of} from 'rxjs';
import {ICategory} from './model/ICategory';
import {SearchStates} from './model/SearchStates';
import {ILastQuery} from './model/ILastQuery';
import {ISearchResults} from './model/ISearchResults';

export type Category = 'people' | 'planets' | 'starships' | 'wrong_category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Wyszukiwanie ';
  results$: Observable<any[]>;
  searchString = '';
  category: Category | null = null;
  categories: Category[] = ['people', 'planets', 'starships', 'wrong_category'];
  toLoad$: Observable<boolean>;
  searchCategories: ICategory[] = [
    {name: 'People', value: 'people'},
    {name: 'Planets', value: 'planets'},
    {name: 'Starship', value: 'people'},
    {name: 'Wrong category', value: 'wrong_category'}
  ];
  previousQuery: ILastQuery = {
    category: 'jakaś kategoria',
    text: 'jakis tekst qwerendy'
  };
  searchResults: ISearchResults = {
    searchState: SearchStates.ERROR,
    results: {
      count: 60,
      itemsPerPage: 10,
      hasMorePages: true,
      currentPage: 6
    },
  };

  constructor(private search: SearchService) {
  }

  change() {
    console.log(this.searchString, this.category);
  }

  loadMore() {
    console.log(this.searchString, this.category);
  }
}
