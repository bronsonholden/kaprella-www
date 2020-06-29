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

import { ResourceTableComponent } from './resource-table/resource-table.component';
import { FieldListComponent } from './lists/field-list/field-list.component';
import { MobileResizeableDirective } from './mobile-resizeable.directive';
import { MatResourceTableComponent } from './mat-resource-table/mat-resource-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ResourceTableComponent,
    FieldListComponent,
    MobileResizeableDirective,
    MatResourceTableComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
