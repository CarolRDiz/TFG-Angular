import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-navigation-mobile',
  templateUrl: './admin-navigation-mobile.component.html',
  styleUrls: ['./admin-navigation-mobile.component.scss']
})
export class AdminNavigationMobileComponent {
  @Output() closeEvent = new EventEmitter();
  
  close(){
    this.closeEvent.emit();
  }
}
