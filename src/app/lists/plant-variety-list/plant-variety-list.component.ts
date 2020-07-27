import { Component, OnInit } from '@angular/core';
import { PlantVarietyApiService } from '../../plant-variety-api.service';
import { ResourceTableConfig } from '../../resource-table/resource-table.component';

@Component({
  selector: 'app-plant-variety-list',
  templateUrl: './plant-variety-list.component.html',
  styleUrls: ['./plant-variety-list.component.scss']
})
export class PlantVarietyListComponent implements OnInit {

  tableConfig: ResourceTableConfig = {
    columns: {
      denomination: {
        title: 'Denomination',
        value: {
          type: 'id'
        },
        display: {
          type: 'link',
          label: {
            type: 'attribute',
            path: 'denomination'
          }
        }
      },
      genus: {
        title: 'Genus',
        value: {
          type: 'attribute',
          path: 'genus'
        },
        display: {
          type: 'text'
        }
      },
      trademark: {
        title: 'Trademark',
        value: {
          type: 'attribute',
          path: 'trademark'
        },
        display: {
          type: 'text'
        }
      }
    },
    displayedColumns: [
      'select',
      'denomination',
      'genus',
      'trademark'
    ]
  };

  scope = {};

  constructor(public plantVarietyApi: PlantVarietyApiService) { }

  ngOnInit(): void {
  }

}
