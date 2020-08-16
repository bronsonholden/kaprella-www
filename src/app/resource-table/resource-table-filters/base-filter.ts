export abstract class BaseFilter {
  constructor() {
  }

  abstract get option(): string;
  abstract get title(): string;
  abstract generate(property: string, values: any[]): string;
}
