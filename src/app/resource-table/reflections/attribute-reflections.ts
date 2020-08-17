import { SqlTypeMetadata } from './sql-type-metadata';

export type AttributeReflections = {
  attributes: {
    [key: string]: AttributeReflection<string | number | boolean>
  },
  relationships: {
    [key: string]: RelationshipReflection
  }
}

export interface AttributeReflection<T> {
  sqlTypeMetadata: SqlTypeMetadata,
  defaultValue: T | null;
  allowNull: boolean;
  comment: string | null;
  name: string;
  prettyName: string;
}

export interface RelationshipReflection {
  relationshipType: string;
  resource: string;
  foreignKey: string;
  options: Object;
  name: string;
  prettyName: string;
}
