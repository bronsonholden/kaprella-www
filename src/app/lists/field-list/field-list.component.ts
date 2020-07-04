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
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss']
})
export class FieldListComponent implements OnInit {

  page = new ResourceTablePage();
  fields = [];
  loading = true;

  tableConfig: ResourceTableConfig = {
    columns: {
      name: {
        title: 'Name',
        columnValue: new ResourceTableColumnAttributeValue('name'),
        columnDisplay: new ResourceTableColumnLinkDisplay(new ResourceTableColumnAttributeValue('name'), new ResourceTableColumnAttributeValue('name'))
      },
      area: {
        title: 'Area',
        columnValue: new ResourceTableColumnAttributeValue('area'),
        columnDisplay: new ResourceTableColumnDisplay()
      }
    },
    displayedColumns: [
      'select',
      'name',
      'area'
    ]
  };

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('fields').subscribe((res: any) => {
      this.fields = res.data;
      this.page.turn(0, 5, res.data.length);
      this.loading = false;
    }, err => {
      console.log(err);
    })
  }

}
