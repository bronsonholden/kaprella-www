import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ComponentFactoryResolver,
  ViewChild
} from '@angular/core';

import { isNil, isArray } from 'lodash-es';

import { AttributeReflections } from '../../reflections/attribute-reflections';

import { FilterCatalogValueDirective } from './filter-catalog-value.directive';

import { BaseCriterion } from '../criteria/base-criterion';
import { NumericLogicalCriterion } from '../criteria/numeric-logical-criterion';
import { NumericIsEvenCriterion } from '../criteria/numeric-is-even-criterion';
import { NumericIsOddCriterion } from '../criteria/numeric-is-odd-criterion';
import { StringEqualsCriterion } from '../criteria/string-equals-criterion';
import { StringNotEqualsCriterion } from '../criteria/string-not-equals-criterion';
import { StringLikeCriterion } from '../criteria/string-like-criterion';
import { StringNotLikeCriterion } from '../criteria/string-not-like-criterion';

import { ValueBuilder } from '../../value-builders/value-builder';
import { IntegerValueBuilderComponent } from '../../value-builders/integer-value-builder/integer-value-builder.component';
import { StringValueBuilderComponent } from '../../value-builders/string-value-builder/string-value-builder.component';

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

const INTEGER_OPERATORS: BaseCriterion[] = [
  new NumericLogicalCriterion('>', 'Greater than', IntegerValueBuilderComponent),
  new NumericLogicalCriterion('>=', 'Greater than or equal to', IntegerValueBuilderComponent),
  new NumericLogicalCriterion('<', 'Less than', IntegerValueBuilderComponent),
  new NumericLogicalCriterion('<=', 'Less than or equal to', IntegerValueBuilderComponent),
  new NumericLogicalCriterion('==', 'Equal to', IntegerValueBuilderComponent),
  new NumericLogicalCriterion('!=', 'Not equal to', IntegerValueBuilderComponent),
  new NumericIsEvenCriterion('is_even', 'Is even', IntegerValueBuilderComponent),
  new NumericIsOddCriterion('is_odd', 'Is odd', IntegerValueBuilderComponent)
  // { value: 'iseven', label: 'Is even' },
  // { value: 'isodd', label: 'Is odd' },
  // inclrange values: range min, range max
  // { value: 'inclrange', label: 'Inclusive range' },
  // exclrange values: range min, range max
  // { value: 'exclrange', label: 'Exclusive range' }
];

const STRING_OPERATORS: BaseCriterion[] = [
  // { value: 'contains', label: 'Contains' },
  // { value: 'nocontains', label: 'Does not contain' },
  new StringEqualsCriterion('==', 'Exactly matches', StringValueBuilderComponent),
  new StringNotEqualsCriterion('!=', 'Does not match', StringValueBuilderComponent),
  new StringLikeCriterion('~=', 'Like', StringValueBuilderComponent),
  new StringNotLikeCriterion('!~=', 'Not like', StringValueBuilderComponent)
  // { value: 'like', label: 'Partially matches' }
];

const GEOGRAPHY_OPERATORS: BaseCriterion[] = [
  // { value: 'intersects', label: 'Intersects' },
  // { value: 'nointersects', label: 'Does not intersect' },
  // { value: 'within', label: 'Within' },
  // { value: 'nowithin', label: 'Not within' },
  // // inradius values: point wkt, radius (meters)
  // { value: 'inradius', label: 'In radius' },
  // // outradius values: point wkt, radius (meters)
  // { value: 'outradius', label: 'Not in radius' }
];

const DATETIME_OPERATORS: BaseCriterion[] = [
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
  selector: 'app-filter-catalog',
  templateUrl: './filter-catalog.component.html',
  styleUrls: ['./filter-catalog.component.scss']
})
export class FilterCatalogComponent implements OnInit, OnDestroy {

  @Input() reflection: AttributeReflections;
  @Output() filterChange = new EventEmitter<any>();
  @Output() filterApply = new EventEmitter<string>();

  @ViewChild(FilterCatalogValueDirective, { static: true }) valueHost: FilterCatalogValueDirective;

  attributes: any[] = [];
  relationships: any[] = [];
  dimension: string;
  criterion: BaseCriterion;
  value: any[];

  valueBuilder: ValueBuilder;

  // The filter expression being created
  filter: string;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.valueBuilder) {
      this.valueBuilder.valueChange.unsubscribe();
    }
  }

  ngOnChanges(changes): void {
    if (changes.reflection) {
      this.loadReflection(changes.reflection.currentValue);
    }
  }

  /* Emits a filter expression if the catalog selections are complete. If
   * the selections become invalid (e.g. the user removes the value from the
   * builder), null is emitted.
   */
  emitIfComplete(): void {
    if (isNil(this.criterion) || isNil(this.dimension)) {
      return;
    }

    if (this.isValueValid()) {
      const filter = this.getSelectedOperator().generate(this.columnNameByKey(this.dimension), this.value);
      this.filter = filter;
      this.filterChange.emit(filter);
    } else {
      this.filterChange.emit(null);
    }
  }

  // TODO: Don't emit unless value has been changed. Currently emits as soon
  // as a dimension & operator are selected.
  isValueValid(): boolean {
    if (isNil(this.value) || !isArray(this.value)) {
      return false;
    } else if (this.value.filter((val: any) => !isNil(val)).length === 0) {
      return false;
    } else {
      return this.value.length > 0;
    }
  }

  getSelectedOperator(): BaseCriterion {
    const idx = this.operators.map(op => op.option).indexOf(this.criterion);
    return this.operators[idx];
  }

  onDimensionChange(selection): void {
    this.dimension = selection.option.value;
    this.emitIfComplete();
  }

  get builderType(): string {
    if (!this.dimension) {
      return null;
    }

    return this.typeByKey(this.dimension);
  }

  typeByKey(key) {
    return this.reflection.attributes[key].sqlTypeMetadata.type;
  }

  columnNameByKey(key) {
    return this.reflection.attributes[key].name
  }

  onOperatorChange(selection): void {
    this.criterion = selection.option.value;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getSelectedOperator().valueBuilderComponent);
    const viewContainerRef = this.valueHost.viewContainerRef;
    if (this.valueBuilder) {
      this.valueBuilder.valueChange.unsubscribe();
    }
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<any>(componentFactory);
    this.valueBuilder = componentRef.instance;
    this.valueBuilder.valueChange.subscribe((value: any[]) => {
      this.onValueChange(value);
    });
    this.emitIfComplete();
  }

  onValueChange(value: any[]): void {
    this.value = value;
    this.emitIfComplete();
  }

  onClickApply(): void {
    this.filterApply.emit(this.filter);
  }

  loadReflection(reflection: AttributeReflections): void {
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
      case 'text':
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
    if (!this.dimension) {
      return [];
    }

    const dimension = this.reflection.attributes[this.dimension];
    switch (dimension.sqlTypeMetadata.type) {
      case 'integer':
        return INTEGER_OPERATORS;
      case 'string':
      case 'text':
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
