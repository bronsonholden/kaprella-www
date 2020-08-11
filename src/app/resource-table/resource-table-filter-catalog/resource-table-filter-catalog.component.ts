import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

/* This component accepts reflection metadata from a Kaprella resource and
 * presents a simple interface for the user to select a column, operator, and
 * value. When a valid selection is made for all three, an object containing
 * the filter expression as well as a label is emitted.
 */

export interface FilterOperator {
  value: string;
  label: string;
}

/* Operators may have more than one "value", e.g. "Within radius" for
 * geography columns. Where applicable, multiple values are described for
 * each of the various operators.
 */

const NUMERIC_OPERATORS: FilterOperator[] = [
  { value: '>', label: 'Greater than' },
  { value: '>=', label: 'Greater than or equal to' },
  { value: '<', label: 'Less than' },
  { value: '<=', label: 'Less than or equal to' },
  { value: '==', label: 'Equal to' },
  { value: '!=', label: 'Not equal to' },
  { value: 'isevent', label: 'Is even' },
  { value: 'isodd', label: 'Is odd' },
  // inclrange values: range min, range max
  { value: 'inclrange', label: 'Inclusive range' },
  // exclrange values: range min, range max
  { value: 'exclrange', label: 'Exclusive range' }
];

const STRING_OPERATORS: FilterOperator[] = [
  { value: 'contains', label: 'Contains' },
  { value: 'nocontains', label: 'Does not contain' },
  { value: '==', label: 'Exactly matches' },
  { value: 'like', label: 'Partially matches' }
];

const GEOGRAPHY_OPERATORS: FilterOperator[] = [
  { value: 'intersects', label: 'Intersects' },
  { value: 'nointersects', label: 'Does not intersect' },
  { value: 'within', label: 'Within' },
  { value: 'nowithin', label: 'Not within' },
  // inradius values: point wkt, radius (meters)
  { value: 'inradius', label: 'In radius' },
  // outradius values: point wkt, radius (meters)
  { value: 'outradius', label: 'Not in radius' }
];

const DATETIME_OPERATORS: FilterOperator[] = [
  { value: '==', label: 'Equal to' },
  { value: '!=', label: 'Not equal to' },
  { value: 'hod', label: 'Hour of day' },
  { value: 'dow', label: 'Day of week' },
  { value: 'moy', label: 'Month of year' },
  // timerange values: from time, to time
  { value: 'timerange', label: 'Time range' },
  // datetimerange values: from datetime, to datetime
  { value: 'datetimerange', label: 'Date & time range' },
  { value: 'before', label: 'On or before' },
  { value: 'after', label: 'On or after' }
];

@Component({
  selector: 'app-resource-table-filter-catalog',
  templateUrl: './resource-table-filter-catalog.component.html',
  styleUrls: ['./resource-table-filter-catalog.component.scss']
})
export class ResourceTableFilterCatalogComponent implements OnInit {

  @Input() reflection: any = {
    "columns": {
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

  columns: any[] = [];
  relationships: any[] = [];
  selectedKey: string;
  selectedOperator: string;

  constructor() { }

  ngOnInit(): void {
    this.loadReflection(this.reflection)
  }

  ngOnChanges(changes) {
    if (changes.reflection) {
      this.loadReflection(changes.reflection);
    }
  }

  onSelectionChange(selection) {
    const newKey = selection.option.value;

    if (this.selectedKey === newKey) {
      this.selectedKey = null;
    } else {
      this.selectedKey = newKey;
    }
  }

  onOperatorChange(selection) {
    this.selectedOperator = selection.option.value;
  }

  loadReflection(reflection: any) {
    let columns: any[] = [];
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

    for (let key of Object.keys(reflection.columns)) {
      const column = reflection.columns[key];

      columns.push({
        key,
        type: column.sqlTypeMetadata.type,
        foreignKey: relationships.map(r => r.foreignKey).indexOf(column.name) > -1,
        label: column.prettyName
      });
    }

    this.columns = columns;
    this.relationships = relationships;
  }

  columnIconName(column) {
    switch (column.type) {
      case 'string':
        return 'format-quote-close';
      case 'integer':
        return 'numeric';
      case 'datetime':
        return 'calendar-clock';
      case 'geography':
        return 'map';
      case 'boolean':
        return 'checkbox-marked';
      default:
        return null;
    }
  }

  get operators(): any[] {
    if (!this.selectedKey) {
      return [];
    }

    const selectedColumn = this.reflection.columns[this.selectedKey];
    switch (selectedColumn.sqlTypeMetadata.type) {
      case 'integer':
        return NUMERIC_OPERATORS;
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
