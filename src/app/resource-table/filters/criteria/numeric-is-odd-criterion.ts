import { BaseCriterion } from './base-criterion';

export class NumericIsOddCriterion extends BaseCriterion {
  constructor(public operator: string, private operatorTitle: string) {
    super();
  }

  get option(): string {
    return this.operator;
  }

  get title(): string {
    return this.operatorTitle;
  }

  generate(property: string, values: any[]) {
    return `is_even(prop("${property}"))`;
  }
}
