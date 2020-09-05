import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldApiService } from '../../field-api.service';
import { Field } from '../../models/field';
import { Farmer } from '../../models/farmer';
import { Coordinate } from '../../maps/geometries/coordinate';
import { Multipolygon } from '../../maps/geometries/multipolygon';
import { Polygon } from '../../maps/geometries/polygon';
import * as wkt from 'terraformer-wkt-parser';

@Component({
  selector: 'app-show-field',
  templateUrl: './show-field.component.html',
  styleUrls: ['./show-field.component.scss']
})
export class ShowFieldComponent implements OnInit {

  unit = 'ha';
  field: Field;
  farmer: Farmer;
  multipolygon: Multipolygon;

  options = {
    zoom: 15,
    streetViewControl: false,
    mapTypeControl: true,
    mapTypeId: 'roadmap',
    styles: []
  };

  polygonOptions = {
    fillColor: '#00ff00',
    strokeColor: '#00bb00'
  };

  constructor(public fieldApi: FieldApiService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.fieldApi.get(params.id).subscribe((res: any) => {
        this.field = res.data;
        this.farmer = res.included[0];

        this.multipolygon = this.loadMultipolygon(this.field.attributes.boundary);

        const geometry = <any>wkt.parse(this.field.meta.centroid);

        this.options.center = {
          lng: geometry.coordinates[0],
          lat: geometry.coordinates[1]
        };
      });
    });
  }

  loadMultipolygon(boundary) {
    const geometry = <any>wkt.parse(boundary);

    const polygons = geometry.coordinates.map(polygon => {
      const loops = polygon.map(loop => loop.map(coord => new Coordinate(coord[1], coord[0])));
      return new Polygon(loops[0], loops.slice(1));
    });

    return new Multipolygon(polygons);
  }

}
