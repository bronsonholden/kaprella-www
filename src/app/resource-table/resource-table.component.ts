import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

/* Wrapper component for tables. Displays data with the given table
 * configuration and emits events upon user interaction with the display
 * e.g. page changes or selections. Responding to such events to reload data,
 * etc. is left to parent components.
 */
@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.scss']
})
export class ResourceTableComponent implements OnInit {
  selection = new SelectionModel<any>(true, []);

  /* Whether data table loading indicator should be shown */
  @Input() loading = true;

  /* Which resources are currently selected in the display */
  selected: any[] = [];

  /* Currently applied filters
   */
  @Input() filters: ResourceTableFilter[] = [];

  /* Internal property that affects how the datatable displays sort icons
   * next to column headers.
   */
  sorts: any;

  /* Page properties of the resources displayed */
  @Input() page: ResourceTablePage;

  /* Resource data */
  @Input() rows: any[] = [];

  // Sample table config
  // @Input()
  tableConfig: ResourceTableConfig = {
    columns: {
      col1: {
        title: 'Long column name Element',
        columnType: ResourceTableColumnType.Text
      },
      col2: {
        title: 'Column Name That Is Long',
        columnType: ResourceTableColumnType.Text
      }
    },
    displayedColumns: [
      'select',
      'col2',
      'col1'
    ]
  };

  constructor(private mediaObserver: MediaObserver) { }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.rows.length;
    return numSelected == numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.rows.forEach(row => this.selection.select(row));
  }

  addToSelection(row) {
    this.selection.toggle(row)
  }

  ngOnInit(): void {
  }

  /* Called when a column sort is modified (header is clicked) */
  onSort(sort) {
  }

  /* Called when a selection is changed in single element selection, i.e.
   * tableConfig.select === 'single'
   */
  onRadioChangeFn(event, row) {
  }

  /* Called when the pager is changed
   */
  onPageChange(event) {
    console.log(event);
  }

  removeFilterByIdx(idx) {
    this.filters.splice(idx, 1);
  }

}

/* Column type affects what filters can be applied, as well as how the data
 * is displayed in the table.
 */
export enum ResourceTableColumnType {
  Text = 1,
  Numeric,
  Boolean,
  Geographic
}

export enum ResourceTableFilterType {
  Empty = 1,
  NotEmpty,
  TextEqual,
  TextNotEqual,
  TextIn,
  TextNotIn,
  NumericEqual,
  NumericNotEqual,
  NumericGreaterThan,
  NumericGreaterThanOrEqual,
  NumericLessThan,
  NumericLessThanOrEqual,
  BooleanTrue,
  BooleanFalse,
  GeographicWithinRadius,
  GeographicWithinCountry
}

/* Describes a filter as configured with the resource table filter wizard.
 * The parent component is responsible for applying or extending filters
 * on the actual data source.
 */
export class ResourceTableFilter {
  constructor(public filterType: ResourceTableFilterType,
              public columnIdentifier: string,
              public operand: any) {}

  get label(): string {
    return 'Filter';
  }
}

export class ResourceTableColumnConfig {
  constructor(public columnType: ResourceTableColumnType,
              public title: string) {}
}

/* Display configuration for columns in a resource table */
export class ResourceTableColumnDisplay {
  public width: number;
  public columnIdentifier: string;

  constructor() {}
}

/* Resource table configuration. Specifies how a table of resources should
 * be displayed.
 */
export class ResourceTableConfig {
  public displayedColumns: string[] = [];
  public columns: { [id: string]: ResourceTableColumnConfig } = {};

  constructor() {}
}

/* Resource table page information. Affects the display and behavior of the
 * table pager located in the footer.
 */
export class ResourceTablePage {
  _limit = 100;
  _offset = 0;
  _total = 0;

  get offset(): number {
    return this._offset;
  }

  set offset(value: number) {
    if (value < 0) {
      throw 'ResourceTablePage offset must be >= 0';
    }
    this._offset = value;
  }

  get limit(): number {
    return this._limit;
  }

  set limit(value: number) {
    if (value < 0) {
      throw 'ResourceTablePage limit must be > 0';
    }
    this._limit = value;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    if (value < 0) {
      throw 'ResourceTablePage total must be > 0';
    }
    this._total = value;
  }

  get page(): number {
    return Math.floor(this._offset / this._limit) + 1;
  }

  /* Update a page's properties all at once */
  turn(offset, limit, total) {
    this.offset = offset;
    this.limit = limit;
    this.total = total;
  }
}
