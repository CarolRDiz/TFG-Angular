import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LazyImgDirective } from '../../directives/lazy-img.directive';

@Component({
    selector: 'app-selected-image',
    templateUrl: './selected-image.component.html',
    styleUrls: ['./selected-image.component.scss'],
    standalone: true,
    imports: [LazyImgDirective, MatButtonModule, MatIconModule]
})
export class SelectedImageComponent {
  @Input() fileUrl: String;
  @Output() deleteImageEvent = new EventEmitter<void>();

  deleteImage(){
    this.deleteImageEvent.emit();
  }
}
