import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-string-value-builder',
  templateUrl: './string-value-builder.component.html',
  styleUrls: ['./string-value-builder.component.scss']
})
export class StringValueBuilderComponent implements OnInit {
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string[]>();
  valueFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.valueFormGroup = this.formBuilder.group({
      value: ['', Validators.required]
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
