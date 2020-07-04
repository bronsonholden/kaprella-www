import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTableCellLinkComponent } from './resource-table-cell-link.component';

describe('ResourceTableCellLinkComponent', () => {
  let component: ResourceTableCellLinkComponent;
  let fixture: ComponentFixture<ResourceTableCellLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceTableCellLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTableCellLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
