import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsAddSpecialComponent } from './deals-add-special.component';

describe('DealsAddSpecialComponent', () => {
  let component: DealsAddSpecialComponent;
  let fixture: ComponentFixture<DealsAddSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsAddSpecialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsAddSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
