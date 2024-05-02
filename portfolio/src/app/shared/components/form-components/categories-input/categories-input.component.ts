import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-categories-input',
  templateUrl: './categories-input.component.html',
  styleUrls: ['./categories-input.component.scss']
})
export class CategoriesInputComponent {
  @Output() openModalEvent = new EventEmitter();
  
  openModal(){
    this.openModalEvent.emit();
  }
}
