import { Injectable } from '@angular/core';

interface Item {
  id: number,
  quantity: number
}

@Injectable({
  providedIn: 'root'
})

export class CartService {

  items: Item[] = [];

  constructor() { }

  saveCart(){
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  addToCart(id: number, quantity: number){
    if(this.productInCart(id)) {
      let index = this.items.findIndex((item: any) => item.id == id);
      if(!(this.items[index].quantity+quantity == 0)) {
        this.items[index].quantity += quantity;
      }
    } else {
      let item: Item = {id: id, quantity: quantity};
      this.items.push(item);
    }
    this.saveCart();
  }

  loadCart(){
    console.log("LOADING CART")
    this.items = JSON.parse(localStorage.getItem("cart") as any) || []
  }

  productInCart(id: number){
    return this.items.map(item => item.id).includes(id);
  }

  removeItem(id: number){
    this.items = this.items.filter(item => item.id != id);
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
