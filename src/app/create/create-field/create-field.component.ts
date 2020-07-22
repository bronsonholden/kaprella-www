import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FieldApiService } from '../../field-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-field',
  templateUrl: './create-field.component.html',
  styleUrls: ['./create-field.component.scss']
})
export class CreateFieldComponent implements OnInit {

  field: any = {};

  constructor(private fieldApi: FieldApiService,
              private location: Location,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

  createField() {
    let attributes = {
      name: this.field.name,
      boundary: this.field.boundary
    };

    let relationships = {
      farmer: {
        data: {
          type: 'farmers',
          id: this.field.farmerId
        }
      }
    };

    this.fieldApi.create(attributes, relationships).subscribe((res: any) => {
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
