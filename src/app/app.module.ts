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

@NgModule({
  declarations: [
    AppComponent,
    ResourceTableComponent,
    FieldListComponent,
    TouchResizeableDirective,
    PointerResizeableDirective,
    LayoutGtW500Directive,
    LayoutLtW500Directive
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
