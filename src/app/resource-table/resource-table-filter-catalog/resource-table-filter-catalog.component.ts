import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { AttributeReflections } from '../../reflections/attribute-reflections';

import { BaseFilter } from '../resource-table-filters/base-filter';
import { NumericGreaterThanFilter } from '../resource-table-filters/numeric-greater-than-filter';

/* This component accepts reflection metadata from a Kaprella resource and
 * presents a simple interface for the user to select a column, operator, and
 * value. When a valid selection is made for all three, an object containing
 * the filter expression as well as a label is emitted. This is used to
 * easily configure new filters to apply to resource table data. Filters
 * created from this component are limited and relatively simple. Complex
 * filters must be applied using filter expressions but can still be added
 * or removed via the catalog/table interfaces.
 */

/* Operators may have more than one "value", e.g. "Within radius" for
 * geography attributes. Where applicable, multiple values are described for
 * each of the various operators.
 */

const INTEGER_OPERATORS: BaseFilter[] = [
  new NumericGreaterThanFilter(),
  // { value: '>=', label: 'Greater than or equal to' },
  // { value: '<', label: 'Less than' },
  // { value: '<=', label: 'Less than or equal to' },
  // { value: '==', label: 'Equal to' },
  // { value: '!=', label: 'Not equal to' },
  // { value: 'iseven', label: 'Is even' },
  // { value: 'isodd', label: 'Is odd' },
  // inclrange values: range min, range max
  // { value: 'inclrange', label: 'Inclusive range' },
  // exclrange values: range min, range max
  // { value: 'exclrange', label: 'Exclusive range' }
];

const STRING_OPERATORS: BaseFilter[] = [
  // { value: 'contains', label: 'Contains' },
  // { value: 'nocontains', label: 'Does not contain' },
  // { value: '==', label: 'Exactly matches' },
  // { value: 'like', label: 'Partially matches' }
];

const GEOGRAPHY_OPERATORS: BaseFilter[] = [
  // { value: 'intersects', label: 'Intersects' },
  // { value: 'nointersects', label: 'Does not intersect' },
  // { value: 'within', label: 'Within' },
  // { value: 'nowithin', label: 'Not within' },
  // // inradius values: point wkt, radius (meters)
  // { value: 'inradius', label: 'In radius' },
  // // outradius values: point wkt, radius (meters)
  // { value: 'outradius', label: 'Not in radius' }
];

const DATETIME_OPERATORS: BaseFilter[] = [
  // { value: '==', label: 'Equal to' },
  // { value: '!=', label: 'Not equal to' },
  // { value: 'hod', label: 'Hour of day' },
  // { value: 'dow', label: 'Day of week' },
  // { value: 'moy', label: 'Month of year' },
  // // timerange values: from time, to time
  // { value: 'timerange', label: 'Time range' },
  // // datetimerange values: from datetime, to datetime
  // { value: 'datetimerange', label: 'Date & time range' },
  // { value: 'before', label: 'On or before' },
  // { value: 'after', label: 'On or after' }
];

@Component({
  selector: 'app-resource-table-filter-catalog',
  templateUrl: './resource-table-filter-catalog.component.html',
  styleUrls: ['./resource-table-filter-catalog.component.scss']
})
export class ResourceTableFilterCatalogComponent implements OnInit {

  @Input() reflection: AttributeReflections = {
    "attributes": {
      "id": {
        "sqlTypeMetadata": {
          "sqlType": "bigint",
          "type": "integer",
          "limit": 8,
          "precision": null,
          "scale": null
        },
        "defaultValue": null,
        "allowNull": false,
        "comment": null,
        "name": "id",
        "prettyName": "ID"
      },
      "name": {
        "sqlTypeMetadata": {
          "sqlType": "character varying",
          "type": "string",
          "limit": null,
          "precision": null,
          "scale": null
        },
        "defaultValue": null,
        "allowNull": false,
        "comment": null,
        "name": "name",
        "prettyName": "Name"
      },
      "boundary": {
        "sqlTypeMetadata": {
          "sqlType": "geography(MultiPolygon,4326)",
          "type": "geography",
          "limit": null,
          "precision": null,
          "scale": null
        },
        "defaultValue": null,
        "allowNull": true,
        "comment": null,
        "name": "boundary",
        "prettyName": "Boundary"
      },
      "srid": {
        "sqlTypeMetadata": {
          "sqlType": "integer",
          "type": "integer",
          "limit": 4,
          "precision": null,
          "scale": null
        },
        "defaultValue": null,
        "allowNull": true,
        "comment": null,
        "name": "srid",
        "prettyName": "SRID"
      },
      "farmerId": {
        "sqlTypeMetadata": {
          "sqlType": "bigint",
          "type": "integer",
          "limit": 8,
          "precision": null,
          "scale": null
        },
        "defaultValue": null,
        "allowNull": false,
        "comment": null,
        "name": "farmer_id",
        "prettyName": "Farmer ID"
      },
      "createdAt": {
        "sqlTypeMetadata": {
          "sqlType": "timestamp(6) without time zone",
          "type": "datetime",
          "limit": null,
          "precision": 6,
          "scale": null
        },
        "defaultValue": null,
        "allowNull": false,
        "comment": null,
        "name": "created_at",
        "prettyName": "Created at"
      },
      "updatedAt": {
        "sqlTypeMetadata": {
          "sqlType": "timestamp(6) without time zone",
          "type": "datetime",
          "limit": null,
          "precision": 6,
          "scale": null
        },
        "defaultValue": null,
        "allowNull": false,
        "comment": null,
        "name": "updated_at",
        "prettyName": "Updated at"
      }
    },
    "relationships": {
      "farmer": {
        "relationshipType": "belongsTo",
        "resource": "Farmer",
        "foreignKey": "farmer_id",
        "options": {},
        "name": "farmer",
        "prettyName": "Farmer"
      }
    }
  }

  @Output() filterChange = new EventEmitter<any>();

  attributes: any[] = [];
  relationships: any[] = [];
  selectedAttribute: string;
  selectedOperator: string;
  value: any[];

  constructor() { }

  ngOnInit(): void {
    this.loadReflection(this.reflection)
  }

  ngOnChanges(changes): void {
    if (changes.reflection) {
      this.loadReflection(changes.reflection);
    }
  }

  onSelectionChange(selection): void {
    this.selectedAttribute = selection.option.value;
  }

  get filterValue(): string {
    if (!!this.selectedOperator && !!this.selectedAttribute && !!this.value) {
      const idx = this.operators.map(op => op.option).indexOf(this.selectedOperator);
      return this.operators[idx].generate(this.selectedAttribute, this.value);
    } else {
      return null;
    }
  }

  get builderType(): string {
    if (!this.selectedAttribute) {
      return null;
    }

    return this.typeByKey(this.selectedAttribute);
  }

  typeByKey(key) {
    return this.reflection.attributes[key].sqlTypeMetadata.type;
  }

  onOperatorChange(selection): void {
    this.selectedOperator = selection.option.value;
  }

  loadReflection(reflection: any): void {
    let attributes: any[] = [];
    let relationships: any[] = [];

    // Load relationships
    for (let key of Object.keys(reflection.relationships)) {
      const relationship = reflection.relationships[key];

      relationships.push({
        key,
        foreignKey: relationship.foreignKey,
        label: relationship.prettyName,
        reflection: {} // TODO: Load reflections
      });
    }

    for (let key of Object.keys(reflection.attributes)) {
      const attribute = reflection.attributes[key];

      attributes.push({
        key,
        type: attribute.sqlTypeMetadata.type,
        foreignKey: relationships.map(r => r.foreignKey).indexOf(attribute.name) > -1,
        label: attribute.prettyName
      });
    }

    this.attributes = attributes;
    this.relationships = relationships;
  }

  attributeIconName(attribute): string {
    switch (attribute.type) {
      case 'string':
        return 'format-quote-close';
      case 'integer':
        return 'integer';
      case 'float':
        return 'decimal';
      case 'datetime':
        return 'calendar-clock';
      case 'geography':
        return 'map';
      case 'boolean':
        return 'checkbox-marked';
      default:
        return '';
    }
  }

  get operators(): any[] {
    if (!this.selectedAttribute) {
      return [];
    }

    const selectedAttribute = this.reflection.attributes[this.selectedAttribute];
    switch (selectedAttribute.sqlTypeMetadata.type) {
      case 'integer':
        return INTEGER_OPERATORS;
      case 'string':
        return STRING_OPERATORS;
      case 'geography':
        return GEOGRAPHY_OPERATORS;
      case 'datetime':
        return DATETIME_OPERATORS;
      default:
        return [];
    }
  }

}
