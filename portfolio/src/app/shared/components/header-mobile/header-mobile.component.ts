import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
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
