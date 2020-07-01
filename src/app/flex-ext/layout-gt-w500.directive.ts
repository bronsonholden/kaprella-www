/* Layout directive for the custom gt-w500 breakpoint. */

import { Directive } from '@angular/core';
import { LayoutDirective } from '@angular/flex-layout';

const selector = `[fxLayout.gt-w500]`;
const inputs = ['fxLayout.gt-w500'];

@Directive({selector, inputs})
export class LayoutGtW500Directive extends LayoutDirective {
  protected inputs = inputs;
}
