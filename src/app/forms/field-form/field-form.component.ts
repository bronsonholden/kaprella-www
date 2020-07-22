import {
  Component,
  OnInit,
  OnChanges,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { FarmerApiService } from '../../farmer-api.service';

@Component({
  selector: 'app-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.scss']
})
export class FieldFormComponent implements OnInit, OnChanges {

  @Input() field: any;
  @Output() fieldChange = new EventEmitter<any>();
  fieldFormGroup: FormGroup;

  farmers: any[] = [];

  constructor(private farmerApi: FarmerApiService,
              private formBuilder: FormBuilder) {
    this.fieldFormGroup = this.formBuilder.group({
      name: [],
      farmerId: [],
      boundary: []
    });
  }

  ngOnInit(): void {
    this.fieldFormGroup.valueChanges.subscribe(val => {
      this.fieldChange.emit(val);
    });

    this.farmerApi.index(0, 100).subscribe((res: any) => {
      this.farmers = res.data;
    });
  }

  ngOnChanges(changes) {
    if (changes.field) {
      if (changes.field.firstChange) {
        this.fieldFormGroup.patchValue(changes.field.currentValue);
      } else {
        this.fieldFormGroup.patchValue(changes.field.currentValue, { emitEvent: false });
      }
    }
  }

}
