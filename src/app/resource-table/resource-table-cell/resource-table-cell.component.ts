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

  @Input() columnDisplay: ResourceTableColumnDisplay;
  @Input() columnValue: ResourceTableColumnValue;
  @Input() row: any;

  constructor() { }

  ngOnInit(): void {
  }

  get raw(): any {
    return this.columnValue.value(this.row);
  }

}
