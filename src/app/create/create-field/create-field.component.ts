import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-field',
  templateUrl: './create-field.component.html',
  styleUrls: ['./create-field.component.scss']
})
export class CreateFieldComponent implements OnInit {

  name: string;
  farmerId: number;

  constructor() { }

  ngOnInit(): void {
  }

}
