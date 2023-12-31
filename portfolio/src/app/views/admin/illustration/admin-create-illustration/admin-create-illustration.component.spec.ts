import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateIllustrationComponent } from './admin-create-illustration.component';

describe('AdminCreateIllustrationComponent', () => {
  let component: AdminCreateIllustrationComponent;
  let fixture: ComponentFixture<AdminCreateIllustrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateIllustrationComponent]
    });
    fixture = TestBed.createComponent(AdminCreateIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
