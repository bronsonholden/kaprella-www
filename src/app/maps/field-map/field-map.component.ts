import {
  Component,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { get, omit, mergeWith, isArray, filter } from 'lodash-es';

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
import { HumanizedFilter } from '../../resource-table/filters/humanized-filter';
import { AttributeReflections } from '../../resource-table/reflections/attribute-reflections';

@Component({
  selector: 'app-field-map',
  templateUrl: './field-map.component.html',
  styleUrls: ['./field-map.component.scss']
})
export class FieldMapComponent implements OnInit {

  reflection: AttributeReflections;

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
  filters: string[] = [];
  scope: any = {};
  humanizedFilters: HumanizedFilter[] = [];
  sort: string;

  constructor(public fieldApi: FieldApiService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
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

      this.scope = {
        sort: `asc(st_distance(st_point(${center.lng()}, ${center.lat()}), st_centroid(prop('boundary'))))`,
        filter: [`st_intersects(prop('boundary'), st_box(${boxStr}))`]
      }

      this.reloadFields();
    });

    this.activatedRoute.queryParams.subscribe((params: any) => {
      const newFilters = params['filter'];
      if (typeof newFilters === 'string') {
        this.filters = [newFilters];
      } else if (isArray(newFilters)) {
        this.filters = newFilters;
      } else {
        this.filters = [];
      }

      this.reloadFields();
    });
  }

  reloadFields(): void {
    let query = {
      filter: this.filters || []
    };

    if (this.scope) {
      query = mergeWith(query, this.scope, (obj, src) => {
        if (isArray(obj) && isArray(src)) {
          return obj.concat(src);
        }
      });
    }

    this.fieldApi.index(0, 100, query).subscribe((res: any) => {
      console.log(`Loaded ${res.meta.page.itemCount} fields in viewport`);

      this.reflection = res.meta.reflection;

      // Show a warning if there are too many fields to be shown
      if (res.meta.page.totalPages > 1) {
        this.snackBar.open('More fields than can be displayed; zoom in or apply filters', 'OK', {
          duration: 5000
        });
      }

      const humanizedFilters = omit(res.meta.filterLabels, get(this.scope, 'filter', []));

      this.humanizedFilters = [];
      for (let key of Object.keys(humanizedFilters)) {
        this.humanizedFilters.push({
          expression: key,
          humanized: humanizedFilters[key] || 'Custom filter'
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

  onFilterCreated(filter: string | null) {
    if (typeof filter === 'string') {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          filter: this.filters.concat([filter])
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  onFilterRemoved(humanizedFilter: HumanizedFilter) {
    const filters = filter(this.filters, (expression: string) => expression !== humanizedFilter.expression);
    let queryParams;

    if (filters.length > 0) {
      queryParams = { filter: filters };
    } else {
      queryParams = { filter: null };
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

}
