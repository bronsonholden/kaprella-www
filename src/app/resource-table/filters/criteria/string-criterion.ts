import { BaseCriterion } from './base-criterion';

export abstract class StringCriterion extends BaseCriterion {
  escapeString(value: string) {
    return value.replace(/"/g, '\\"');
  }
}
