import { Component, TemplateRef, Input, inject, HostListener } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginModalComponent } from '../../../shared/components/login-modal/login-modal.component';
import { CartComponent } from '../../../shared/components/cart/cart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss'],
    standalone: true,
    imports: [NgIf, MatButtonModule, MatIconModule, RouterOutlet, CartComponent, LoginModalComponent]
})
export class StoreComponent {
  productService: ProductService = inject(ProductService);
  products: Product[];
  cartModal: boolean = false;
  loginModal: boolean = false;
  userLoginOn: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    })
    this.authService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
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
  goToUser() {
    this.router.navigate(['/', 'user'])
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
  }

}
