import {
  Component,
  OnInit,
  OnChanges,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Farmer } from '../../models/farmer';

@Component({
  selector: 'app-farmer-form',
  templateUrl: './farmer-form.component.html',
  styleUrls: ['./farmer-form.component.scss']
})
export class FarmerFormComponent implements OnInit {

  @Input() farmer: Farmer;
  @Output() farmerChange = new EventEmitter<any>();
  farmerFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.farmerFormGroup = this.formBuilder.group({
      type: ['farmers'],
      attributes: this.formBuilder.group({
        name: []
      })
    });
  }

  ngOnInit(): void {
    this.farmerFormGroup.valueChanges.subscribe(val => {
      this.farmerChange.emit(val);
    });
  }

  ngOnChanges(changes): void {
    if (changes.farmer) {
      if (changes.farmer.firstChange) {
        this.farmerFormGroup.patchValue(changes.farmer.currentValue);
      } else {
        this.farmerFormGroup.patchValue(changes.farmer.currentValue, { emitEvent: false });
      }
    }
  }

}
