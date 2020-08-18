import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantVarietyApiService } from '../../plant-variety-api.service';
import { PlantVariety } from '../../models/plant-variety';

@Component({
  selector: 'app-show-plant-variety',
  templateUrl: './show-plant-variety.component.html',
  styleUrls: ['./show-plant-variety.component.scss']
})
export class ShowPlantVarietyComponent implements OnInit {

  plantVariety: PlantVariety;

    constructor(private plantVarietyApi: PlantVarietyApiService,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe((params: any) => {
        this.plantVarietyApi.get(params.id).subscribe((res: any) => {
          this.plantVariety = res.data;
        });
      });
    }

}
