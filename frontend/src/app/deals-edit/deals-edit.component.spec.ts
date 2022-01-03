import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsEditComponent } from './deals-edit.component';

describe('DealsEditComponent', () => {
  let component: DealsEditComponent;
  let fixture: ComponentFixture<DealsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
