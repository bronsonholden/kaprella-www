import { Type } from '@angular/core';
import { NumericCriterion } from './numeric-criterion';

export class NumericIsOddCriterion extends NumericCriterion {
  get option(): string {
    return 'is_odd';
  }

  get title(): string {
    return 'Is odd';
  }

  generateFilter(val: [number]) {
    return `is_odd(${val[0]})`;
  }
}
