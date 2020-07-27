import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlantVarietyComponent } from './show-plant-variety.component';

describe('ShowPlantVarietyComponent', () => {
  let component: ShowPlantVarietyComponent;
  let fixture: ComponentFixture<ShowPlantVarietyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPlantVarietyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPlantVarietyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
