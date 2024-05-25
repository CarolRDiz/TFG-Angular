import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewComponent } from './admin-view.component';

describe('AdminViewComponent', () => {
  let component: AdminViewComponent;
  let fixture: ComponentFixture<AdminViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AdminViewComponent]
});
    fixture = TestBed.createComponent(AdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
