import { Component, OnInit, Input } from '@angular/core';
import { sprintf } from 'sprintf-js';

@Component({
  selector: 'app-resource-table-cell',
  templateUrl: './resource-table-cell.component.html',
  styleUrls: ['./resource-table-cell.component.scss']
})
export class ResourceTableCellComponent implements OnInit {

  @Input() display: any;
  @Input() value: any;
  @Input() row: any;

  constructor() {}

  ngOnInit(): void {
  }

  onUnitChange(unit: string) {
    this.display.unit = unit;
  }

  get raw(): any {
    return this.evaluateCellValue(this.value);
  }

  private evaluateCellValue(value): any {
    switch (value.type) {
      case 'id':
        return this.row.id;
      case 'attribute':
        return this.row.attributes[value.path];
      case 'relationship':
        return this.row.relationships[value.name].data.id;
      case 'meta':
        return this.row.meta[value.path];
      case 'literal':
        return value.value;
      case 'list':
        return value.values;
      case 'concat':
        return value.parts.map((part: any) => {
          return this.evaluateCellValue(part);
        }).join(value.separator || '');
      default:
        return null;
    }
  }

  get formatted(): string {
    let values;

    if (this.value.type === 'list') {
      values = this.raw.map(item => this.evaluateCellValue(item));
    } else {
      values = [this.evaluateCellValue(this.raw)];
    }

    return sprintf(this.display.format, ...values);
  }

  get routerLink(): string {
    if (!!this.display.absolute) {
      return `/${this.raw}`;
    } else {
      return this.raw;
    }
  }

  get queryParams(): { [key: string]: any } {
    let query = {};

    for (let key of Object.keys(this.display.queryParams || {})) {
      query[key] = this.evaluateCellValue(this.display.queryParams[key]);
    }

    return query;
  }

}
