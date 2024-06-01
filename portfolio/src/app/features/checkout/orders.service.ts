import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { catchError, throwError } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.urlApi+'order/';

  constructor(
    private http: HttpClient
  ) {}

  getOrders(){
    return this.http.get<Order[]>(`${this.baseUrl}`)
    .pipe(
      catchError(this.handlerError)
    );
  }
  getOrder(id: number){
    return this.http.get<Order>(`${this.baseUrl}${id}`)
    .pipe(
      catchError(this.handlerError)
    );
  }
  updateStatusOrder(id: number, status: number){
    let body = {
      "shipped": status
    }
    return this.http.patch<void>(`${this.baseUrl}${id}`, body)
    .pipe(
      catchError(this.handlerError)
    );
  }
  updateStatusOrderList(ids: number[], status: number){
    let body = {
      "shipped": status
    }
    return this.http.patch<void>(`${this.baseUrl}list?ids=${ids}`, body)
    .pipe(
      catchError(this.handlerError)
    );
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
