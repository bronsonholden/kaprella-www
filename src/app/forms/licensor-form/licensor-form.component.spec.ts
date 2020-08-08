import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensorFormComponent } from './licensor-form.component';

describe('LicensorFormComponent', () => {
  let component: LicensorFormComponent;
  let fixture: ComponentFixture<LicensorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
