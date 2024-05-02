import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent {
  @Output() openEvent = new EventEmitter();
  open(){
    this.openEvent.emit();
  }
}
