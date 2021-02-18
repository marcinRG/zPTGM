import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-results-summary',
  templateUrl: './results-summary.component.html',
})
export class ResultsSummaryComponent implements OnInit {

  @Input() currentPage: number;
  @Input() elementCount: number;
  @Input() elementsPerPage: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  getMinResult() {
    return (this.currentPage - 1) * this.elementsPerPage + 1;
  }

  getMaxResult() {
    return (this.currentPage) * this.elementsPerPage;
  }


}
