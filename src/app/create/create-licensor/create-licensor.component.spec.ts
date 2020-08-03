import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLicensorComponent } from './create-licensor.component';

describe('CreateLicensorComponent', () => {
  let component: CreateLicensorComponent;
  let fixture: ComponentFixture<CreateLicensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLicensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLicensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
