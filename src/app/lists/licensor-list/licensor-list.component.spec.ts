import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensorListComponent } from './licensor-list.component';

describe('LicensorListComponent', () => {
  let component: LicensorListComponent;
  let fixture: ComponentFixture<LicensorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
