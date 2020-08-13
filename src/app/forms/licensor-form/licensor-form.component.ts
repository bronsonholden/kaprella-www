import {
  Component,
  OnInit,
  OnChanges,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-licensor-form',
  templateUrl: './licensor-form.component.html',
  styleUrls: ['./licensor-form.component.scss']
})
export class LicensorFormComponent implements OnInit, OnChanges {

  @Input() licensor: any;
  @Output() licensorChange = new EventEmitter<any>();
  licensorFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.licensorFormGroup = this.formBuilder.group({
      type: ['licensors'],
      attributes: this.formBuilder.group({
        name: []
      })
    });
  }

  ngOnInit(): void {
    this.licensorFormGroup.valueChanges.subscribe(val => {
      this.licensorChange.emit(val);
    });
  }

  ngOnChanges(changes): void {
    if (changes.licensor) {
      if (changes.licensor.firstChange) {
        this.licensorFormGroup.patchValue(changes.licensor.currentValue);
      } else {
        this.licensorFormGroup.patchValue(changes.licensor.currentValue, { emitEvent: false });
      }
    }
  }

}
