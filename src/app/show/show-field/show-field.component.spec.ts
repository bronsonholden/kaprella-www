import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFieldComponent } from './show-field.component';

describe('ShowFieldComponent', () => {
  let component: ShowFieldComponent;
  let fixture: ComponentFixture<ShowFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
