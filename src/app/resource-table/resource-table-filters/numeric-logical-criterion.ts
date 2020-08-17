import { BaseFilter } from './base-filter';

export class NumericLogicalCriterion extends BaseFilter {
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
    return `prop("${property}")${this.option}${values[0]}`;
  }
}
