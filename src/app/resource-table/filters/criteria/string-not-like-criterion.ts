import { Type } from '@angular/core';
import { StringCriterion } from './string-criterion';

export class StringNotLikeCriterion extends StringCriterion {
  get option(): string {
    return 'unlike';
  }

  get title(): string {
    return 'Not like';
  }

  generateFilter(values: [string]): string {
    return `unlike(${this.dimension}, "${this.escapeString(values[0])}")`;
  }
}
