import { Type, OnDestroy } from '@angular/core';
import { NumericCriterion } from './numeric-criterion';

export class NumericGreaterOrEqualCriterion extends NumericCriterion {
  get option(): string {
    return '>=';
  }

  get title(): string {
    return 'Greater than or equal to';
  }
}
