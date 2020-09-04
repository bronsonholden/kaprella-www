import {
  Type,
  Input,
  Output,
  Injectable,
  OnDestroy,
  EventEmitter
} from '@angular/core';
import { ValueBuilder } from '../../value-builders/value-builder';

@Injectable()
export abstract class BaseCriterion implements OnDestroy {
  @Input() filter: string;
  @Output() filterChange = new EventEmitter<string>();

  @Input() dimension: string;

  abstract _valueBuilder: ValueBuilder;

  ngOnDestroy() {
    if (this._valueBuilder) {
      this._valueBuilder.valueChange.unsubscribe();
    }
  }

  abstract set valueBuilder(val: ValueBuilder);
  abstract get valueBuilder(): ValueBuilder;
  abstract get option(): string;
  abstract get title(): string;
  abstract get valueBuilderType(): Type<ValueBuilder>;
}
