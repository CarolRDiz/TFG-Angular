import { Component, EventEmitter, Output } from '@angular/core';
import { LazyImgDirective } from '../../directives/lazy-img.directive';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClickStopPropagationDirective } from '../../directives/click-stop-propagation.directive';

@Component({
    selector: 'app-navigation-mobile',
    templateUrl: './navigation-mobile.component.html',
    styleUrls: ['./navigation-mobile.component.scss'],
    standalone: true,
    imports: [ClickStopPropagationDirective, MatButtonModule, MatIconModule, RouterLink, LazyImgDirective]
})
export class NavigationMobileComponent {
  @Output() closeEvent = new EventEmitter();
  
  close(){
    this.closeEvent.emit();
  }
}
