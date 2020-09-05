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

import { version } from '../../package.json';
import { MediaMatcher } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /* Version number for the web application, pulled from package.json */
  webVersion: string = version;

  /* Version number for the API server, pulled from the root endpoint, i.e.
   * GET /
   */
  apiVersion: string;

  /* Query list of sidenav accordion sections. Used to scroll expanded
   * panels into view if they extend below the bottom edge of the viewport
   * when expanded.
   */
  @ViewChildren('sideNavPanel', { read: ElementRef }) sideNavPanels: QueryList<ElementRef>;

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
            routerLink: 'licensors'
          },
          {
            label: 'Plant Varieties',
            routerLink: 'plantVarieties'
          }
        ]
      }
    ]
  }

  darkMode = false;

  constructor(private api: ApiService,
              public router: Router,
              private renderer: Renderer2,
              private title: Title,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.ltMdQuery = media.matchMedia('(max-width: 959px)');
    this.ltMdQueryListener = () => changeDetectorRef.detectChanges();
    this.ltMdQuery.addListener(this.ltMdQueryListener);
  }

  onDarkModeToggle(event): void {
    this.darkMode = event.checked;
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'theme-alternate');
    } else {
      this.renderer.removeClass(document.body, 'theme-alternate');
    }
  }

  sideNavOpened(): void {
    /* On Safari iOS, allowing the body to scroll, i.e. have the overflow
     * property as anything other than 'none', will cause it to exhibit the
     * "bouncy" or elastic scroll at the edges. This takes away scroll focus
     * from the sidenav, which is the only element the user should be
     * interacting with while it is open. Setting overflow to none prevents
     * this behavior.
     */
    this.renderer.addClass(document.body, 'lt-md-no-overflow');
  }

  sideNavClosed(): void {
    this.renderer.removeClass(document.body, 'lt-md-no-overflow');
  }

  ngOnInit(): void {
    this.title.setTitle('Kaprella');
    this.api.getApiVersion().subscribe((apiVersion: string) => {
      this.apiVersion = apiVersion;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    this.ltMdQuery.removeListener(this.ltMdQueryListener);
  }

  scrollToMenuPanel(idx: number): void {
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
