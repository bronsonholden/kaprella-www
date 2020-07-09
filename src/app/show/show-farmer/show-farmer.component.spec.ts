import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFarmerComponent } from './show-farmer.component';

describe('ShowFarmerComponent', () => {
  let component: ShowFarmerComponent;
  let fixture: ComponentFixture<ShowFarmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFarmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
