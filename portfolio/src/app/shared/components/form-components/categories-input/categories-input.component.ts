import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-categories-input',
    templateUrl: './categories-input.component.html',
    styleUrls: ['./categories-input.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatIconModule]
})
export class CategoriesInputComponent {
  @Output() openModalEvent = new EventEmitter();
  
  openModal(){
    this.openModalEvent.emit();
  }
}
