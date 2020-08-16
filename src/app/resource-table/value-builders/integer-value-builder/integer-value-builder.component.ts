import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-integer-value-builder',
  templateUrl: './integer-value-builder.component.html',
  styleUrls: ['./integer-value-builder.component.scss']
})
export class IntegerValueBuilderComponent implements OnInit {
  @Input() value: number;
  @Output() valueChange = new EventEmitter<number[]>();

  constructor() { }

  ngOnInit(): void {
  }

  onValueChange(value: number): void {
    this.valueChange.emit([value]);
  }

}
