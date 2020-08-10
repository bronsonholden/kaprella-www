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

}
