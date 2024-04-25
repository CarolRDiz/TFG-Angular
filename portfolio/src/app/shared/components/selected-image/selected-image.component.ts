import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-selected-image',
  templateUrl: './selected-image.component.html',
  styleUrls: ['./selected-image.component.scss']
})
export class SelectedImageComponent {
  @Input() fileUrl: String;
  @Output() deleteImageEvent = new EventEmitter<void>();

  deleteImage(){
    this.deleteImageEvent.emit();
  }
}
