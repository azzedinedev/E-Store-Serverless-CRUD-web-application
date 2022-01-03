import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsUploadComponent } from './deals-upload.component';

describe('DealsUploadComponent', () => {
  let component: DealsUploadComponent;
  let fixture: ComponentFixture<DealsUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
