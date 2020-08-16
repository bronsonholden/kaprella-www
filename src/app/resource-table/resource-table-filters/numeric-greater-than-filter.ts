import { BaseFilter } from './base-filter';

export class NumericGreaterThanFilter extends BaseFilter {
  get option(): string {
    return '>';
  }

  get title(): string {
    return 'Greater than';
  }

  generate(property: string, values: any[]) {
    return `prop("${property}")>${values[0]}`;
  }
}
