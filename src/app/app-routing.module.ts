import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldListComponent } from './lists/field-list/field-list.component';
import { MatResourceTableComponent } from './mat-resource-table/mat-resource-table.component';

const routes: Routes = [
  {
    path: 'fields',
    component: FieldListComponent
  },
  {
    path: 'table',
    component: MatResourceTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
