import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawBoundaryComponent } from './draw-boundary.component';

describe('DrawBoundaryComponent', () => {
  let component: DrawBoundaryComponent;
  let fixture: ComponentFixture<DrawBoundaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawBoundaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawBoundaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
