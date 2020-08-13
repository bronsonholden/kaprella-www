import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { mergeWith, isArray } from 'lodash-es';

import {
  ResourceTableConfig,
  ResourceTablePage
} from '../resource-table/resource-table.component';

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

  filters: any;

  /* Whether interacting with the table updates the activated route's
   * query parameters.
   */
  @Input() updateQuery = true;

  /* The current table page */
  page: ResourceTablePage;

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

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let reload = false;

      // Handle pagination query parameters
      if (typeof this.page === 'undefined') {
        reload = true;
        this.page = new ResourceTablePage(0, 10, 0);
      } else {
        ['offset', 'limit'].forEach((key: string) => {
          const param = parseInt(params[key]);

          if (typeof param !== 'undefined') {
            if (param !== this.page[key]) {
              reload = true;
              this.page[key] = param;
            }
          }
        });
      }

      if (typeof params['filter'] !== 'undefined') {
        reload = true;
        let newFilters = params['filter'];
        if (!isArray(newFilters)) {
          newFilters = [newFilters];
        }
        this.filters = newFilters;
      }

      if (reload) {
        this.reloadData();
      }
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

  reloadData(): void {
    if (!this.apiService) {
      return;
    }

    let query = {};

    if (this.filters) {
      query['filter'] = this.filters;
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
      this.page.turn(res.meta.page.pageOffset, res.meta.page.pageLimit, res.meta.page.itemCount);
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
    });
  }

}
