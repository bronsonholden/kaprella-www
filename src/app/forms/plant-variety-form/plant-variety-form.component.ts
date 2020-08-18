import {
  Component,
  OnInit,
  OnChanges,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';

import { PlantVariety } from '../../models/plant-variety';

@Component({
  selector: 'app-plant-variety-form',
  templateUrl: './plant-variety-form.component.html',
  styleUrls: ['./plant-variety-form.component.scss']
})
export class PlantVarietyFormComponent implements OnInit {

  @Input() plantVariety: PlantVariety;
  @Output() plantVarietyChange = new EventEmitter<any>();
  plantVarietyFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.plantVarietyFormGroup = this.formBuilder.group({
      type: ['plantVarieties'],
      attributes: this.formBuilder.group({
        genus: [],
        denomination: []
      })
    });
  }

  ngOnInit(): void {
    this.plantVarietyFormGroup.valueChanges.subscribe((val: PlantVariety) => {
      this.plantVarietyChange.emit(val);
    });
  }

  ngOnChanges(changes): void {
    if (changes.plantVariety) {
      if (changes.plantVariety.firstChange) {
        this.plantVarietyFormGroup.patchValue(changes.plantVariety.currentValue);
      } else {
        this.plantVarietyFormGroup.patchValue(changes.plantVariety.currentValue, { emitEvent: false });
      }
    }
  }

}
