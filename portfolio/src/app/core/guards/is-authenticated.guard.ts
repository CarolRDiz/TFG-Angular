import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const isAuthenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // const isAuthorized = this.userService.currentUser.admin.includes(route.data.role);
  const isAuthorized = authService.currentUserLoginOn.value;

  if (!isAuthorized) {
    // redirect
    router.navigate(['/'])
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
    // display a message
    //window.alert('you are not authorized');
  }

  return isAuthorized || false;
};
