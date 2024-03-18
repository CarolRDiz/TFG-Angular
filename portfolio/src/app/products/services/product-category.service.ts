import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseUrl = 'http://localhost:8080/productCategories/';


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
