/* Layout directive for the custom lt-w500 breakpoint. */

import { Directive } from '@angular/core';
import { LayoutDirective } from '@angular/flex-layout';

const selector = `[fxLayout.lt-w500]`;
const inputs = ['fxLayout.lt-w500'];

@Directive({selector, inputs})
export class LayoutLtW500Directive extends LayoutDirective {
  protected inputs = inputs;
}
