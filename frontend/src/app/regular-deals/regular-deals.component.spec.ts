import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularDealsComponent } from './regular-deals.component';

describe('RegularDealsComponent', () => {
  let component: RegularDealsComponent;
  let fixture: ComponentFixture<RegularDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularDealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
