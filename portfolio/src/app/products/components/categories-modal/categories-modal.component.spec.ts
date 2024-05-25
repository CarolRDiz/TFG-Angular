import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesModalComponent } from './categories-modal.component';

describe('CategoriesModalComponent', () => {
  let component: CategoriesModalComponent;
  let fixture: ComponentFixture<CategoriesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [CategoriesModalComponent]
});
    fixture = TestBed.createComponent(CategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
