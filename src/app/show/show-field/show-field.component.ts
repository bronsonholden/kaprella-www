import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldApiService } from '../../field-api.service';
import { Field } from '../../models/field';
import { Farmer } from '../../models/farmer';

@Component({
  selector: 'app-show-field',
  templateUrl: './show-field.component.html',
  styleUrls: ['./show-field.component.scss']
})
export class ShowFieldComponent implements OnInit {

  unit = 'ha';
  field: Field;
  farmer: Farmer;

  constructor(public fieldApi: FieldApiService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.fieldApi.get(params.id).subscribe((res: any) => {
        this.field = res.data;
        this.farmer = res.included[0];
      });
    });
  }

}
