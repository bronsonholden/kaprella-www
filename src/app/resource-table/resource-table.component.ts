import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ViewChild
} from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { HumanizedFilter } from './filters/humanized-filter';

import {
  FilterCatalogDialogComponent,
  FilterCatalogDialogData
} from './filters/filter-catalog-dialog/filter-catalog-dialog.component';

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
  selection = new Set();

  /* Whether data table loading indicator should be shown */
  @Input() loading = true;

  /* Which resources are currently selected in the display */
  selected: any[] = [];

  /* Filters to display as applied to the data.
   */
  @Input() humanizedFilters: HumanizedFilter[] = [];

  /* Emits events when a filter is removed by clicking the delete button. */
  @Output() filterRemoved = new EventEmitter<HumanizedFilter>();

  /* Emits a filter when a new one is created via the filter catalog */
  @Output() filterApply = new EventEmitter<string>();

  /* Internal property that affects how the datatable displays sort icons
   * next to column headers.
   */
  sorts: any;

  /* Page properties of the resources displayed */
  @Input() page: ResourceTablePage;

  /* Emits changed pages from the table paginator element */
  @Output() pageChange = new EventEmitter<ResourceTablePage>();

  /* Resource data */
  @Input() rows: any[] = [];

  @Input() tableConfig: ResourceTableConfig;

  @Input() reflection: any;

  constructor(private mediaObserver: MediaObserver,
              private dialog: MatDialog) { }

  isAllSelected() {
    for (let row of this.rows) {
      if (!this.selection.has(row.id)) {
        return false;
      }
    }

    return this.selection.size === this.rows.length;
  }

  masterToggle() {
    /* If anything is selected and master toggle is clicked, remove all
     * rows from selection. Otherwise, add all rows.
     */
    if (this.selection.size > 0) {
      this.selection.clear();
    } else {
      for (let row of this.rows) {
        this.selection.add(row.id);
      }
    }
  }

  toggleSelection(row) {
    if (this.selection.has(row.id)) {
      this.selection.delete(row.id);
    } else {
      this.selection.add(row.id);
    }
  }

  ngOnInit(): void {
  }

  openFilterCatalogDialog(): void {
    const dialogRef = this.dialog.open(FilterCatalogDialogComponent, {
      maxWidth: 'calc(100vw - 24px)',
      maxHeight: 'calc(100vh - 24px)',
      height: 'calc(100% - 24px)',
      width: '600px',
      data: {
        reflection: this.reflection
      }
    });

    dialogRef.afterClosed().subscribe((filter: string) => {
      this.filterApply.emit(filter);
    });
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
    this.selection.clear();
    this.pageChange.emit(new ResourceTablePage(event.pageIndex, event.pageSize, event.length));
  }

  removeFilter(filter: HumanizedFilter) {
    this.filterRemoved.emit(filter);
  }

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

export class ResourceTableColumnConfig {
  constructor(public value: any,
              public display: any,
              public title: string) {}
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

  constructor(offset = 0, limit = 25, total = 0) {
    this.offset = offset;
    this.limit = limit;
    this.total = total;
  }

  get offset(): number {
    return this._offset;
  }

  set offset(value: number) {
    if (value < 0) {
      throw new Error('ResourceTablePage offset must be >= 0');
    }
    this._offset = value;
  }

  get limit(): number {
    return this._limit;
  }

  set limit(value: number) {
    if (value < 0) {
      throw new Error('ResourceTablePage limit must be > 0');
    }
    this._limit = value;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    if (value < 0) {
      throw new Error('ResourceTablePage total must be > 0');
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
