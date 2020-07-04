import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTableCellComponent } from './resource-table-cell.component';

describe('ResourceTableCellComponent', () => {
  let component: ResourceTableCellComponent;
  let fixture: ComponentFixture<ResourceTableCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceTableCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
