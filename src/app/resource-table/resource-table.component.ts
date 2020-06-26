import { Component, OnInit, Input } from '@angular/core';
import { SortType } from '@swimlane/ngx-datatable';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

export class ResourceTableColumnDisplay {
  public title: string;
  public width: number;

  constructor() {}
}

/* Resource table configuration. Specifies how a table of resources should
 * be displayed.
 */
export class ResourceTableConfig {
  public display: ResourceTableColumnDisplay[] = [];
  public select = 'multiple';

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

/* Wrapper component for ngx-datatable. Displays data with the given table
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
  /* Expose to template */
  SortType = SortType;
  Math = Math;

  /* Footer height increases on small screens to make room for two rows */
  footerHeight = 50;

  /* Which resources are currently selected in the display */
  selected: any[] = [];

  /* Internal property that affects how the datatable displays sort icons
   * next to column headers.
   */
  sorts: any;

  /* Page properties of the resources displayed */
  @Input() page: ResourceTablePage;

  /* Resource data */
  @Input() rows: any;

  // Sample table config
  // @Input()
  tableConfig: ResourceTableConfig = {
    select: 'multiple',
    display: [
      {
        title: 'Col 1',
        width: 100
      },
      {
        title: 'Col 2',
        width: 100
      }
    ]
  };

  constructor(private mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    /* Larger footer for smaller screens, to split the widgets into two rows
     * instead of one. */
    this.mediaObserver.media$.subscribe((mediaChange: MediaChange) => {
      if (mediaChange.mqAlias === 'xs') {
        this.footerHeight = 80;
      } else {
        this.footerHeight = 50;
      }
    });
  }

  /* Called when a column sort is modified (header is clicked) */
  onSort(sort) {
  }

  /* Called when selection is changed in multiple element selection, i.e.
   * tableConfig.select === 'multiple'
   */
  onSelect(select) {
    console.log(select);
  }

  /* Called when a selection is changed in single element selection, i.e.
   * tableConfig.select === 'single'
   */
  onRadioChangeFn(event, row) {
  }

  /* Called when the pager component in the custom header is changed to a
   * different page.
   */
  onPagerChange(event) {
  }

}
