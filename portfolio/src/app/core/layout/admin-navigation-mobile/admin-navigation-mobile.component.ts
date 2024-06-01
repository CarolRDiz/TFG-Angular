import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LazyImgDirective } from 'src/app/shared/directives/lazy-img.directive';

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
