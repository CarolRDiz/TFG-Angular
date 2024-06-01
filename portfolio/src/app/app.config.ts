import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideAnimations } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { EMPTY } from "rxjs";
import { JwtInterceptorService } from "./core/auth/services/jwt-interceptor-service.service";
import { ErrorInterceptorService } from "./core/auth/services/error-interceptor-service.service";
import { routes } from "./app.routes";
import { provideNgxMask } from "ngx-mask";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";

// export function initAuth(jwtService: JwtService, userService: UserService) {
//   return () => (jwtService.getToken() ? userService.getCurrentUser() : EMPTY);
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    { provide:HTTP_INTERCEPTORS, useClass:JwtInterceptorService, multi: true },
    { provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptorService, multi: true },
    provideNgxMask(),
    provideAnimations(),
    importProvidersFrom([
      MatSnackBarModule,
      MatDialogModule
    ])



    // provideHttpClient(
    //   withInterceptors([apiInterceptor, tokenInterceptor, errorInterceptor]),
    // ),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initAuth,
    //   deps: [JwtService, UserService],
    //   multi: true,
    // },
  ],
};