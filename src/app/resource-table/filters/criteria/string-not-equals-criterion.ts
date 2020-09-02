import { Type } from '@angular/core';
import { StringCriterion } from './string-criterion';

export class StringNotEqualsCriterion extends StringCriterion {
  constructor(private operator: string, private operatorTitle: string, public valueBuilderComponent: Type<any>) {
    super();
  }

  get option(): string {
    return this.operator;
  }

  get title(): string {
    return this.operatorTitle;
  }

  generate(property: string, values: any[]) {
    return `prop("${property}")!="${this.escapeString(values[0])}"`;
  }
}
