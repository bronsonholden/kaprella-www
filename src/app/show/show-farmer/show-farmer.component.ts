import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldApiService } from '../../field-api.service';
import { FarmerApiService } from '../../farmer-api.service';
import { ResourceTableConfig } from '../../resource-table/resource-table.component';

@Component({
  selector: 'app-show-farmer',
  templateUrl: './show-farmer.component.html',
  styleUrls: ['./show-farmer.component.scss']
})
export class ShowFarmerComponent implements OnInit {
  boundary: string;
  fieldTableConfig: ResourceTableConfig = {
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
          type: 'concat',
          parts: [
            {
              type: 'literal',
              value: 'fields'
            },
            {
              type: 'id'
            }
          ],
          separator: '/'
        },
        display: {
          type: 'link',
          absolute: true,
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
          type: 'fieldArea',
          unit: 'ha',
          format: '%.2f'
        }
      }
    },
    displayedColumns: [
      'select',
      'name',
      'area'
    ]
  };

  scope;
  farmer: any;

  constructor(public fieldApi: FieldApiService,
              private farmerApi: FarmerApiService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.scope = {
        'filter': [ `prop('farmer_id') == ${params.id}` ]
      };

      this.farmerApi.get(params.id).subscribe((res: any) => {
        this.farmer = res.data;
      });
    });
  }

}
