import { Component, OnInit } from '@angular/core';
import { LicensorApiService } from '../../licensor-api.service';

import {
  ResourceTableConfig,
  ResourceTablePage
} from '../../resource-table/resource-table.component';

@Component({
  selector: 'app-licensor-list',
  templateUrl: './licensor-list.component.html',
  styleUrls: ['./licensor-list.component.scss']
})
export class LicensorListComponent implements OnInit {

  tableConfig: ResourceTableConfig = {
    columns: {
      id: {
        title: 'ID',
        value: {
          type: 'id'
        },
        display: {
          type: 'text'
        }
      },
      name: {
        title: 'Name',
        value: {
          type: 'id'
        },
        display: {
          type: 'link',
          label: {
            type: 'attribute',
            path: 'name'
          }
        }
      }
    },
    displayedColumns: [
      'select',
      'name'
    ]
  };

  scope: {};

  constructor(public licensorApi: LicensorApiService) { }

  ngOnInit(): void {
  }

}
