import { Type } from '@angular/core';
import { BaseCriterion } from './base-criterion';
import { ValueBuilder } from '../../value-builders/value-builder';
import { IntegerValueBuilderComponent } from '../../value-builders/integer-value-builder/integer-value-builder.component';

export abstract class NumericCriterion extends BaseCriterion {
  _valueBuilder: IntegerValueBuilderComponent;

  get valueBuilderType(): Type<ValueBuilder> {
    return IntegerValueBuilderComponent;
  }

  set valueBuilder(val: IntegerValueBuilderComponent) {
    this._valueBuilder = val;
    this._valueBuilder.valueChange.subscribe((val: [number]) => {
      this.filterChange.emit(this.generateFilter(val));
    });
  }

  generateFilter(val: [number]) {
    return `${this.dimension}${this.option}${val[0]}`;
  }

  get valueBuilder(): IntegerValueBuilderComponent {
    return this._valueBuilder;
  }
}
