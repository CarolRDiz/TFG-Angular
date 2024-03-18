import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  inject,
  Output,
} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../product';
import { CartProduct } from '../../cart-product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @Output() closeEvent = new EventEmitter();

  products: Product[]
  /*
    CartProducts
    Contains all product data plus quantity 
  */
  cartProducts: any = [];
  totalPrice: number = 0;

  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);

  constructor(private router: Router){}
  ngOnInit() {
    let cartItems = this.cartService.getItems();
    let cartIds = cartItems.map((item: any) => item.id);
    this.productService.getListProducts(cartIds).subscribe(products => {
      this.products = products;
      cartItems.forEach((cartItem: any) => {
        let product: any = this.products.find((product) => product.id == cartItem.id);
        product = { ...product, quantity: cartItem.quantity }
        this.cartProducts.push(product);
      });
      this.calculateTotal();
    });
    
  }
  calculateTotal() {
    this.totalPrice = this.cartProducts.reduce((total: any, item: any) => {
      return total + (item.quantity * item.price)
    }, 0)
  }
  refreshCart() {
    this.cartProducts = [];
    let cartItems = this.cartService.getItems();
    cartItems.forEach((cartItem: any) => {
      let product: any = this.products.find((product) => product.id == cartItem.id);
      product = { ...product, quantity: cartItem.quantity }
      this.cartProducts.push(product);
    });
    this.calculateTotal();
  }
  checkout(){
    this.router.navigate(['/', 'checkout'])
          .then(nav => {
            console.log(nav); // true if navigation is successful
          }, err => {
            console.log(err) // when there's an error
          });
  }

  close(): void {
    this.closeEvent.emit();
  }

  addMoreItem(id: number) {
    this.cartService.addToCart(id, 1);
    this.refreshCart();
  }
  reduceItem(id: number) {
    this.cartService.addToCart(id, -1);
    this.refreshCart();
  }

}
