import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderCreate } from '../order-create';
import { Order } from '../order';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.urlApi+'order/';

  constructor(
    private http: HttpClient
  ) {}

  getOrders(){
    return this.http.get<Order[]>(`${environment.urlApi}order/`);
  }
  getOrder(id: number){
    return this.http.get<Order>(`${environment.urlApi}order/${id}`);
  }
  updateStatusOrder(id: number, status: number){
    let body = {
      "shipped": status
    }
    return this.http.patch<void>(`${environment.urlApi}order/${id}`, body);
  }
  updateStatusOrderList(ids: number[], status: number){
    let body = {
      "shipped": status
    }
    return this.http.patch<void>(`${environment.urlApi}order/list?ids=${ids}`, body);
  }
}
