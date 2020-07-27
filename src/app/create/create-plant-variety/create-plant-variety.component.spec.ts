import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlantVarietyComponent } from './create-plant-variety.component';

describe('CreatePlantVarietyComponent', () => {
  let component: CreatePlantVarietyComponent;
  let fixture: ComponentFixture<CreatePlantVarietyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePlantVarietyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlantVarietyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
