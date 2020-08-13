import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FieldApiService } from '../../field-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Farmer } from '../../models/farmer';
import { Field } from '../../models/field';

@Component({
  selector: 'app-create-field',
  templateUrl: './create-field.component.html',
  styleUrls: ['./create-field.component.scss']
})
export class CreateFieldComponent implements OnInit {

  field: Field = {};

  constructor(private fieldApi: FieldApiService,
              private location: Location,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  createField(): void {
    this.fieldApi.create(this.field).subscribe((res: any) => {
      const field = res.data;
      const snackBarRef = this.snackBar.open(`Field ${field.attributes.name} created`, 'Show me', {
        duration: 5000
      });

      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl(`/fields/${field.id}`);
      });

      this.location.back();
    });
  }

}
