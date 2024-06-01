import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMobileBottomComponent } from './navigation-mobile-bottom.component';

describe('NavigationMobileBottomComponent', () => {
  let component: NavigationMobileBottomComponent;
  let fixture: ComponentFixture<NavigationMobileBottomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NavigationMobileBottomComponent]
});
    fixture = TestBed.createComponent(NavigationMobileBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
