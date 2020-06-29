import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatResourceTableComponent } from './mat-resource-table.component';

describe('MatResourceTableComponent', () => {
  let component: MatResourceTableComponent;
  let fixture: ComponentFixture<MatResourceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatResourceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatResourceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
