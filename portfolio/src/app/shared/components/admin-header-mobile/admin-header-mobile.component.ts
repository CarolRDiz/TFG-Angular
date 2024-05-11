import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-header-mobile',
  templateUrl: './admin-header-mobile.component.html',
  styleUrls: ['./admin-header-mobile.component.scss']
})
export class AdminHeaderMobileComponent {
  @Output() openEvent = new EventEmitter();

  open() {
    this.openEvent.emit();
  }
}
