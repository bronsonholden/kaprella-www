import { Type } from '@angular/core';
import { BaseCriterion } from './base-criterion';
import { ValueBuilder } from '../../value-builders/value-builder';
import { StringValueBuilderComponent } from '../../value-builders/string-value-builder/string-value-builder.component';

export abstract class StringCriterion extends BaseCriterion {
  _valueBuilder: StringValueBuilderComponent;

  escapeString(value: string) {
    return value.replace(/"/g, '\\"');
  }

  get valueBuilderType(): Type<ValueBuilder> {
    return StringValueBuilderComponent;
  }

  set valueBuilder(val: StringValueBuilderComponent) {
    this._valueBuilder = val;
    this._valueBuilder.valueChange.subscribe((val: [string]) => {
      this.filterChange.emit(this.generateFilter(val));
    });
  }

  abstract generateFilter(val: [string]): string;

  get valueBuilder(): StringValueBuilderComponent {
    return this._valueBuilder;
  }
}
