import { Component, OnInit, Input } from '@angular/core';
import {
  ResourceTableColumnValue,
  ResourceTableColumnLinkDisplay,
  ResourceTableColumnDisplay
} from '../resource-table.component';

@Component({
  selector: 'app-resource-table-cell',
  templateUrl: './resource-table-cell.component.html',
  styleUrls: ['./resource-table-cell.component.scss']
})
export class ResourceTableCellComponent implements OnInit {

  @Input() display: any;
  @Input() value: any;
  @Input() row: any;

  constructor() { }

  ngOnInit(): void {
  }

  get raw(): any {
    switch (this.value.type) {
      case 'id':
        return this.row.id;
      case 'attribute':
        return this.row.attributes[this.value.path];
      default:
        return null;
    }
  }

}
