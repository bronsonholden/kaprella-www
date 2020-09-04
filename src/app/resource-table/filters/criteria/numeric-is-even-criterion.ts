import { Type } from '@angular/core';
import { NumericCriterion } from './numeric-criterion';

export class NumericIsEvenCriterion extends NumericCriterion {
  get option(): string {
    return 'is_even';
  }

  get title(): string {
    return 'Is even';
  }

  generateFilter(val: [number]) {
    return `is_even(${val[0]})`;
  }
}
