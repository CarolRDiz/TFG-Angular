import { Component, HostListener, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent {
   @Input() image="../../assets/images/gallery/PANTALLA_Gaelo_JPG_50porciento_RGB.jpg"
   @Output() slideLeftEvent = new EventEmitter<void>();
   @Output() slideRightEvent = new EventEmitter<void>();
   @Output() closeEvent = new EventEmitter<void>();

   slideLeft(){
    this.slideLeftEvent.emit();
   }
   slideRight(){
    this.slideRightEvent.emit();
   }
   close(){
    this.closeEvent.emit();
   }
   
}
