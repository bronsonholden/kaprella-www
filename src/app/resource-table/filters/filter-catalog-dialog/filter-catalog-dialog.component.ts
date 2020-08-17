import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogFilter } from '../catalog-filter';
import { AttributeReflections } from '../../reflections/attribute-reflections';

export interface FilterCatalogDialogData {
  catalogFilter?: CatalogFilter,
  reflection: AttributeReflections
}

@Component({
  selector: 'app-filter-catalog-dialog',
  templateUrl: './filter-catalog-dialog.component.html',
  styleUrls: ['./filter-catalog-dialog.component.scss']
})
export class FilterCatalogDialogComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<FilterCatalogDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData) { }

  filter: string;

  ngOnInit(): void {
  }

  onFilterChange(filter: string) {
    this.filter = filter;
  }

  applyCatalogFilter(): void {
    this.matDialogRef.close(this.filter);
  }

}
