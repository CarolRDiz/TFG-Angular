import axios from 'axios';
import { Injectable } from '@angular/core';
import { Illustration } from '../illustration';
import { IllustrationCreate } from '../illustration-create';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IllustrationEdit } from '../illustration-edit';

@Injectable({
  providedIn: 'root'
})
export class IllustrationService {
  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8080/illustrations/';

  postIllustration(newIllustration: IllustrationCreate) {
    const formData = new FormData();
    if(newIllustration.name) formData.append("name", newIllustration.name);
    if(newIllustration.description) formData.append("description", newIllustration.description);
    formData.append("visibility", newIllustration.visibility.toString());
    if(newIllustration.image) formData.append("image", newIllustration.image);
    if(newIllustration.visibility) formData.append("visibility", newIllustration.visibility.toString());
    console.log(formData)
    
    // return axios.post(this.baseUrl, 
    //   formData
    // )
    // let headers = new HttpHeaders().set('Content-Type', 'undefined');
    // return this.http
    // .post<any>(`${this.baseUrl}`, formData, {headers: headers})
    return this.http
    .post<any>(`${this.baseUrl}`, formData)
  }
  // getAllIllustrations(): Illustration[] {
  //   return axios.get('http://localhost:8080/illustrations/', 
  //   )
  // }
  getAllIllustrations() {
    return this.http.get<Illustration[]>(`${this.baseUrl}`);
    // return axios.get('http://localhost:8080/illustrations/')
  }
  getIllustrationById(id: Number) {
    return this.http.get<Illustration>(`${this.baseUrl}${id}/`);
    // return axios.get(`http://localhost:8080/illustrations/${id}/`, )
  }

  getIllustrationsPublic(){
    const url = `${this.baseUrl}public/`;
    return axios.get(url);
  }

  deleteIllustrationImage(id: number){
    const url = `${this.baseUrl}delete/image/${id}/`;
    const body = {};
    this.http.patch<any>(url, body).subscribe((data) => {
      console.log("patch request: ", data);
    });
  }
  updateIllustrationImage(id: number, image: File){
    const url = `${this.baseUrl}image/${id}/`;
    const formData = new FormData();
    formData.append("image", image);
    this.http.patch<any>(url, formData).subscribe((data) => {
      console.log("patch request: ", data);
    });
    // return axios.patch(url, 
    //   formData
    // )
  }
  updateIllustration(id: number, illustration: IllustrationEdit) {
    const url = `${this.baseUrl}${id}/`;
    // this.http.patch<any>(url, illustration).subscribe((data) => {
    //   console.log("patch request: ", data);
    // });
    return this.http.patch<any>(url, illustration)
  }
  deleteIllustration(id: number) {
    const url = `${this.baseUrl}${id}/`;
    // this.http.patch<any>(url, illustration).subscribe((data) => {
    //   console.log("patch request: ", data);
    // });
    return axios.delete(url)
  }
  deleteIllustrationList(idList: Number[]) {
    const url = `${this.baseUrl}?ids=${idList}`;

    // this.http.patch<any>(url, illustration).subscribe((data) => {
    //   console.log("patch request: ", data);
    // });
    return axios.delete(url)
  }
}
