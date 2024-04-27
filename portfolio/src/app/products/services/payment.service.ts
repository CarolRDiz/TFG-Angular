import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderCreate } from '../order-create';
import { Order } from '../order';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  transactionID: any;
  totalAmount: number = 10;
  delivery: number = 4;
  private order: Order;
  private baseUrl = 'http://localhost:8080/order';

  constructor(
    private http: HttpClient
  ) {}

  createOrder(order: OrderCreate){
    let body = {...order}
    return this.http.post<any>(`${this.baseUrl}`, body);
  }
  setOrder(order: Order){
    this.order = order;
  }
  getOrder(){
    return this.order;
  }
}
