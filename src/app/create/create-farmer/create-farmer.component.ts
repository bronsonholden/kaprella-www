import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Farmer } from '../../models/farmer';

import { FarmerApiService } from '../../farmer-api.service';

@Component({
  selector: 'app-create-farmer',
  templateUrl: './create-farmer.component.html',
  styleUrls: ['./create-farmer.component.scss']
})
export class CreateFarmerComponent implements OnInit {

  farmer: Farmer = {};

  constructor(private farmerApi: FarmerApiService,
              private router: Router,
              private snackBar: MatSnackBar,
              private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  createFarmer(): void {
    this.farmerApi.create(this.farmer).subscribe((res: any) => {
      const farmer: Farmer = res.data;
      const snackBarRef = this.snackBar.open(`Farmer ${farmer.attributes.name} created`, 'Show me', {
        duration: 5000
      });

      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl(`/farmers/${farmer.id}`);
      });

      this.goBack();
    });
  }

}
