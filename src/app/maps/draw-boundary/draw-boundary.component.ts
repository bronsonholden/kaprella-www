import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-draw-boundary',
  templateUrl: './draw-boundary.component.html',
  styleUrls: ['./draw-boundary.component.scss']
})
export class DrawBoundaryComponent implements OnInit {

  @Input() center: any = {
    lat: 0,
    lng: 0
  }

  @Input() zoom: number = 1;

  options = {
    center: this.center,
    zoom: this.zoom,
    streetViewControl: false,
    mapTypeControl: true,
    mapTypeId: 'roadmap',
    styles: []
  };

  outerPolygon = [];
  innerPolygons = [[]];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
    const options = [
      'zoom',
      'center'
    ];

    for (let option of options) {
      if (changes[option]) {
        this.options[option] = changes[option].currentValue;
      }
    }
  }

  onMapClick(event) {
    const coord = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    this.outerPolygon.push(coord);
  }

  // Called when one of the outer polygon's markers is clicked
  onOuterPolygonPointClick(idx) {
  }

  // Called when the outer polygon is clicked
  onOuterPolygonClick(event) {
    const coord = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    this. innerPolygons[0].unshift(coord);
  }

  createPolygonPaths() {
    return [this.outerPolygon, ...this.innerPolygons];
  }

  clearPolygons() {
    this.outerPolygon = [];
    this.innerPolygons = [[]];
  }

}
