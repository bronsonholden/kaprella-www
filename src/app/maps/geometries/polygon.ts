import { Coordinate } from './coordinate';

export class Polygon {
  constructor(public boundary: Coordinate[] = [], public holes: Coordinate[][] = []) {}

  get path(): Coordinate[][] {
    if (this.holes && this.holes.length > 0) {
      return [this.boundary, ...this.holes];
    } else {
      return [this.boundary];
    }
  }
}
