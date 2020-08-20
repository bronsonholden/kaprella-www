import { Component, OnInit } from '@angular/core';
import { ImageSource } from '../image/image.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  farmersBannerSources: ImageSource[] = [
    { src: './assets/farmers-banner.webp', type: 'image/webp' },
    { src: './assets/farmers-banner.png', type: 'image/png' }
  ];

  licensorsBannerSources: ImageSource[] = [
    { src: './assets/licensors-banner.webp', type: 'image/webp' },
    { src: './assets/licensors-banner.png', type: 'image/png' }
  ];

  fieldsBannerSources: ImageSource[] = [
    { src: './assets/fields-banner.webp', type: 'image/webp' },
    { src: './assets/fields-banner.png', type: 'image/png' }
  ];

  plantVarietiesBannerSources: ImageSource[] = [
    { src: './assets/plant-varieties-banner.webp', type: 'image/webp' },
    { src: './assets/plant-varieties-banner.png', type: 'image/png' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
