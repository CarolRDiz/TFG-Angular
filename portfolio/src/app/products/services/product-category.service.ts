import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseUrl = environment.urlApi+'productCategories/';


  constructor(private http: HttpClient) {}

  create(p_id: Number, c_ids: Number[]){
    let url = `${this.baseUrl}${p_id}?category_ids=${c_ids}`;
    return this.http.post<any>(url,{});
  }
  delete(p_id: Number, c_ids: Number[]){
    let url = `${this.baseUrl}${p_id}?category_ids=${c_ids}`;
    return this.http.delete<any>(url,{});
  }
}
