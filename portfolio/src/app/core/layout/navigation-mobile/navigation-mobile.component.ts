import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClickStopPropagationDirective } from 'src/app/shared/directives/click-stop-propagation.directive';
import { LazyImgDirective } from 'src/app/shared/directives/lazy-img.directive';

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
