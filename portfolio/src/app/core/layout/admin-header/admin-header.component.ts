import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LazyImgDirective } from 'src/app/shared/directives/lazy-img.directive';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.scss'],
    standalone: true,
    imports: [RouterLink, LazyImgDirective]
})
export class AdminHeaderComponent {
  constructor(
    private authService: AuthService,
    
    private router: Router
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/'])
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
  }
}
