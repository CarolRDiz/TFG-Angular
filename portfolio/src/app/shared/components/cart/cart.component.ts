import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  inject,
  Output,
} from '@angular/core';
import { ProductService } from '../../../products/services/product.service';
import { CartService } from '../../../products/services/cart.service';
import { Product } from '../../../products/product';
import { CartProduct } from '../../../products/cart-product';
import { Router } from '@angular/router';
import { CartItem } from '../../../products/cart-item';
import { environment } from 'src/app/environments/environment';

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
    Contains all product data plus amount 
  */
  cartProducts: any = [];
  totalPrice: number = 0;

  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  imageUrl = environment.urlApiImage;

  constructor(private router: Router){}
  ngOnInit() {

    let cartItems = this.cartService.getItems();
    let cartIds = cartItems.map((item: CartItem) => item.product_id);

    this.productService.getListProducts(cartIds).subscribe(products => {
      this.products = products;
      cartItems.forEach((cartItem: any) => {
        let product: any = this.products.find((product) => product.id == cartItem.product_id);
        product = { ...product, amount: cartItem.amount }
        this.cartProducts.push(product);
      });
      this.calculateTotal();
    });
    
  }
  
  calculateTotal() {
    this.totalPrice = this.cartProducts.reduce((total: any, item: any) => {
      return total + (item.amount * item.price)
    }, 0)
  }
  refreshCart() {
    this.cartProducts = [];
    let cartItems = this.cartService.getItems();
    cartItems.forEach((cartItem: CartItem) => {
      let product: any = this.products.find((product) => product.id == cartItem.product_id);
      product = { ...product, amount: cartItem.amount }
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
  //TODO: deleteItemCart
}
