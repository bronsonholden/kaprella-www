import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[filterCatalogValue]',
})
export class FilterCatalogValueDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
