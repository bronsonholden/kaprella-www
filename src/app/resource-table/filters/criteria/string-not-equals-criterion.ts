import { Type } from '@angular/core';
import { StringCriterion } from './string-criterion';

export class StringNotEqualsCriterion extends StringCriterion {
  get option(): string {
    return '!=';
  }

  get title(): string {
    return 'Does not match';
  }

  generateFilter(values: [string]): string {
    return `${this.dimension}!="${this.escapeString(values[0])}"`;
  }
}
