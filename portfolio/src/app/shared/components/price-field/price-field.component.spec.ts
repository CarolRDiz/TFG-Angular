import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceFieldComponent } from './price-field.component';

describe('PriceFieldComponent', () => {
  let component: PriceFieldComponent;
  let fixture: ComponentFixture<PriceFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceFieldComponent]
    });
    fixture = TestBed.createComponent(PriceFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
