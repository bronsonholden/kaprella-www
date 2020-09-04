import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDisplayComponent } from './area-display.component';

describe('AreaDisplayComponent', () => {
  let component: AreaDisplayComponent;
  let fixture: ComponentFixture<AreaDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
