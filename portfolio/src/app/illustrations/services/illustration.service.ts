import { Injectable } from '@angular/core';
import { Illustration } from '../illustration';
import { IllustrationCreate } from '../illustration-create';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IllustrationEdit } from '../illustration-edit';
import { environment } from 'src/app/environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IllustrationService {
  constructor(private http: HttpClient) { }
  private baseUrl = environment.urlApi+'illustrations/';

  postIllustration(newIllustration: IllustrationCreate) {
    const formData = new FormData();
    if(newIllustration.name) formData.append("name", newIllustration.name);
    if(newIllustration.description) formData.append("description", newIllustration.description);
    formData.append("visibility", newIllustration.visibility.toString());
    if(newIllustration.image) formData.append("image", newIllustration.image);
    if(newIllustration.visibility) formData.append("visibility", newIllustration.visibility.toString());
    console.log(formData)
    return this.http
    .post<any>(`${this.baseUrl}`, formData)
    .pipe(
      catchError(this.handlerError)
    );
  }
  getAllIllustrations() {
    return this.http.get<Illustration[]>(`${this.baseUrl}`)
    .pipe(
      catchError(this.handlerError)
    );;
  }
  getIllustrationById(id: Number) {
    return this.http.get<Illustration>(`${this.baseUrl}${id}/`)
    .pipe(
      catchError(this.handlerError)
    );;
  }

  getIllustrationsPublic(){
    const url = `${this.baseUrl}public/`;
    return this.http.get<Illustration[]>(url)
    .pipe(
      catchError(this.handlerError)
    );;
  }

  deleteIllustrationImage(id: number){
    const url = `${this.baseUrl}delete/image/${id}/`;
    const body = {};
    this.http.patch<any>(url, body).subscribe((data) => console.log("delete image"))
  }
  updateIllustrationImage(id: number, image: File){
    const url = `${this.baseUrl}image/${id}/`;
    const formData = new FormData();
    formData.append("image", image);
    this.http.patch<any>(url, formData).subscribe((data) => {
      console.log("update image")
    })
  }
  updateIllustration(id: number, illustration: IllustrationEdit) {
    const url = `${this.baseUrl}${id}/`;
    return this.http.patch<any>(url, illustration)
    .pipe(
      catchError(this.handlerError)
    );
  }
  deleteIllustration(id: number) {
    const url = `${this.baseUrl}${id}/`;
    return this.http.delete<any>(url)
    .pipe(
      catchError(this.handlerError)
    );
  }
  deleteIllustrationList(idList: Number[]) {
    const url = `${this.baseUrl}?ids=${idList}`;
    return this.http.delete<any>(url)
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
