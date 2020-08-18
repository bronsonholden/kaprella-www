import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantVarietyFormComponent } from './plant-variety-form.component';

describe('PlantVarietyFormComponent', () => {
  let component: PlantVarietyFormComponent;
  let fixture: ComponentFixture<PlantVarietyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantVarietyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantVarietyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
