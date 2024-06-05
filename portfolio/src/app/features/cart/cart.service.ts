import { Injectable, Inject } from '@angular/core';
import { CartItem } from './cart-item';
import { ProductService } from '../admin-products/product.service';



@Injectable({
  providedIn: 'root'
})

export class CartService {

  items: CartItem[] = [];
  cartProducts: any[] = [];
  totalPrice: number;
  
  constructor(
    private productService: ProductService
  ) {}

  getTotalPrice() {
    console.log("----Cart: getTotalPrice()----")
    console.log(this.cartProducts)

    this.totalPrice = this.cartProducts.reduce((total: any, item: any) => {
      return total + (item.amount * item.price)
    }, 0)
    
    console.log(this.totalPrice)
    return this.totalPrice
  }

  saveCart(){
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  addToCart(product_id: number, amount: number){
    console.log("ADD TO CART: "+ product_id + amount)

    if(this.productInCart(product_id)) {
      console.log("ITEM ALREADY IN CART")
      let index = this.items.findIndex((item: CartItem) => item.product_id == product_id);
      if(!(this.items[index].amount+amount == 0)) {
        this.items[index].amount += amount;
      }
    } else {
      console.log("NEW ITEM")
      let item: CartItem = {product_id: product_id, amount: amount};
      this.items.push(item);
    }
    this.saveCart();
  }

  loadCart(){
    console.log("LOADING CART")
    this.items = JSON.parse(localStorage.getItem("cart") as any) || []
  }

  productInCart(product_id: number){
    return this.items.map((item: CartItem) => item.product_id).includes(product_id);
  }

  removeItem(product_id: number){
    console.log("Remove")
    this.items = this.items.filter(item => item.product_id != product_id);
    this.saveCart();
  }

  clearCart(){
    this.items = [];
    this.saveCart();
  }

  getItems(){
    return this.items;
  }
  getNumberCart(){
    return this.items.length;
  }
}
