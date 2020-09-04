import { Type } from '@angular/core';
import { StringCriterion } from './string-criterion';

export class StringEqualsCriterion extends StringCriterion {
  get option(): string {
    return '==';
  }

  get title(): string {
    return 'Exactly matches';
  }

  generateFilter(values: any[]) {
    return `${this.dimension}=="${this.escapeString(values[0])}"`;
  }
}
