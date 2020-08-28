import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { HumanizedFilter } from '../filters/humanized-filter';

@Component({
  selector: 'app-resource-table-filter-list',
  templateUrl: './resource-table-filter-list.component.html',
  styleUrls: ['./resource-table-filter-list.component.scss']
})
export class ResourceTableFilterListComponent implements OnInit {

  @Input() filters: HumanizedFilter[];
  @Output() filterRemoved = new EventEmitter<HumanizedFilter>();

  constructor() { }

  ngOnInit(): void {
  }

}
