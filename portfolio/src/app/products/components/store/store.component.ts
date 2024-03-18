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
  categoriesModal: boolean = false;

  openModal() {
    this.categoriesModal = true;
  }
  closeModal() {
    this.categoriesModal = false;
  }
  goToCart() {
    this.categoriesModal = true;
    // this.router.navigate(['/', 'cart'])
    //   .then(nav => {
    //     console.log(nav); // true if navigation is successful
    //   }, err => {
    //     console.log(err) // when there's an error
    //   });
  }

}
