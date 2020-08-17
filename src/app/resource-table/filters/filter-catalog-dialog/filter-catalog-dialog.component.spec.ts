import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCatalogDialogComponent } from './filter-catalog-dialog.component';

describe('FilterCatalogDialogComponent', () => {
  let component: FilterCatalogDialogComponent;
  let fixture: ComponentFixture<FilterCatalogDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCatalogDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCatalogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
