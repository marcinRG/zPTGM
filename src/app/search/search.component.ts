import {Component, Input, OnInit} from '@angular/core';
import {ICategory} from '../model/ICategory';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  @Input() searchCategories: ICategory[];

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
  }

  changeCategoryHandler(event: any): void {
    this.searchService.changeCategory(event);
  }

  changeTextSearchHandler(event: any): void {
    this.searchService.changeSearchText(event);
  }

}
