import { Injectable } from '@angular/core';
import { ProductCreate } from '../product-create';
import { Product } from '../product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductEdit } from '../product-edit';
import { catchError, throwError as ObservableThrowError, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.urlApi+'products/';
  constructor(
    private http: HttpClient
  ) { }

  postProduct(newproduct: ProductCreate) {
    const formData = new FormData();
    //DETAILS
    if (newproduct.name) formData.append("name", newproduct.name);
    if (newproduct.description) formData.append("description", newproduct.description);
    //ORGANIZATION
    formData.append("category_ids", newproduct.category_ids.toString());
    formData.append("visibility", newproduct.visibility.toString());
    let tags: string[] = newproduct.tags;
    for (let i = 0; i < tags.length; i++) {
      formData.append("tags", tags[i]);
    }
    //IMAGES
    formData.append("thumbnail_index", newproduct.thumbnail_index.toString());
    let images = newproduct.images;
    for (let i = 0; i < images.length; i++) {
      let file = images[i];
      formData.append("images", file);
    }
    //INVENTORY
    formData.append("price", newproduct.price)
    console.log(formData)

    return this.http
    .post<any>(`${this.baseUrl}`, formData)
    .pipe(
      catchError(this.handlerError)
    );
  }
  getAllProducts() {
    return this.http
    .get<Product[]>(`${this.baseUrl}`)
    .pipe(
      catchError(this.handlerError)
    );
  }
  getFilterProducts(category: String) {
    return this.http
    .get<Product[]>(`${this.baseUrl}filter?category=${category}`)
    .pipe(
      catchError(this.handlerError)
    );
  }

  getProductById(id: Number) {
    return this.http.get<Product>(`${this.baseUrl}${id}/`)
    .pipe(
      catchError(this.handlerError)
    );
  }

  getListProducts(ids: number[]){
    return this.http.get<Product[]>(`${this.baseUrl}list?ids=${ids}`)
    .pipe(
      catchError(this.handlerError)
    );
  }
  delete(id: Number){
    const url = `${this.baseUrl}${id}/`;
    return this.http.delete<any>(url)
    .pipe(
      catchError(this.handlerError)
    );
  }
  deleteList(ids: number[]){
    const url = `${this.baseUrl}?ids=${ids}`;
    return this.http.delete<any>(url)
    .pipe(
      catchError(this.handlerError)
    );
  }

  deleteProductImage(id: number, imageId: String) {
    const url = `${this.baseUrl}delete/image/${id}/${imageId}`;
    const body = {};
    this.http.patch<any>(url, body).subscribe((data) => {
      console.log("patch request: ", data);
    });
  }
  addProductImage(id: number, image: File) {
    const url = `${this.baseUrl}image/${id}/`;
    const formData = new FormData();
    formData.append("image", image);
    return this.http.patch<any>(url, formData)
    .pipe(
      catchError(this.handlerError)
    );
  }
  updateProduct(id: number, product: ProductEdit) {
    const url = `${this.baseUrl}${id}/`;
    return this.http.patch<any>(url, product)
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
