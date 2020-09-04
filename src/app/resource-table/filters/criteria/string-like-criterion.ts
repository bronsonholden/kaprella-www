import { Type } from '@angular/core';
import { StringCriterion } from './string-criterion';

export class StringLikeCriterion extends StringCriterion {
  get option(): string {
    return 'like';
  }

  get title(): string {
    return 'Like';
  }

  generateFilter(values: [string]): string {
    return `like(${this.dimension}, "${this.escapeString(values[0])}")`;
  }
}
