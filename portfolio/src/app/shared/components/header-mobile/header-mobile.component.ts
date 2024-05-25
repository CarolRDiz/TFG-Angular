import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { CartComponent } from '../cart/cart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { LazyImgDirective } from '../../directives/lazy-img.directive';

@Component({
    selector: 'app-header-mobile',
    templateUrl: './header-mobile.component.html',
    styleUrls: ['./header-mobile.component.scss'],
    standalone: true,
    imports: [RouterLink, LazyImgDirective, NgIf, MatButtonModule, MatIconModule, CartComponent, LoginModalComponent]
})
export class HeaderMobileComponent {
  @Output() openEvent = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) { }

  userLoginOn: boolean = false;
  cartModal: boolean = false;
  loginModal: boolean = false;

  ngOnInit() {
    this.authService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
  }
  open() {
    this.openEvent.emit();
  }
  goToUser() {
    this.router.navigate(['/', 'user'])
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
  }
  openCartModal() {
    this.cartModal = true;
  }
  closeCartModal() {
    this.cartModal = false;
  }
  openLoginModal() {
    this.loginModal = true;
  }
  closeLoginModal() {
    this.loginModal = false;
  }
}
