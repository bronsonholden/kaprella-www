/* Define some custom media breakpoints to use in Angular flex-layout */

import { BREAKPOINT } from '@angular/flex-layout';

const WIDTH_BREAKPOINTS = [
  { /* Screens with less than 500px width */
    alias: 'lt-w500',
    suffix: 'LtW500',
    mediaQuery: 'screen and (max-width: 499px)',
    overlapping: false
  },
  { /* Screens with at least 500px width */
    alias: 'gt-w500',
    suffix: 'GtW500',
    mediaQuery: 'screen and (min-width: 500px)',
    overlapping: false
  }
];

export const CustomWidthBreakPoints = {
  provide: BREAKPOINT,
  useValue: WIDTH_BREAKPOINTS,
  multi: true
};
