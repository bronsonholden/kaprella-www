import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-licensor',
  templateUrl: './create-licensor.component.html',
  styleUrls: ['./create-licensor.component.scss']
})
export class CreateLicensorComponent implements OnInit {

  constructor(private location: Location,
              private router: Router) { }

  ngOnInit(): void {
  }

}
