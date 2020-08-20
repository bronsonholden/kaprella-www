import {
  Component,
  Input,
  OnInit
} from '@angular/core';

export interface ImageSource {
  type: string;
  src: string;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input('class') classes: string;
  @Input() srcFallback: string;
  @Input() sources: ImageSource[] = [];
  @Input() alt: string;

  constructor() { }

  ngOnInit(): void {
  }

}
