import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldListComponent } from './lists/field-list/field-list.component';
import { FarmerListComponent } from './lists/farmer-list/farmer-list.component';

const routes: Routes = [
  {
    path: 'fields',
    component: FieldListComponent
  },
  {
    path: 'farmers',
    component: FarmerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
