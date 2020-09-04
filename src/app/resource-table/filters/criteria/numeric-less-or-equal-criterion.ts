import { Type, OnDestroy } from '@angular/core';
import { NumericCriterion } from './numeric-criterion';

export class NumericLessOrEqualCriterion extends NumericCriterion {
  get option(): string {
    return '=<';
  }

  get title(): string {
    return 'Less than or equal to';
  }
}
