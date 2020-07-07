import {
  Component,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  ViewChildren,
  ElementRef,
  QueryList,
  Renderer2
} from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren('sideNavPanel', { read: ElementRef }) sideNavPanels: QueryList<ElementRef>;

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
            routerLink: 'farmers'
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

  constructor(private renderer: Renderer2,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.ltMdQuery = media.matchMedia('(max-width: 959px)');
    this.ltMdQueryListener = () => changeDetectorRef.detectChanges();
    this.ltMdQuery.addListener(this.ltMdQueryListener);
  }

  sideNavOpened() {
    this.renderer.addClass(document.body, 'no-overflow');
  }

  sideNavClosed() {
    this.renderer.removeClass(document.body, 'no-overflow');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    this.ltMdQuery.removeListener(this.ltMdQueryListener);
  }

  scrollToMenuPanel(idx) {
    const panel = this.sideNavPanels.toArray()[idx];
    const element = panel.nativeElement;
    if (element.getBoundingClientRect().bottom > window.innerHeight) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
