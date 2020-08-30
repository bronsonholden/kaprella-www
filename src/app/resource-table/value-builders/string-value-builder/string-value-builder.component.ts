import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-string-value-builder',
  templateUrl: './string-value-builder.component.html',
  styleUrls: ['./string-value-builder.component.scss']
})
export class StringValueBuilderComponent implements OnInit {
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  onValueChange(value: string): void {
    this.valueChange.emit([value]);
  }

}
