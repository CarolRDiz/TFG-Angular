import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class SelectComponent {
  @Input() label: string;
  @Input() items: any;
  @Input() predetermined: any;
  @Output() selectEvent = new EventEmitter<String>();

  isOpen:boolean = false;

  constructor(private _eref: ElementRef){}

  switch(){
    console.log(this.isOpen)
    this.isOpen = !this.isOpen
  }

  select(item: string){
    console.log("select emit: "+item)
    this.selectEvent.emit(item);
  }

  onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target)) // or some similar check
    this.isOpen = false;
   }
}
