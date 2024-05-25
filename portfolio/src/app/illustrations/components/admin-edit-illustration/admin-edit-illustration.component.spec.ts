import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditIllustrationComponent } from './admin-edit-illustration.component';

describe('AdminEditIllustrationComponent', () => {
  let component: AdminEditIllustrationComponent;
  let fixture: ComponentFixture<AdminEditIllustrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AdminEditIllustrationComponent]
});
    fixture = TestBed.createComponent(AdminEditIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
