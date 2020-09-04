import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ComponentFactoryResolver,
  Type,
  ViewChild
} from '@angular/core';

import { isNil, isArray } from 'lodash-es';

import { AttributeReflections } from '../../reflections/attribute-reflections';

import { FilterCatalogValueDirective } from './filter-catalog-value.directive';

import { BaseCriterion } from '../criteria/base-criterion';
import { NumericGreaterThanCriterion } from '../criteria/numeric-greater-than-criterion';
import { NumericGreaterOrEqualCriterion } from '../criteria/numeric-greater-or-equal-criterion';
import { NumericLessThanCriterion } from '../criteria/numeric-less-than-criterion';
import { NumericLessOrEqualCriterion } from '../criteria/numeric-less-or-equal-criterion';
import { NumericEqualToCriterion } from '../criteria/numeric-equal-to-criterion';
import { NumericNotEqualCriterion } from '../criteria/numeric-not-equal-criterion';
import { NumericIsEvenCriterion } from '../criteria/numeric-is-even-criterion';
import { NumericIsOddCriterion } from '../criteria/numeric-is-odd-criterion';
import { StringEqualsCriterion } from '../criteria/string-equals-criterion';
import { StringNotEqualsCriterion } from '../criteria/string-not-equals-criterion';
import { StringLikeCriterion } from '../criteria/string-like-criterion';
import { StringNotLikeCriterion } from '../criteria/string-not-like-criterion';
import { DatetimeBeforeCriterion } from '../criteria/datetime-before-criterion';
import { DatetimeAfterCriterion } from '../criteria/datetime-after-criterion';

import { ValueBuilder } from '../../value-builders/value-builder';
import { IntegerValueBuilderComponent } from '../../value-builders/integer-value-builder/integer-value-builder.component';
import { StringValueBuilderComponent } from '../../value-builders/string-value-builder/string-value-builder.component';

/* This component accepts reflection metadata from a Kaprella resource and
 * presents a series of options: a column (or dimension), operator (or
 * criterion), and (for some criteria) one or more values. The selection of
 * a dimension determines what criteria are available. Likewise, choosing
 * a criterion presents the appropriate value builder as a simple form.
 * Functionality is primarily housed in the various criterion classes. Once
 * selected, a dimension is assigned; based on the value builder type
 * returned from the criterion, a component is created and inserted into the
 * final section of the stepper. This component is similarly assigned to
 * the criterion, which subscribes to changes to the value builder form.
 * A subscription is made to the criterion itself to receive filter strings
 * when a value is chosen.
 */

const OPERATORS = {
  'numeric': [
    NumericGreaterThanCriterion,
    NumericGreaterOrEqualCriterion,
    NumericLessThanCriterion,
    NumericLessOrEqualCriterion,
    NumericEqualToCriterion,
    NumericNotEqualCriterion
  ],
  'string': [
    StringEqualsCriterion,
    StringNotEqualsCriterion,
    StringLikeCriterion,
    StringNotLikeCriterion
  ],
  'datetime': [
    DatetimeBeforeCriterion,
    DatetimeAfterCriterion
  ]
};

// const INTEGER_OPERATORS: BaseCriterion[] = [
//   new NumericLogicalCriterion('>', 'Greater than', IntegerValueBuilderComponent),
//   new NumericLogicalCriterion('>=', 'Greater than or equal to', IntegerValueBuilderComponent),
//   new NumericLogicalCriterion('<', 'Less than', IntegerValueBuilderComponent),
//   new NumericLogicalCriterion('<=', 'Less than or equal to', IntegerValueBuilderComponent),
//   new NumericLogicalCriterion('==', 'Equal to', IntegerValueBuilderComponent),
//   new NumericLogicalCriterion('!=', 'Not equal to', IntegerValueBuilderComponent),
//   new NumericIsEvenCriterion('is_even', 'Is even', IntegerValueBuilderComponent),
//   new NumericIsOddCriterion('is_odd', 'Is odd', IntegerValueBuilderComponent)
//   // { value: 'iseven', label: 'Is even' },
//   // { value: 'isodd', label: 'Is odd' },
//   // inclrange values: range min, range max
//   // { value: 'inclrange', label: 'Inclusive range' },
//   // exclrange values: range min, range max
//   // { value: 'exclrange', label: 'Exclusive range' }
// ];
//
// const STRING_OPERATORS: BaseCriterion[] = [
//   // { value: 'contains', label: 'Contains' },
//   // { value: 'nocontains', label: 'Does not contain' },
//   new StringEqualsCriterion('==', 'Exactly matches', StringValueBuilderComponent),
//   new StringNotEqualsCriterion('!=', 'Does not match', StringValueBuilderComponent),
//   new StringLikeCriterion('~=', 'Like', StringValueBuilderComponent),
//   new StringNotLikeCriterion('!~=', 'Not like', StringValueBuilderComponent)
//   // { value: 'like', label: 'Partially matches' }
// ];
//
// const GEOGRAPHY_OPERATORS: BaseCriterion[] = [
//   // { value: 'intersects', label: 'Intersects' },
//   // { value: 'nointersects', label: 'Does not intersect' },
//   // { value: 'within', label: 'Within' },
//   // { value: 'nowithin', label: 'Not within' },
//   // // inradius values: point wkt, radius (meters)
//   // { value: 'inradius', label: 'In radius' },
//   // // outradius values: point wkt, radius (meters)
//   // { value: 'outradius', label: 'Not in radius' }
// ];
//
// const DATETIME_OPERATORS: BaseCriterion[] = [
//   // { value: '==', label: 'Equal to' },
//   // { value: '!=', label: 'Not equal to' },
//   // { value: 'hod', label: 'Hour of day' },
//   // { value: 'dow', label: 'Day of week' },
//   // { value: 'moy', label: 'Month of year' },
//   // // timerange values: from time, to time
//   // { value: 'timerange', label: 'Time range' },
//   // // datetimerange values: from datetime, to datetime
//   // { value: 'datetimerange', label: 'Date & time range' },
//   // { value: 'before', label: 'On or before' },
//   // { value: 'after', label: 'On or after' }
// ];

@Component({
  selector: 'app-filter-catalog',
  templateUrl: './filter-catalog.component.html',
  styleUrls: ['./filter-catalog.component.scss']
})
export class FilterCatalogComponent implements OnInit, OnDestroy {

  OPERATORS = OPERATORS;

  @Input() reflection: AttributeReflections;
  @Output() filterChange = new EventEmitter<any>();
  @Output() filterApply = new EventEmitter<string>();

  @ViewChild(FilterCatalogValueDirective, { static: true }) valueHost: FilterCatalogValueDirective;

  operators: any[] = [];
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
    if (this.criterion) {
      this.criterion.filterChange.unsubscribe();
    }
  }

  ngOnChanges(changes): void {
    if (changes.reflection) {
      this.loadReflection(changes.reflection.currentValue);
    }
  }

  onDimensionChange(selection): void {
    this.dimension = selection.option.value;

    let type = this.builderType;

    let operatorSet = OPERATORS[this.operatorType(type)];

    this.operators = operatorSet.map((componentType: Type<ValueBuilder>) => {
      return new componentType();
    });
  }

  operatorType(type): string {
    switch (type) {
      case 'integer':
        return 'numeric';
      case 'string':
      case 'text':
        return 'string';
      case 'geography':
      case 'datetime':
        return type;
      default:
        return null;
    }
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

  propNameByKey(key) {
    return this.reflection.attributes[key].name;
  }

  getSelectedOperator(): BaseCriterion {
    const idx = this.operators.map(op => op.option).indexOf(this.criterion);
    return this.operators[idx];
  }

  columnNameByKey(key) {
    return this.reflection.attributes[key].name
  }

  onOperatorChange(selection): void {
    if (this.criterion) {
      this.criterion.filterChange.unsubscribe();
    }
    this.criterion = selection.option.value;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.criterion.valueBuilderType);
    const viewContainerRef = this.valueHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ValueBuilder>(componentFactory);
    this.criterion.valueBuilder = componentRef.instance;
    this.criterion.dimension = `prop("${this.propNameByKey(this.dimension)}")`;
    this.criterion.filterChange.subscribe((filter: string) => {
      this.filter = filter;
      this.filterChange.emit(filter);
    });
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

}
