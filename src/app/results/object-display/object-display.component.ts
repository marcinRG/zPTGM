import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-object-display',
  templateUrl: './object-display.component.html'
})
export class ObjectDisplayComponent implements OnInit {

  @Input() obj: object;

  constructor() {
  }

  getObjectFields() {
    return Object.keys(this.obj);
  }

  ngOnInit(): void {
  }
}
