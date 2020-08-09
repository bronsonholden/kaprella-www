import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WktClipboardComponent } from './wkt-clipboard.component';

describe('WktClipboardComponent', () => {
  let component: WktClipboardComponent;
  let fixture: ComponentFixture<WktClipboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WktClipboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WktClipboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
