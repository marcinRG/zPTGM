import {Component, Input, OnInit} from '@angular/core';
import {ILastQuery} from '../../model/ILastQuery';

@Component({
  selector: 'app-last-search-query',
  templateUrl: './last-search-query.component.html'
})
export class LastSearchQueryComponent implements OnInit {

  @Input() lastQuery: ILastQuery;

  constructor() {
  }

  ngOnInit(): void {
  }



}
