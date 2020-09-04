import { Type, OnDestroy } from '@angular/core';
import { NumericCriterion } from './numeric-criterion';

export class NumericLessThanCriterion extends NumericCriterion {
  get option(): string {
    return '<';
  }

  get title(): string {
    return 'Less than';
  }
}
