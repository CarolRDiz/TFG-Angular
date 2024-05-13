import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../category';
import { CategoryCreate } from '../category-create';
import { environment } from 'src/app/environments/environment';
import { catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.urlApi+'categories/';
  
  getAllCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}`)
    .pipe(
      catchError(this.handlerError)
    );
  }
  postCategory(newCategory: CategoryCreate) {
    return this.http.post<Category>(this.baseUrl, { name: newCategory.name })
    .pipe(
      catchError(this.handlerError)
    );
  }
  delete(id: number){
    let url = `${this.baseUrl}${id}/`
    return this.http.delete<any>(url)
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
