import { StringCriterion } from './string-criterion';

export class StringLikeCriterion extends StringCriterion {
  constructor(private operator: string, private operatorTitle: string) {
    super();
  }

  get option(): string {
    return this.operator;
  }

  get title(): string {
    return this.operatorTitle;
  }

  generate(property: string, values: any[]) {
    return `like(prop("${property}"), "${this.escapeString(values[0])}")`;
  }
}
