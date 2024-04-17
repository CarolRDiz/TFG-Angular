import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../modals/login';
import { Registration } from '../modals/registration';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  signUp(formData: Registration){
    return this.http.post<any>(`${this.baseUrl}registration/`, formData);
  }
  login(formData: Login){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}token`, formData,  {responseType: 'text'});
  }

}
