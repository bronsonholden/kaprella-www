import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

export abstract class ValueBuilder {
  valueFormGroup: FormGroup;

  public abstract valueChange: EventEmitter<[number] | [string] | [number, number] | [moment.Moment]>;

  get valid(): boolean {
    return this.valueFormGroup.valid;
  }
}
