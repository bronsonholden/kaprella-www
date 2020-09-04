import { Type, OnDestroy } from '@angular/core';
import { NumericCriterion } from './numeric-criterion';

export class NumericGreaterThanCriterion extends NumericCriterion {
  get option(): string {
    return '>';
  }

  get title(): string {
    return 'Greater than';
  }
}
