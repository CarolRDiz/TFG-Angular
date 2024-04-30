import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from '../services/users.service';

export const isAdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UsersService);
  const router = inject(Router);

  // const isAuthorized = this.userService.currentUser.admin.includes(route.data.role);
  const isAuthorized = userService.checkAdmin();

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
