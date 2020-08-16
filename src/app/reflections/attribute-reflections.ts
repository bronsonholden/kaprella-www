import { SqlTypeMetadata } from './sql-type-metadata';

export type AttributeReflections = {
  [key: string]: AttributeReflection<string | number | boolean>
}

export interface AttributeReflection<T> {
  sqlTypeMetadata: SqlTypeMetadata,
  defaultValue: T | null;
  allowNull: boolean;
  comment: string | null;
  name: string;
  prettyName: string;
}
