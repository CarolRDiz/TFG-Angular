import { Component, EventEmitter, Output } from '@angular/core';
import { LazyImgDirective } from '../../directives/lazy-img.directive';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-admin-navigation-mobile',
    templateUrl: './admin-navigation-mobile.component.html',
    styleUrls: ['./admin-navigation-mobile.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatIconModule, RouterLink, LazyImgDirective]
})
export class AdminNavigationMobileComponent {
  @Output() closeEvent = new EventEmitter();
  
  close(){
    this.closeEvent.emit();
  }
}
