import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIllustrationComponent } from './admin-illustration.component';

describe('AdminIllustrationComponent', () => {
  let component: AdminIllustrationComponent;
  let fixture: ComponentFixture<AdminIllustrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AdminIllustrationComponent]
});
    fixture = TestBed.createComponent(AdminIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
