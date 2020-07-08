import { Component, OnInit } from '@angular/core';
import { FieldApiService } from '../../field-api.service';

import {
  ResourceTableConfig,
  ResourceTablePage
} from '../../resource-table/resource-table.component';

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss']
})
export class FieldListComponent implements OnInit {

  loading = true;

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
      },
      area: {
        title: 'Area',
        value: {
          type: 'attribute',
          path: 'area'
        },
        display: {
          type: 'text'
        }
      }
    },
    displayedColumns: [
      'select',
      'name',
      'area'
    ]
  };

  constructor(public fieldApi: FieldApiService) { }

  ngOnInit(): void {
  }

}
