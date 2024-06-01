import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  sendEmail(formData: Object){
    return this.http
    .post<any>('https://api.web3forms.com/submit', formData)
  }
}
