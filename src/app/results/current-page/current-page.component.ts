import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-current-page',
  templateUrl: './current-page.component.html',
})
export class CurrentPageComponent implements OnInit {

  @Input() currentPage: number;
  @Input() elementCount: number;
  @Input() elementsPerPage: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  getPagesMaxCount() {
    return Math.ceil(this.elementCount / this.elementsPerPage);
  }

}
