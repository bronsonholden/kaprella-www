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
        sort: 'prop("name")',
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
      farmerName: {
        title: 'Farmer',
        sort: 'lookup_s("farmer", "name")',
        value: {
          type: 'concat',
          parts: [
            {
              type: 'literal',
              value: 'farmers'
            },
            {
              type: 'relationship',
              name: 'farmer'
            }
          ],
          separator: '/'
        },
        display: {
          type: 'link',
          label: {
            type: 'meta',
            path: 'farmerName'
          },
          absolute: true
        }
      },
      area: {
        title: 'Area',
        sort: 'st_area(prop("boundary"))',
        value: {
          type: 'meta',
          path: 'boundaryArea'
        },
        display: {
          type: 'fieldArea',
          unit: 'ha',
          format: '%.2f'
        }
      }
    },
    displayedColumns: [
      'select',
      'name',
      'farmerName',
      'area'
    ]
  };

  scope = {
    generate: {
      farmerName: 'lookup_s("farmer", "name")'
    }
  }

  constructor(public fieldApi: FieldApiService) { }

  ngOnInit(): void {
  }

}
