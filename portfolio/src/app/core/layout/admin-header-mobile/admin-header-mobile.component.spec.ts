import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderMobileComponent } from './admin-header-mobile.component';

describe('AdminHeaderMobileComponent', () => {
  let component: AdminHeaderMobileComponent;
  let fixture: ComponentFixture<AdminHeaderMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AdminHeaderMobileComponent]
});
    fixture = TestBed.createComponent(AdminHeaderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
