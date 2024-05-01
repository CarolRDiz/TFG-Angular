import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() label: string;
  @Input() items: any;
  @Input() predetermined: any;
  @Output() selectEvent = new EventEmitter<String>();

  select(item: string){
    console.log("select emit: "+item)
    this.selectEvent.emit(item);
  }
}
