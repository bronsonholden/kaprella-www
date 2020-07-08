import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTableRouteBindingComponent } from './resource-table-route-binding.component';

describe('ResourceTableRouteBindingComponent', () => {
  let component: ResourceTableRouteBindingComponent;
  let fixture: ComponentFixture<ResourceTableRouteBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceTableRouteBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTableRouteBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
