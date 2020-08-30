import { BaseCriterion } from './base-criterion';

export class StringCriterion extends BaseCriterion {
  escapeString(value: string) {
    return value.replace(/"/g, '\\"');
  }
}
