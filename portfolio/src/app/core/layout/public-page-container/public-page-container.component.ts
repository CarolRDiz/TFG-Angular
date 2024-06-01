import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { HeaderComponent } from 'src/app/core/layout/header/header.component';
import { HeaderMobileComponent } from 'src/app/core/layout/header-mobile/header-mobile.component';
import { NavigationMobileComponent } from 'src/app/core/layout/navigation-mobile/navigation-mobile.component';

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
