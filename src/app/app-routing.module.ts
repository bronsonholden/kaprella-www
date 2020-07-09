import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldListComponent } from './lists/field-list/field-list.component';
import { FarmerListComponent } from './lists/farmer-list/farmer-list.component';
import { CreateFieldComponent } from './create/create-field/create-field.component';
import { CreateFarmerComponent } from './create/create-farmer/create-farmer.component';
import { ShowFieldComponent } from './show/show-field/show-field.component';
import { ShowFarmerComponent } from './show/show-farmer/show-farmer.component';

const routes: Routes = [
  {
    path: 'fields',
    children: [
      {
        path: '',
        component: FieldListComponent
      },
      {
        path: 'new',
        component: CreateFieldComponent
      },
      {
        path: ':id',
        component: ShowFieldComponent
      }
    ]
  },
  {
    path: 'farmers',
    children: [
      {
        path: '',
        component: FarmerListComponent
      },
      {
        path: 'new',
        component: CreateFarmerComponent
      },
      {
        path: ':id',
        component: ShowFarmerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
