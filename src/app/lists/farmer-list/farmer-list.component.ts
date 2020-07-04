import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ResourceTableConfig,
  ResourceTableColumnAttributeValue,
  ResourceTableColumnLinkDisplay,
  ResourceTableColumnDisplay,
  ResourceTablePage
} from '../../resource-table/resource-table.component';

@Component({
  selector: 'app-farm-list',
  templateUrl: './farmer-list.component.html',
  styleUrls: ['./farmer-list.component.scss']
})
export class FarmerListComponent implements OnInit {

  page = new ResourceTablePage();
  farmers = [];
  loading = true;

  tableConfig: ResourceTableConfig = {
    columns: {
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

  constructor() { }

  ngOnInit(): void {
    this.farmers = [];
  }

}
