import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditProductComponent } from './admin-edit-product.component';

describe('AdminEditProductComponent', () => {
  let component: AdminEditProductComponent;
  let fixture: ComponentFixture<AdminEditProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditProductComponent]
    });
    fixture = TestBed.createComponent(AdminEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
