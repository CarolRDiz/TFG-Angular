import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/categories/';
  
  getAllCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }
}
