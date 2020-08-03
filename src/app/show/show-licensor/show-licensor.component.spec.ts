import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLicensorComponent } from './show-licensor.component';

describe('ShowLicensorComponent', () => {
  let component: ShowLicensorComponent;
  let fixture: ComponentFixture<ShowLicensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLicensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLicensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
