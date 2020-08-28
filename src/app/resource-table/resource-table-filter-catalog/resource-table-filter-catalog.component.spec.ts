import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTableFilterCatalogComponent } from './resource-table-filter-catalog.component';

describe('ResourceTableFilterCatalogComponent', () => {
  let component: ResourceTableFilterCatalogComponent;
  let fixture: ComponentFixture<ResourceTableFilterCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceTableFilterCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTableFilterCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
