import { Coordinate } from './coordinate';
import { Polygon } from './polygon';

export class Multipolygon {
  constructor(public polygons: Polygon[] = []) {}

  get paths(): Coordinate[][][] {
    return this.polygons.map(p => p.path);
  }
}
