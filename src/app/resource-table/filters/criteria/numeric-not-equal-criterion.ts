import { Type, OnDestroy } from '@angular/core';
import { NumericCriterion } from './numeric-criterion';

export class NumericNotEqualCriterion extends NumericCriterion {
  get option(): string {
    return '!=';
  }

  get title(): string {
    return 'Not equal to';
  }
}
