import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OrderCreate } from '../order-create';
import { Order } from '../order';
import { environment } from 'src/app/environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  transactionID: any;
  totalAmount: number = 10;
  delivery: number = 4;
  private order: Order;
  private baseUrl = environment.urlApi+'order/';

  constructor(
    private http: HttpClient
  ) {}

  createOrder(order: OrderCreate){
    let body = {...order}
    return this.http.post<any>(`${this.baseUrl}`, body)
    .pipe(
      catchError(this.handlerError)
    );
  }
  setOrder(order: Order){
    this.order = order;
  }
  getOrder(){
    return this.order;
  }
  private handlerError(error: HttpErrorResponse){
    if(error.status===0){
      console.error("Error: "+error.error);
    } else {
      console.error("Respuesta: "+ error.status + ' '+error.error )
    }
    return throwError(()=>new Error('Ha ocurrido un error'))
  }
}
