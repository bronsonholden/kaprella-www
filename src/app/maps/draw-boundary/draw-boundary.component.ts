import {
  Component,
  OnInit,
  Input,
  Output,
  forwardRef,
  EventEmitter,
  ElementRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as wkt from 'terraformer-wkt-parser';
import { GoogleMap } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Multipolygon } from '../geometries/multipolygon';
import { Polygon } from '../geometries/polygon';
import { Coordinate } from '../geometries/coordinate';

export enum DrawBoundaryMode {
  Select = 1,
  Boundary,
  Hole
}

@Component({
  selector: 'app-draw-boundary',
  templateUrl: './draw-boundary.component.html',
  styleUrls: ['./draw-boundary.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DrawBoundaryComponent),
      multi: true
    }
  ]
})
export class DrawBoundaryComponent implements OnInit, ControlValueAccessor {

  @ViewChild('googleMap', { static: true }) googleMap: GoogleMap;

  wkt: string;

  @Input('value') _wkt = '';
  @Output() valueChange = new EventEmitter<string>();
  onChange: any = () => {};
  onTouched: any = () => {};

  zoom = 1;
  center = new Coordinate(0, 0);

  polygonOptions = {
    fillColor: '#00ff00',
    strokeColor: '#00bb00'
  };

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

  DrawBoundaryMode = DrawBoundaryMode;
  mode: DrawBoundaryMode = DrawBoundaryMode.Select;
  selectedPolygon = -1;
  selectedHole: -1;
  multipolygon = new Multipolygon();

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  get value(): string {
    return this._wkt;
  }

  set value(val: string) {
    this._wkt = this.parseWkt(val);
    this.wkt = this._wkt;
  }

  onZoomChange() {
    this.zoom = this.googleMap.getZoom();
  }

  onCenterChange() {
    const coord = this.googleMap.getCenter();
    this.center = { lat: coord.lat(), lng: coord.lng() };
  }

  parseWkt(val) {
    if (!val) {
      return;
    }

    /* So we don't recreate polygon objects (causing a little flash in the
     * shapes on the map)
     */
    if (val === this._wkt) {
      return val;
    }

    const geometry = <any>wkt.parse(val);

    const polygons = geometry.coordinates.map(polygon => {
      const loops = polygon.map(loop => loop.map(coord => new Coordinate(coord[1], coord[0])));
      return new Polygon(loops[0], loops.slice(1));
    });

    this.multipolygon = new Multipolygon(polygons);

    return val;
  }

  onMapClick(event) {
    const coord = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    if (this.mode === DrawBoundaryMode.Boundary) {
      if (this.selectedPolygon > -1) {
        let polygon = this.multipolygon.polygons[this.selectedPolygon];

        polygon.boundary.push(coord);

        if (polygon.boundary.length> 2) {
          this._updateWkt();
        }
      } else {
        this.multipolygon.polygons.push(new Polygon([coord], []));
        this.selectedPolygon = this.multipolygon.polygons.length - 1;
      }
    } else if (this.mode === DrawBoundaryMode.Select) {
      this.selectedPolygon = -1;
    }

  }

  // Called when one of the outer polygon's markers is clicked
  onOuterPolygonPointClick(idx) {
  }

  // Called when the outer polygon is clicked
  onOuterPolygonClick(idx, event) {
    if (this.mode === DrawBoundaryMode.Select) {
      this.selectedPolygon = idx;
      return;
    } else if (this.mode === DrawBoundaryMode.Hole) {
      const coord = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };

      // Draw hole
      let polygon = this.multipolygon.polygons[this.selectedPolygon];
    } else if (this.mode === DrawBoundaryMode.Boundary) {
      this.onMapClick(event);
    }
  }

  clearPolygons() {
    this.multipolygon = new Multipolygon();
    this.selectedPolygon = -1;
    this.mode = DrawBoundaryMode.Select;
  }

  drawBoundaryMode() {
    this.mode = DrawBoundaryMode.Boundary;
    this.selectedPolygon = -1;
  }

  _updateWkt() {
    const polygons = this.multipolygon.paths.map((polygon: Coordinate[][]) => {
      if (polygon.length > 0) {
        const list = polygon.map((shapes: Coordinate[]) => {
          let coords = shapes.map((coord: Coordinate) => `${coord.lng} ${coord.lat}`);
          // WKT requires first point be repeated to indicate a loop
          coords.push(coords[0]);
          return coords;
        });

        return `(${list.join(', ')})`;
      } else {
        return null;
      }
    });
    this._wkt = `MULTIPOLYGON ((${polygons.filter(n => n).join(', ')}))`;
    this.wkt = this._wkt;
    this.onChange(this._wkt);
    this.valueChange.emit(this._wkt);
    this.onTouched();
  }

}
