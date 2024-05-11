import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderCreate } from '../order-create';
import { Order } from '../order';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  transactionID: any;
  totalAmount: number = 10;
  delivery: number = 4;
  private order: Order;
  private baseUrl = environment.urlApi+'order';

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
