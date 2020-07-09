import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
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
import { ResourceTableCellLinkComponent } from './resource-table/resource-table-cell/resource-table-cell-link/resource-table-cell-link.component';
import { FarmerListComponent } from './lists/farmer-list/farmer-list.component';
import { ResourceTableRouteBindingComponent } from './resource-table-route-binding/resource-table-route-binding.component';
import { TipsComponent } from './tips/tips.component';

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
    ResourceTableCellLinkComponent,
    FarmerListComponent,
    ResourceTableRouteBindingComponent,
    TipsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
