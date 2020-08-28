import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTableFilterListComponent } from './resource-table-filter-list.component';

describe('ResourceTableFilterListComponent', () => {
  let component: ResourceTableFilterListComponent;
  let fixture: ComponentFixture<ResourceTableFilterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceTableFilterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTableFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
