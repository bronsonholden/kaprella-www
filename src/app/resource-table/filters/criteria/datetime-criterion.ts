import { Type } from '@angular/core';
import { BaseCriterion } from './base-criterion';
import { ValueBuilder } from '../../value-builders/value-builder';
import { DatetimeValueBuilderComponent } from '../../value-builders/datetime-value-builder/datetime-value-builder.component';

import * as moment from 'moment';

export abstract class DatetimeCriterion extends BaseCriterion {
  _valueBuilder: DatetimeValueBuilderComponent;

  get valueBuilderType(): Type<ValueBuilder> {
    return DatetimeValueBuilderComponent;
  }

  set valueBuilder(val: DatetimeValueBuilderComponent) {
    this._valueBuilder = val;
    this._valueBuilder.valueChange.subscribe((val: [moment.Moment]) => {
      this.filterChange.emit(this.generateFilter(val));
    });
  }

  abstract generateFilter(val: [moment.Moment]): string;

  get valueBuilder(): DatetimeValueBuilderComponent {
    return this._valueBuilder;
  }
}
