import { Type, OnDestroy } from '@angular/core';
import { DatetimeCriterion } from './datetime-criterion';
import * as moment from 'moment';

export class DatetimeBeforeCriterion extends DatetimeCriterion {
  get option(): string {
    return '<';
  }

  get title(): string {
    return 'Before';
  }

  generateFilter(val: [moment.Moment]): string {
    return `${this.dimension}<'${val[0].format('YYYY-MM-DD')}'`;
  }
}
