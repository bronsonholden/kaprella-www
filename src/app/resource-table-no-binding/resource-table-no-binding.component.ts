import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { filter, mergeWith, isArray, omit, get } from 'lodash-es';

import {
  ResourceTableConfig,
  ResourceTableSort,
  ResourceTablePage
} from '../resource-table/resource-table.component';

import { HumanizedFilter } from '../resource-table/filters/humanized-filter';
import { AttributeReflections } from '../resource-table/reflections/attribute-reflections';

import { ResourceApiService } from '../resource-api.service';

@Component({
  selector: 'app-resource-table-no-binding',
  templateUrl: './resource-table-no-binding.component.html',
  styleUrls: ['./resource-table-no-binding.component.scss']
})
export class ResourceTableNoBindingComponent implements OnInit {

  /* The API service to query for resources to display in the table */
  @Input() apiService: ResourceApiService;

  /* The current table page */
  page = new ResourceTablePage(0, 10, 0);

  /* The table configuration to use when displaying the resources */
  @Input() tableConfig: ResourceTableConfig = new ResourceTableConfig();

  humanizedFilters: HumanizedFilter[];
  @Input() filters: string[] = [];

  reflection: AttributeReflections;

  /* Resource rows to display in the table */
  rows: any[] = [];

  @Input() scope: any;

  sort: ResourceTableSort[] = [];

  /* Whether to show a loading graphic. Initially displayed while the first
   * set of rows is loaded, but page changes do not display the graphic.
   */
  loading = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    this.reloadData();
  }

  onPageChange(page): void {
    this.page.turn(page.offset, page.limit, this.page.total);
    this.reloadData();
  }

  onSortChange(newSorts: ResourceTableSort[]) {
    this.sort = newSorts;

    this.reloadData();
  }

  onFilterRemoved(humanizedFilter: HumanizedFilter): void {
    this.filters = filter(this.filters, (expression: string) => expression !== humanizedFilter.expression);

    this.reloadData();
  }

  onFilterApply(filter: string | null) {
    if (typeof filter === 'string') {
      this.filters = this.filters.concat([filter]);
      this.reloadData();
    }
  }

  reloadData() {
    if (!this.apiService) {
      return;
    }

    let query = {};

    if (!!this.filters) {
      query['filter'] = this.filters;
    }

    if (this.sort) {
      query['sort'] = this.sort.map((s: ResourceTableSort) => {
        const sortColumn = this.tableConfig.columns[s.column];

        if (!!sortColumn) {
          return `${s.direction}(${sortColumn.sort})`;
        } else {
          return null;
        }
      }).filter((s: string | null) => !!s);
    }

    if (this.scope) {
      query = mergeWith(query, this.scope, (obj, src) => {
        if (isArray(obj) && isArray(src)) {
          return obj.concat(src);
        }
      });
    }

    this.apiService.index(this.page.offset, this.page.limit, query).subscribe((res: any) => {
      this.rows = res.data;
      this.reflection = res.meta.reflection;
      this.page.turn(res.meta.page.pageOffset, res.meta.page.pageLimit, res.meta.page.itemCount);
      this.loading = false;

      // We don't want to show scope filters
      const humanizedFilters = omit(res.meta.filterLabels, get(this.scope, 'filter', []));

      this.humanizedFilters = [];
      for (let key of Object.keys(humanizedFilters)) {
        this.humanizedFilters.push({
          expression: key,
          humanized: humanizedFilters[key] || 'Custom filter'
        });
      }
    }, (err: any) => {
      this.loading = false;
    });
  }

}
