import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ApiModule } from './api.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CustomWidthBreakPoints } from './flex-ext/custom-width-break-points';
import { LayoutGtW500Directive } from './flex-ext/layout-gt-w500.directive';
import { LayoutLtW500Directive } from './flex-ext/layout-lt-w500.directive';

import { ResourceTableComponent } from './resource-table/resource-table.component';
import { FieldListComponent } from './lists/field-list/field-list.component';
import { TouchResizeableDirective } from './touch-resizeable.directive';
import { PointerResizeableDirective } from './pointer-resizeable.directive';
import { ResourceTableCellComponent } from './resource-table/resource-table-cell/resource-table-cell.component';
import { FarmerListComponent } from './lists/farmer-list/farmer-list.component';
import { ResourceTableRouteBindingComponent } from './resource-table-route-binding/resource-table-route-binding.component';
import { TipsComponent } from './tips/tips.component';
import { ShowFieldComponent } from './show/show-field/show-field.component';
import { ShowFarmerComponent } from './show/show-farmer/show-farmer.component';
import { CreateFieldComponent } from './create/create-field/create-field.component';
import { CreateFarmerComponent } from './create/create-farmer/create-farmer.component';
import { DrawBoundaryComponent } from './maps/draw-boundary/draw-boundary.component';
import { FieldFormComponent } from './forms/field-form/field-form.component';
import { HomeComponent } from './home/home.component';
import { PlantVarietyListComponent } from './lists/plant-variety-list/plant-variety-list.component';
import { ShowPlantVarietyComponent } from './show/show-plant-variety/show-plant-variety.component';
import { CreatePlantVarietyComponent } from './create/create-plant-variety/create-plant-variety.component';

@NgModule({
  declarations: [
    AppComponent,
    ResourceTableComponent,
    FieldListComponent,
    TouchResizeableDirective,
    PointerResizeableDirective,
    LayoutGtW500Directive,
    LayoutLtW500Directive,
    ResourceTableCellComponent,
    FarmerListComponent,
    ResourceTableRouteBindingComponent,
    TipsComponent,
    ShowFieldComponent,
    ShowFarmerComponent,
    CreateFieldComponent,
    CreateFarmerComponent,
    DrawBoundaryComponent,
    FieldFormComponent,
    HomeComponent,
    PlantVarietyListComponent,
    ShowPlantVarietyComponent,
    CreatePlantVarietyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    GooglePlaceModule,
    ApiModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxDatatableModule
  ],
  providers: [
    CustomWidthBreakPoints
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
