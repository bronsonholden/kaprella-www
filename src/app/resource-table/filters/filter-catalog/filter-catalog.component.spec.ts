import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCatalogComponent } from './resource-table-filter-catalog.component';

describe('FilterCatalogComponent', () => {
  let component: FilterCatalogComponent;
  let fixture: ComponentFixture<FilterCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
