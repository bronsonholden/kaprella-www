import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceTableNoBindingComponent } from './resource-table-no-binding.component';

describe('ResourceTableNoBindingComponent', () => {
  let component: ResourceTableNoBindingComponent;
  let fixture: ComponentFixture<ResourceTableNoBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceTableNoBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceTableNoBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
