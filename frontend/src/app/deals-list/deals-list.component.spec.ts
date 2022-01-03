import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsListComponent } from './deals-list.component';

describe('DealsListComponent', () => {
  let component: DealsListComponent;
  let fixture: ComponentFixture<DealsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
