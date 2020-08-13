import { Resource, ResourceSingleRelationship } from './resource';
import { Field } from './field';

export interface Farmer extends Resource {
  attributes?: FarmerAttributes;
  relationships?: { [K in keyof FarmerRelationships]: FarmerRelationships[K] };
  meta?: FarmerMeta;
}

export interface FarmerAttributes {
  name: string;
}

export interface FarmerRelationships {
  fields?: ResourceSingleRelationship<Field>;
}

export interface FarmerMeta {
  fieldsCount?: number;
  fieldsArea?: number;
}
