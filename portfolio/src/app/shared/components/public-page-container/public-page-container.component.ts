import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationMobileComponent } from '../navigation-mobile/navigation-mobile.component';
import { NgIf } from '@angular/common';
import { HeaderMobileComponent } from '../header-mobile/header-mobile.component';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-public-page-container',
    templateUrl: './public-page-container.component.html',
    styleUrls: ['./public-page-container.component.scss'],
    standalone: true,
    imports: [HeaderComponent, HeaderMobileComponent, NgIf, NavigationMobileComponent, RouterOutlet]
})
export class PublicPageContainerComponent {
  mobileNavOn: boolean = false;

  mobileNavSwitch(){
    this.mobileNavOn = !this.mobileNavOn;
  }
}
