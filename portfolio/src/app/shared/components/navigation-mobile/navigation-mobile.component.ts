import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-mobile',
  templateUrl: './navigation-mobile.component.html',
  styleUrls: ['./navigation-mobile.component.scss']
})
export class NavigationMobileComponent {
  @Output() closeEvent = new EventEmitter();
  
  close(){
    this.closeEvent.emit();
  }
}
