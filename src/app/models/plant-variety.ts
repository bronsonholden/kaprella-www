import { Resource } from './resource';

export interface PlantVariety extends Resource {
  attributes?: PlantVarietyAttributes
}

export interface PlantVarietyAttributes {
  genus?: string;
  denomination?: string;
}
