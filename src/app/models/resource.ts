export interface Resource {
  id?: string;
  type?: string;
  attributes?: { [key: string]: any };
  meta?: { [key: string]: any };
  relationships?: { [key: string]: ResourceRelationship<Resource> };
}

export type ResourceRelationship<T> = ResourceSingleRelationship<T> | ResourceManyRelationship<T>;

export interface ResourceSingleRelationship<T> {
  data: T;
}

export interface ResourceManyRelationship<T> {
  data: T[];
}
