import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/app/core/modals/user';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  getUser(): Observable<User>{
    return this.http
    .get<User>(`${environment.urlApi}users/principal/`)
    .pipe(
      catchError(this.handlerError)
    );
  }
  
  updateUser(user: User): Observable<User>{
    return this.http
    .patch<User>(`${environment.urlApi}users/`, user)
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
    return throwError(()=>new Error('Algo ha fallado.'))
  }
}
