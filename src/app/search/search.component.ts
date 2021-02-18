import {Component, Input, OnInit} from '@angular/core';
import {ICategory} from '../model/ICategory';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  @Input() searchCategories: ICategory[];

  constructor() {
  }

  ngOnInit(): void {
  }

  changeHandler(): void {
    console.log('change option');
  }

  inputHandler(): void {
    console.log('input handler');
  }

}
