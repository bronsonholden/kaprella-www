import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

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

  @Input() apiService: ResourceApiService;
  page: ResourceTablePage;
  @Output pageChange = new EventEmitter<ResourceTablePage>();
  @Input() tableConfig: ResourceTableConfig = new ResourceTableConfig();
  rows: any[] = [];
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
      // If exactly the same, a relaod won't happen, so do it here
      this.reloadData();
    }

  }

  ngOnChanges(changes: any): void {
  }

  onPageChange(page) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        offset: `${page.offset}`,
        limit: `${page.limit}`
      },
      queryParamsHandling: 'merge',
    });
  }

  reloadData(): void {
    if (!this.apiService) {
      return;
    }

    this.apiService.index(this.page.offset, this.page.limit, {}).subscribe((res: any) => {
      this.rows = res.data;
      this.page.turn(res.meta.page_offset, res.meta.page_limit, res.meta.item_count);
      this.loading = false;
    }, err => {
      console.log(err);
    })
  }

}
