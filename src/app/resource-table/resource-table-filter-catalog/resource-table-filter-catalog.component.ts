import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  FilterCatalogDialogComponent,
  FilterCatalogDialogData
} from '../filters/filter-catalog-dialog/filter-catalog-dialog.component';

@Component({
  selector: 'app-resource-table-filter-catalog',
  templateUrl: './resource-table-filter-catalog.component.html',
  styleUrls: ['./resource-table-filter-catalog.component.scss']
})
export class ResourceTableFilterCatalogComponent implements OnInit {

  @Input() reflection: any;
  @Output() filterCreated = new EventEmitter<any>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openFilterCatalogDialog(): void {
    const dialogRef = this.dialog.open(FilterCatalogDialogComponent, {
      maxWidth: 'calc(100vw - 24px)',
      maxHeight: 'calc(100vh - 24px)',
      height: 'calc(100% - 24px)',
      width: '600px',
      data: {
        reflection: this.reflection
      }
    });

    dialogRef.afterClosed().subscribe((filter: string) => {
      this.filterCreated.emit(filter);
    });
  }

}
