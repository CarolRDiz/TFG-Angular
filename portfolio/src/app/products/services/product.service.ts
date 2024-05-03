import axios from 'axios';
import { Injectable } from '@angular/core';
import { ProductCreate } from '../product-create';
import { Product } from '../product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductEdit } from '../product-edit';
import { catchError, throwError as ObservableThrowError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/products/';
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
      catchError(this.errorHandler)
    );
  }


  // getAllIllustrations(): Illustration[] {
  //   return axios.get('http://localhost:8080/illustrations/', 
  //   )
  // }
  getAllProducts() {
    //return axios.get('http://localhost:8080/products/')
    return this.http
    .get<Product[]>(`${this.baseUrl}`)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  getFilterProducts(category: String) {
    //return axios.get('http://localhost:8080/products/')
    return this.http
    .get<Product[]>(`${this.baseUrl}filter?category=${category}`)
    .pipe(
      catchError(this.errorHandler)
    );
  }



  errorHandler(error: HttpErrorResponse){
    if(error.status===0){
      console.error("Error: "+error.error);
    } else {
      console.error("Respuesta: "+ error.status + ' '+error.error )
    }
    return throwError(()=>new Error('Algo ha fallado'))
  
  }

  getProductById(id: Number) {
    return this.http.get<Product>(`${this.baseUrl}${id}/`);
    // return axios.get(`http://localhost:8080/illustrations/${id}/`, )
  }

  getListProducts(ids: number[]){
    return this.http.get<Product[]>(`${this.baseUrl}list?ids=${ids}`);
  }
  // getIllustrationsPublic(){
  //   const url = `${this.baseUrl}public/`;
  //   return axios.get(url);
  // }

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
    return this.http.patch<any>(url, formData);
  }
  updateProduct(id: number, product: ProductEdit) {
    const url = `${this.baseUrl}${id}/`;
    return this.http.patch<any>(url, product);
  }


  // deleteIllustration(id: number) {
  //   const url = `${this.baseUrl}${id}/`;
  //   // this.http.patch<any>(url, illustration).subscribe((data) => {
  //   //   console.log("patch request: ", data);
  //   // });
  //   return axios.delete(url)
  // }
  // deleteIllustrationList(idList: Number[]) {
  //   const url = `${this.baseUrl}?ids=${idList}`;

  //   // this.http.patch<any>(url, illustration).subscribe((data) => {
  //   //   console.log("patch request: ", data);
  //   // });
  //   return axios.delete(url)
  // }
}
