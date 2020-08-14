import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as wkt from 'terraformer-wkt-parser';
import { GoogleMap } from '@angular/google-maps';
import { Multipolygon } from '../geometries/multipolygon';
import { Polygon } from '../geometries/polygon';
import { Coordinate } from '../geometries/coordinate';
import { FieldApiService } from '../../field-api.service';
import { interval } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Field } from '../../models/field';

@Component({
  selector: 'app-field-map',
  templateUrl: './field-map.component.html',
  styleUrls: ['./field-map.component.scss']
})
export class FieldMapComponent implements OnInit {

  @ViewChild('googleMap', { static: true }) googleMap: GoogleMap;

  multipolygons = [];

  polygonOptions = {
    fillColor: '#00ff00',
    strokeColor: '#00bb00'
  };

  zoom = 10;

  options = {
    zoom: 10,
    center: {
      lat: 35.30209126554529,
      lng: -119.01580220543715
    },
    streetViewControl: false,
    mapTypeControl: true,
    mapTypeId: 'roadmap',
    styles: []
  };

  center: any = {};
  query: any = {};
  bounds: any = {};

  constructor(public fieldApi: FieldApiService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.googleMap.boundsChanged.pipe(debounceTime(250)).subscribe(() => {
      const bounds = this.googleMap.getBounds();
      const center = this.googleMap.getCenter();

      const lngMin = bounds.getSouthWest().lng();
      const latMin = bounds.getSouthWest().lat();
      const lngMax = bounds.getNorthEast().lng();
      const latMax = bounds.getNorthEast().lat();

      const boxStr = `${latMax}, ${lngMax}, ${latMin}, ${lngMin}`;

      /* Sort fields by ascending distance from center */
      this.query = {
        'sort': `asc(st_distance(st_point(${center.lng()}, ${center.lat()}), st_centroid(prop('boundary'))))`,
        'filter': `st_intersects(prop('boundary'), st_box(${boxStr}))`
      };

      this.reloadFields();
    });
  }

  reloadFields(): void {
    this.fieldApi.index(0, 100, this.query).subscribe((res: any) => {
      console.log(`Loaded ${res.meta.page.itemCount} fields in viewport`);

      // Show a warning if there are too many fields to be shown
      if (res.meta.page.totalPages > 1) {
        this.snackBar.open('More fields than can be displayed; zoom in or apply filters', 'OK', {
          duration: 5000
        });
      }

      // Load the multipolygons
      this.multipolygons = res.data.map((field: Field) => {
        const geometry = <any>wkt.parse(field.attributes.boundary);

        const polygons = geometry.coordinates.map(polygon => {
          const loops = polygon.map(loop => loop.map(coord => new Coordinate(coord[1], coord[0])));
          return new Polygon(loops[0], loops.slice(1));
        });

        return new Multipolygon(polygons);
      });
    });
  }

}
