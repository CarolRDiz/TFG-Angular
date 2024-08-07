import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/auth/models/login';
import { UsersService } from 'src/app/core/auth/services/users.service';
import { InputComponent } from 'src/app/shared/components/form-components/input/input.component';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputComponent]
})
export class AdminLoginComponent {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router
  ) { }

  loginError: string = "";

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  login() {
    let formData: Login = {
      "email": this.loginForm.value.email ?? '',
      "password": this.loginForm.value.password ?? ''
    }
    this.authService.login(formData).subscribe({
      next: (data) => {
      },
      error: (errorData) => {
        this.loginError = "La contraseña o el correo electrónico son incorrectos";
      },
      complete: () => {
        this.userService.getUser().subscribe({
          next: (data) => {
            this.userService.setUser(data);
          },
          error: (errorData) => {
          },
          complete: () => {
            this.router.navigate(['/', 'admin', 'illustration'])
              .then(nav => {
                console.log(nav); // true if navigation is successful
              }, err => {
                console.log(err) // when there's an error
              });
          }
        });
      }
    })
  }
}