import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { sprintf } from 'sprintf-js';

@Component({
  selector: 'app-area-display',
  templateUrl: './area-display.component.html',
  styleUrls: ['./area-display.component.scss']
})
export class AreaDisplayComponent implements OnInit {

  @Input() area: number;
  @Input() format: string = '%.2f';
  @Input() unit: string;
  @Output() unitChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  switchAreaUnit(): void {
    let unit = this.unit;

    if (unit === 'ha') {
      unit = 'ac';
    } else {
      unit = 'ha';
    }

    this.unitChange.emit(unit);
  }

  get fieldArea(): string {
    let value = this.area;

    if (this.unit === 'ha') {
      value /= 1e5;
    } else if (this.unit === 'ac') {
      value /= 4046.8564224;
    }

    if (isNaN(value)) {
      return 'NaN';
    } else {
      return sprintf(this.format, value);
    }
  }

}
