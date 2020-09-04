import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

export abstract class ValueBuilder {
  valueFormGroup: FormGroup;

  public abstract valueChange: EventEmitter<[number] | [string] | [number, number]>;

  get valid(): boolean {
    return this.valueFormGroup.valid;
  }
}
