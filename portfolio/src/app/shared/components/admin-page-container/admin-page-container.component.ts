import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavigationMobileComponent } from '../admin-navigation-mobile/admin-navigation-mobile.component';
import { NgIf } from '@angular/common';
import { AdminHeaderMobileComponent } from '../admin-header-mobile/admin-header-mobile.component';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';

@Component({
    selector: 'app-admin-page-container',
    templateUrl: './admin-page-container.component.html',
    styleUrls: ['./admin-page-container.component.scss'],
    standalone: true,
    imports: [AdminHeaderComponent, AdminHeaderMobileComponent, NgIf, AdminNavigationMobileComponent, RouterOutlet]
})
export class AdminPageContainerComponent {
  mobileNavOn: boolean = false;

  mobileNavSwitch(){
    this.mobileNavOn = !this.mobileNavOn;
  }
}
