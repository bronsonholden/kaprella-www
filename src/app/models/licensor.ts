import { Resource } from './resource';

export interface Licensor extends Resource {
  attributes?: LicensorAttributes
}

export interface LicensorAttributes {
  name?: string;
}
