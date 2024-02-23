import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateProductComponent } from './admin-create-product.component';

describe('AdminCreateProductComponent', () => {
  let component: AdminCreateProductComponent;
  let fixture: ComponentFixture<AdminCreateProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateProductComponent]
    });
    fixture = TestBed.createComponent(AdminCreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
