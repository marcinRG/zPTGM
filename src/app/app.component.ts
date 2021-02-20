import {Component} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {ICategory} from './model/ICategory';
import {PageStates} from './model/PageStates';
import {ISearchResults} from './model/ISearchResults';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Wyszukiwanie ';
  searchCategories: ICategory[] = [
    {name: 'People', value: 'people'},
    {name: 'Planets', value: 'planets'},
    {name: 'Starship', value: 'starships'},
    {name: 'Wrong category', value: 'wrong_category'}
  ];
  searchResults: ISearchResults = {
    searchState: PageStates.ERROR,
    results: {
      count: 60,
      itemsPerPage: 10,
      hasMorePages: true,
      currentPage: 6
    },
  };

  constructor() {
  }
}
