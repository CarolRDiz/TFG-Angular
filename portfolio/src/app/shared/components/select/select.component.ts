import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    host: {
        '(document:click)': 'onClick($event)',
    },
    standalone: true,
    imports: [MatIconModule, NgFor],
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
    this.isOpen = !this.isOpen
  }

  onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target)) // or some similar check
    this.isOpen = false;
   }
}
