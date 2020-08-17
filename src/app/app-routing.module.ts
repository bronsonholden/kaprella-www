import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FieldListComponent } from './lists/field-list/field-list.component';
import { FarmerListComponent } from './lists/farmer-list/farmer-list.component';
import { LicensorListComponent } from './lists/licensor-list/licensor-list.component';
import { PlantVarietyListComponent } from './lists/plant-variety-list/plant-variety-list.component';
import { CreateFieldComponent } from './create/create-field/create-field.component';
import { CreateFarmerComponent } from './create/create-farmer/create-farmer.component';
import { CreateLicensorComponent } from './create/create-licensor/create-licensor.component';
import { CreatePlantVarietyComponent } from './create/create-plant-variety/create-plant-variety.component';
import { ShowFieldComponent } from './show/show-field/show-field.component';
import { ShowFarmerComponent } from './show/show-farmer/show-farmer.component';
import { ShowLicensorComponent } from './show/show-licensor/show-licensor.component';
import { ShowPlantVarietyComponent } from './show/show-plant-variety/show-plant-variety.component';
import { FieldMapComponent } from './maps/field-map/field-map.component';
import { FilterCatalogComponent } from './resource-table/filters/filter-catalog/filter-catalog.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'map',
    children: [
      {
        path: 'fields',
        component: FieldMapComponent
      }
    ]
  },
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
        component: ShowFarmerComponent,
        children: [
          {
            path: '',
            component: FieldListComponent,
            outlet: 'farmer-fields-outlet'
          }
        ]
      }
    ]
  },
  {
    path: 'licensors',
    children: [
      {
        path: '',
        component: LicensorListComponent
      },
      {
        path: 'new',
        component: CreateLicensorComponent
      },
      {
        path: ':id',
        component: ShowLicensorComponent
      }
    ]
  },
  {
    path: 'plantVarieties',
    children: [
      {
        path: '',
        component: PlantVarietyListComponent
      },
      {
        path: 'new',
        component: CreatePlantVarietyComponent
      },
      {
        path: ':id',
        component: ShowPlantVarietyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
