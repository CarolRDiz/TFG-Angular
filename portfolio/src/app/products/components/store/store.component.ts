import { Component, TemplateRef, Input, inject, HostListener } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  productService: ProductService = inject(ProductService);
  products: Product[];

  constructor(private router: Router){}
  ngOnInit() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    })
  }
  cartModal: boolean = false;
  loginModal: boolean = false;

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
  goToUser(){
    this.router.navigate(['/', 'user'])
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
  }

}
