import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LazyImgDirective } from 'src/app/shared/directives/lazy-img.directive';

@Component({
    selector: 'app-admin-header-mobile',
    templateUrl: './admin-header-mobile.component.html',
    styleUrls: ['./admin-header-mobile.component.scss'],
    standalone: true,
    imports: [RouterLink, LazyImgDirective, MatButtonModule, MatIconModule]
})
export class AdminHeaderMobileComponent {
  @Output() openEvent = new EventEmitter();

  open() {
    this.openEvent.emit();
  }
}
