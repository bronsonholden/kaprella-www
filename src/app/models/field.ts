import {
  Resource,
  ResourceSingleRelationship,
  ResourceManyRelationship
} from './resource';

import { Farmer } from './farmer';

export interface Field extends Resource {
  attributes?: FieldAttributes;
  relationships?: { [K in keyof FieldRelationships]: FieldRelationships[K] };
  meta?: FieldMeta;
}

export interface FieldAttributes {
  name?: string;
  srid?: number | null;
  boundary?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FieldRelationships {
  farmer?: ResourceManyRelationship<Farmer>;
}

export interface FieldMeta {
  boundaryArea?: number;
  centroid?: string;
}
