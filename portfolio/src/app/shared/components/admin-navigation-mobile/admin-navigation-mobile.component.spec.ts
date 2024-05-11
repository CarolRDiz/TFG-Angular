import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavigationMobileComponent } from './admin-navigation-mobile.component';

describe('AdminNavigationMobileComponent', () => {
  let component: AdminNavigationMobileComponent;
  let fixture: ComponentFixture<AdminNavigationMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNavigationMobileComponent]
    });
    fixture = TestBed.createComponent(AdminNavigationMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
