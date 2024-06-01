import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

import { inject } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token:String=this.authService.userToken;
    if (token!=""){
      req=req.clone(
        {
          setHeaders: {
            // 'Content-Type': 'application/json; charset=utf-8',
            // 'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    }
    return next.handle(req);
  }
}


// export const jwtInterceptorService: HttpInterceptorFn = (req, next) => {
//   let token:String= this.authService.userToken;
//   if (token!=""){
//     req=req.clone(
//       {
//         setHeaders: {
//           // 'Content-Type': 'application/json; charset=utf-8',
//           // 'Accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       }
//     );
//   }
//   return next.handle(req);
// };