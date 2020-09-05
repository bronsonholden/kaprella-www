import { Type } from '@angular/core';
import { BaseCriterion } from './base-criterion';
import { ValueBuilder } from '../../value-builders/value-builder';
import { NumericValueBuilderComponent } from '../../value-builders/numeric-value-builder/numeric-value-builder.component';

export abstract class NumericCriterion extends BaseCriterion {
  _valueBuilder: NumericValueBuilderComponent;

  get valueBuilderType(): Type<ValueBuilder> {
    return NumericValueBuilderComponent;
  }

  set valueBuilder(val: NumericValueBuilderComponent) {
    this._valueBuilder = val;
    this._valueBuilder.valueChange.subscribe((val: [number]) => {
      this.filterChange.emit(this.generateFilter(val));
    });
  }

  generateFilter(val: [number]) {
    return `${this.dimension}${this.option}${val[0]}`;
  }

  get valueBuilder(): NumericValueBuilderComponent {
    return this._valueBuilder;
  }
}
