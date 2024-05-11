import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Login } from '../modals/login';
import { Registration } from '../modals/registration';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../modals/user';
import { UsersService } from './users.service';
import { environment } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentToken: BehaviorSubject<String> = new BehaviorSubject<String>("")

  private baseUrl = environment.urlApi;

  constructor(
    private http: HttpClient,
    private userService: UsersService
  ) { 
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentToken = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
    
  }

  signUp(formData: Registration){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
    .post(`${this.baseUrl}registration/`, formData);
  }
  login(formData: Login): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
    .post(`${this.baseUrl}token`, formData,  {responseType: 'text'})
    .pipe(
      tap( (token: string) => {
        sessionStorage.setItem("token", token);
        this.currentToken.next(token)
        this.currentUserLoginOn.next(true)
      }),
      catchError(this.handlerError)
    );
  }

  logout(){
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
    this.userService.logout()
    
  }

  // setToken(token: string) {
  //   localStorage.setItem('token', token);
  // }
  // getToken() {
  //   return localStorage.getItem('token');
  // }
  
  get userToken():String{
    return this.currentToken.value;
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  private handlerError(error: HttpErrorResponse){
    if(error.status===0){
      console.error("Error: "+error.error);
    } else {
      console.error("Respuesta: "+ error.status + ' '+error.error )
    }
    return throwError(()=>new Error('La contraseña o el correo electrónico son incorrectos. Inténtalo de nuevo.'))
  }

}
