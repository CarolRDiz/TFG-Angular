import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/core/modals/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  errorMessage: string = "";
  user?: User

  constructor(private userService: UsersService) { }

  getUser() {
    this.userService.getUser(environment.userId).subscribe({
      next: (userData) => {
        this.user = userData
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        console.info("User Data Ok")
      }
    });
  }
}
