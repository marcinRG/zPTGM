import {Component} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {ICategory} from './model/ICategory';


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

  constructor() {
  }
}
