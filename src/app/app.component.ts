import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Kaprella';

  isMobileSafari;

  /* Topbar is shorter on xs screens (< 600px width). This query allows us to
   * adjust the sidenav top gap accordingly.
   */
  mobileQuery: MediaQueryList;
  mobileQueryListener: () => void;
  /* Sidenav will open over the main content area on lt-md screens (< 960px
   * width). This query allows us to switch the drawer mode accordingly.
   */
  ltMdQuery: MediaQueryList;
  ltMdQueryListener: () => void;

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
              media: MediaMatcher,
              private snackBar: MatSnackBar) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.ltMdQuery = media.matchMedia('(max-width: 959px)');
    this.ltMdQueryListener = () => changeDetectorRef.detectChanges();
    this.ltMdQuery.addListener(this.ltMdQueryListener);

    var ua = window.navigator.userAgent;
    var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    var webkit = !!ua.match(/WebKit/i);
    this.isMobileSafari = iOS && webkit && !ua.match(/CriOS/i);
  }

  ngOnInit(): void {
    if (this.isMobileSafari) {
      this.snackBar.open('Using iOS Safari in landscape mode may be troublesome. Consider using Google Chrome or staying in portrait mode.', 'OK', {
        duration: 5000
      });
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    this.ltMdQuery.removeListener(this.ltMdQueryListener);
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
