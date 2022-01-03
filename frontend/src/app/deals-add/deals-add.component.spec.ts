import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsAddComponent } from './deals-add.component';

describe('DealsAddComponent', () => {
  let component: DealsAddComponent;
  let fixture: ComponentFixture<DealsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
