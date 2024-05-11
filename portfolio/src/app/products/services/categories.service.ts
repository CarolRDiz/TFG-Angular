import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../category';
import { CategoryCreate } from '../category-create';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.urlApi+'categories/';
  
  getAllCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }
  postCategory(newCategory: CategoryCreate) {
    return this.http.post<Category>(this.baseUrl, { name: newCategory.name })
  }
}
