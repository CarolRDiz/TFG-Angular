import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersComponent } from './admin-orders.component';

describe('AdminOrdersComponent', () => {
  let component: AdminOrdersComponent;
  let fixture: ComponentFixture<AdminOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AdminOrdersComponent]
});
    fixture = TestBed.createComponent(AdminOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
