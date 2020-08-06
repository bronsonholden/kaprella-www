import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldMapComponent } from './field-map.component';

describe('FieldMapComponent', () => {
  let component: FieldMapComponent;
  let fixture: ComponentFixture<FieldMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
