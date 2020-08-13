import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LicensorApiService } from '../../licensor-api.service';

@Component({
  selector: 'app-create-licensor',
  templateUrl: './create-licensor.component.html',
  styleUrls: ['./create-licensor.component.scss']
})
export class CreateLicensorComponent implements OnInit {

  licensor: any = {};

  constructor(private licensorApi: LicensorApiService,
              private location: Location,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

  createLicensor(): void {
    let attributes = {
      name: this.licensor.name
    };

    this.licensorApi.create(attributes).subscribe((res: any) => {
      const licensor = res.data;
      const snackBarRef = this.snackBar.open(`Licensor ${licensor.attributes.name} created`, 'Show me', {
        duration: 5000
      });

      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl(`/licensors/${licensor.id}`);
      });

      this.location.back();
    });
  }

}
