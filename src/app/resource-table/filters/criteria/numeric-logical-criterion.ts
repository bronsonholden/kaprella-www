import { Type } from '@angular/core';
import { BaseCriterion } from './base-criterion';

export class NumericLogicalCriterion extends BaseCriterion {
  constructor(public operator: string, private operatorTitle: string, public valueBuilderComponent: Type<any>) {
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
