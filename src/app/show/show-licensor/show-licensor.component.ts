import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LicensorApiService } from '../../licensor-api.service';
import { Licensor } from '../../models/licensor';

@Component({
  selector: 'app-show-licensor',
  templateUrl: './show-licensor.component.html',
  styleUrls: ['./show-licensor.component.scss']
})
export class ShowLicensorComponent implements OnInit {

  licensor: Licensor;
  scope: any;

  about = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non neque ut ligula interdum condimentum sit amet nec nibh. Nullam enim tortor, venenatis vitae elit in, cursus vehicula justo. Praesent feugiat vulputate orci. Nam suscipit sapien sit amet nisl tempus sagittis. Praesent metus metus, iaculis non nunc et, interdum tincidunt dolor. Quisque eu erat viverra, iaculis ligula vel, convallis nisi. Suspendisse potenti. Sed imperdiet odio lacinia congue cursus.

Donec hendrerit a sem eu dapibus. Curabitur blandit nec elit sed suscipit. Sed ornare volutpat sapien id fringilla. Phasellus ipsum risus, convallis efficitur lobortis non, ullamcorper a felis.
`;

  constructor(private licensorApi: LicensorApiService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.scope = {
        'filter': [ `prop('farmer_id') == ${params.id}` ]
      };

      this.licensorApi.get(params.id).subscribe((res: any) => {
        this.licensor = res.data;
      });
    });
  }

}
