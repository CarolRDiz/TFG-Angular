import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortGalleryComponent } from './sort-gallery.component';

describe('SortGalleryComponent', () => {
  let component: SortGalleryComponent;
  let fixture: ComponentFixture<SortGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [SortGalleryComponent]
});
    fixture = TestBed.createComponent(SortGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
