import { Component, TemplateRef, Input, inject, HostListener } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  id: number;
  product: Product;

  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);

  constructor(
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.getProduct();
  }

  getProduct() {
    this.productService.getProductById(this.id).subscribe((data) => {
      this.product = data;
    });
  }
  addToCart(id: number){
    this.cartService.addToCart(id, 1);
  }
}
