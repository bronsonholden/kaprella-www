import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { filter, mergeWith, isArray, isNil, omit, get } from 'lodash-es';

import {
  ResourceTableConfig,
  ResourceTableSort,
  ResourceTablePage
} from '../resource-table/resource-table.component';

import { HumanizedFilter } from '../resource-table/filters/humanized-filter';
import { AttributeReflections } from '../resource-table/reflections/attribute-reflections';

import { ActivatedRoute, Router } from '@angular/router';
import { ResourceApiService } from '../resource-api.service';

@Component({
  selector: 'app-resource-table-route-binding',
  templateUrl: './resource-table-route-binding.component.html',
  styleUrls: ['./resource-table-route-binding.component.scss']
})
export class ResourceTableRouteBindingComponent implements OnInit {

  /* The API service to query for resources to display in the table */
  @Input() apiService: ResourceApiService;

  /* A set of query parameters that are always provided in the query */
  @Input() scope: any;

  filters: string[] = [];
  humanizedFilters: HumanizedFilter[];
  reflection: AttributeReflections;

  /* Whether interacting with the table updates the activated route's
   * query parameters.
   */
  @Input() updateQuery = true;

  /* The current table page */
  page = new ResourceTablePage(0, 10, 0);

  /* Emits pages when the paginator is updated (e.g. next page or page size
   * is changed).
   */
  @Output() pageChange = new EventEmitter<ResourceTablePage>();

  /* The table configuration to use when displaying the resources */
  @Input() tableConfig: ResourceTableConfig = new ResourceTableConfig();

  /* Resource rows to display in the table */
  rows: any[] = [];

  /* Whether to show a loading graphic. Initially displayed while the first
   * set of rows is loaded, but page changes do not display the graphic.
   */
  loading = true;

  sort: ResourceTableSort[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      ['offset', 'limit'].forEach((key: string) => {
        const param = parseInt(params[key]);

        if (!isNaN(param)) {
          if (param !== this.page[key]) {
            this.page[key] = param;
          }
        }
      });

      const newFilters = params['filter'];
      if (typeof newFilters === 'string') {
        this.filters = [newFilters];
      } else if (isArray(newFilters)) {
        this.filters = newFilters;
      } else {
        this.filters = [];
      }

      let newSorts = params['sort'];
      if (typeof newSorts === 'string') {
        newSorts = [newSorts];
      } else if (isNil(newSorts)) {
        newSorts = [];
      }

      this.sort = newSorts.map((sort: string) => {
        if (sort[0] === '-') {
          return {
            direction: 'desc',
            column: sort.slice(1)
          };
        } else {
          return {
            direction: 'asc',
            column: sort
          }
        }
      });

      this.reloadData();
    });

    const query = this.activatedRoute.snapshot.queryParams;

    /* Do an initial load of data if no query params are present in the
     * route that would trigger a reload.
     */
    if (!query.limit && !query.offset) {
      this.reloadData();
    } else if (parseInt(query.limit) === this.page.limit && parseInt(query.offset) === this.page.offset) {
      // If exactly the same, a reload won't happen, so do it here
      this.reloadData();
    }

  }

  onPageChange(page): void {
    if (this.updateQuery) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          offset: `${page.offset}`,
          limit: `${page.limit}`
        },
        queryParamsHandling: 'merge',
      });
    } else {
      this.page.turn(page.offset, page.limit, this.page.total);
      this.reloadData();
    }
  }

  onSortChange(newSort: ResourceTableSort[]): void {
    const sorts = newSort.map((s: ResourceTableSort) => `${s.direction === 'desc' ? '-' : ''}${s.column}`);

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        sort: sorts.length > 0 ? sorts : null
      },
      queryParamsHandling: 'merge'
    });
  }

  onFilterRemoved(humanizedFilter: HumanizedFilter): void {
    const filters = filter(this.filters, (expression: string) => expression !== humanizedFilter.expression);
    let queryParams;

    if (filters.length > 0) {
      queryParams = { filter: filters };
    } else {
      queryParams = { filter: null };
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onFilterApply(filter: string | null) {
    if (typeof filter === 'string') {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          filter: this.filters.concat([filter])
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  reloadData(): void {
    if (!this.apiService) {
      return;
    }

    let query = {};

    if (this.filters) {
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
          expression: key.replace(/%2[Bb]/g, '+'),
          humanized: humanizedFilters[key] || 'Custom filter'
        });
      }
    }, (err: any) => {
      this.loading = false;
    });
  }

}
