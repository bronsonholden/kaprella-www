import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kaprella';

  mobileQuery: MediaQueryList;
  mobileQueryListener: () => void;

  topbarConfig: TopbarConfig = {
    sections: [
      {
        title: 'Licensor Relationship',
        buttons: [
          {
            label: 'Claims',
            routerLink: ''
          },
          {
            label: 'Audits',
            routerLink: ''
          }
        ]
      },
      {
        title: 'Farm Management',
        buttons: [
          {
            label: 'Active Plantings',
            routerLink: ''
          }
        ]
      },
      {
        title: 'Database',
        buttons: [
          {
            label: 'Farmers',
            routerLink: ''
          },
          {
            label: 'Fields',
            routerLink: 'fields'
          },
          {
            label: 'Licensors',
            routerLink: ''
          },
          {
            label: 'Plant Varieties',
            routerLink: ''
          }
        ]
      }
    ]
  }

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}

export class TopbarButton {
  constructor(public label: string,
              public routerLink: string) {}
}

export class TopbarSection {
  constructor(public title: string,
              public buttons: TopbarButton[] = []) {}
}

export class TopbarConfig {
  constructor(public sections: TopbarSection[] = []) {}
}
