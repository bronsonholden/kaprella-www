import { BaseCriterion } from './criteria/base-criterion';

export interface CatalogFilter {
  dimension: string;
  criterion: BaseCriterion;
  value: any[];
}
