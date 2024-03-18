import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPageContainerComponent } from './public-page-container.component';

describe('PublicPageContainerComponent', () => {
  let component: PublicPageContainerComponent;
  let fixture: ComponentFixture<PublicPageContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicPageContainerComponent]
    });
    fixture = TestBed.createComponent(PublicPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
