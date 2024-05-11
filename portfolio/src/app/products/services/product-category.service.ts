import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseUrl = environment.urlApi+'productCategories/';


  constructor(private http: HttpClient) {}

  create(p_id: Number, c_ids: Number[]){
    let url = `${this.baseUrl}${p_id}?category_ids=${c_ids}`;
    return this.http.post<any>(url,{})
    .pipe(
      catchError(this.handlerError)
    );
  }
  delete(p_id: Number, c_ids: Number[]){
    let url = `${this.baseUrl}${p_id}?category_ids=${c_ids}`;
    return this.http.delete<any>(url,{})
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
