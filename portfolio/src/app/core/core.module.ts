import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './services/jwt-interceptor-service.service';
import { ErrorInterceptorService } from './services/error-interceptor-service.service';
@NgModule({
  providers:[
    AuthService,
    { provide:HTTP_INTERCEPTORS, useClass:JwtInterceptorService, multi: true },
    { provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptorService, multi: true }
  ],
})
export class CoreModule { }
