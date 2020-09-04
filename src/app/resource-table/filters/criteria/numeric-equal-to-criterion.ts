import { Type, OnDestroy } from '@angular/core';
import { NumericCriterion } from './numeric-criterion';

export class NumericEqualToCriterion extends NumericCriterion {
  get option(): string {
    return '==';
  }

  get title(): string {
    return 'Equal to';
  }
}
