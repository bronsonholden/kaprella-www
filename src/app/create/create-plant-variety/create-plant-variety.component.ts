import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PlantVarietyApiService } from '../../plant-variety-api.service';
import { PlantVariety } from '../../models/plant-variety';

@Component({
  selector: 'app-create-plant-variety',
  templateUrl: './create-plant-variety.component.html',
  styleUrls: ['./create-plant-variety.component.scss']
})
export class CreatePlantVarietyComponent implements OnInit {

  plantVariety: PlantVariety = {};

  constructor(private plantVarietyApi: PlantVarietyApiService,
              private location: Location,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

  createPlantVariety(): void {
    this.plantVarietyApi.create(this.plantVariety).subscribe((res: any) => {
      const plantVariety = res.data;
      const snackBarRef = this.snackBar.open(`Plant Variety ${plantVariety.attributes.denomination} created`, 'Show me', {
        duration: 5000
      });

      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl(`/plantVarieties/${plantVariety.id}`);
      });

      this.location.back();
    });
  }

}
