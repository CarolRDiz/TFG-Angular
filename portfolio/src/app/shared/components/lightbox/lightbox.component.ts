import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, Renderer2 } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { LazyImgDirective } from '../../directives/lazy-img.directive';
import { ClickStopPropagationDirective } from '../../directives/click-stop-propagation.directive';
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./lightbox.component.scss'],
    standalone: true,
    imports: [MatIconModule, ClickStopPropagationDirective, LazyImgDirective]
})
export class LightboxComponent {
  @Input() image = "../../assets/images/gallery/PANTALLA_Gaelo_JPG_50porciento_RGB.jpg"
  @Output() slideLeftEvent = new EventEmitter<void>();
  @Output() slideRightEvent = new EventEmitter<void>();
  @Output() closeEvent = new EventEmitter<void>();

  constructor(@Inject(DOCUMENT) private document: Document,
    protected renderer: Renderer2
  ) {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  slideLeft() {
    this.slideLeftEvent.emit();
  }
  slideRight() {
    this.slideRightEvent.emit();
  }
  close() {
    this.closeEvent.emit();
    this.renderer.setStyle(document.body, 'overflow', 'visible');
  }

}
