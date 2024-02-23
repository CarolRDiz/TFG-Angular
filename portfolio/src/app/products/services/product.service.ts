import axios from 'axios';
import { Injectable } from '@angular/core';
import { ProductCreate } from '../product-create';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/products/';
  constructor() { }

  postProduct(newproduct: ProductCreate) {
    const formData = new FormData();
    if (newproduct.name) formData.append("name", newproduct.name);
    if (newproduct.description) formData.append("description", newproduct.description);
    if (newproduct.category_ids) formData.append("category_ids", newproduct.category_ids.toString());
    formData.append("visibility", newproduct.visibility.toString());
    // if(newproduct.image) formData.append("image", newproduct.image);
    formData.append("thumbnail_index", newproduct.thumbnail_index.toString());
    if (newproduct.visibility) formData.append("visibility", newproduct.visibility.toString());
    let images = newproduct.images;
    for (let i = 0; i < images.length; i++) {
      let file = images[i];
      formData.append("images",file);
    }
    let tags: string[] = newproduct.tags;
    for (let i = 0; i < tags.length; i++) {
      formData.append("tags",tags[i]);
    }
    console.log(formData)
    return axios.post(this.baseUrl,
      formData
    )
  }

  // getAllIllustrations(): Illustration[] {
  //   return axios.get('http://localhost:8080/illustrations/', 
  //   )
  // }
  getAllProducts() {
    return axios.get('http://localhost:8080/products/')
  }
  // getIllustrationById(id: Number) {
  //   return this.http.get<Illustration>(`${this.baseUrl}${id}/`);
  //   // return axios.get(`http://localhost:8080/illustrations/${id}/`, )
  // }

  // getIllustrationsPublic(){
  //   const url = `${this.baseUrl}public/`;
  //   return axios.get(url);
  // }

  // deleteIllustrationImage(id: number){
  //   const url = `${this.baseUrl}delete/image/${id}/`;
  //   const body = {};
  //   this.http.patch<any>(url, body).subscribe((data) => {
  //     console.log("patch request: ", data);
  //   });
  // }
  // updateIllustrationImage(id: number, image: File){
  //   const url = `${this.baseUrl}image/${id}/`;
  //   const formData = new FormData();
  //   formData.append("image", image);
  //   this.http.patch<any>(url, formData).subscribe((data) => {
  //     console.log("patch request: ", data);
  //   });
  //   // return axios.patch(url, 
  //   //   formData
  //   // )
  // }
  // updateIllustration(id: number, illustration: IllustrationEdit) {
  //   const url = `${this.baseUrl}${id}/`;
  //   // this.http.patch<any>(url, illustration).subscribe((data) => {
  //   //   console.log("patch request: ", data);
  //   // });
  //   return axios.patch(url, 
  //     illustration
  //   )
  // }
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
