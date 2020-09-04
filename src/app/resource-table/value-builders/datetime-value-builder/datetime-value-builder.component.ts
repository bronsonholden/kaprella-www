import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValueBuilder } from '../value-builder';

import * as moment from 'moment';

@Component({
  selector: 'app-datetime-value-builder',
  templateUrl: './datetime-value-builder.component.html',
  styleUrls: ['./datetime-value-builder.component.scss']
})
export class DatetimeValueBuilderComponent extends ValueBuilder implements OnInit {
  @Input() value: moment.Moment;
  @Output() valueChange = new EventEmitter<[moment.Moment]>();

  constructor(private formBuilder: FormBuilder) {
    super();
    this.valueFormGroup = this.formBuilder.group({
      value: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.valueFormGroup.valueChanges.subscribe(({ value }) => {
      this.valueChange.emit([value]);
    });
  }

  ngOnChanges(changes): void {
    if (changes.value) {
      if (changes.value.firstChange) {
        this.valueFormGroup.patchValue(changes.value.currentValue);
      } else {
        this.valueFormGroup.patchValue(changes.value.currentValue, { emitEvent: false });
      }
    }
  }

  get valid(): boolean {
    return this.valueFormGroup.valid;
  }
}
