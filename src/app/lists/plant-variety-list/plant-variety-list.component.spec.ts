import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantVarietyListComponent } from './plant-variety-list.component';

describe('PlantVarietyListComponent', () => {
  let component: PlantVarietyListComponent;
  let fixture: ComponentFixture<PlantVarietyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantVarietyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantVarietyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
