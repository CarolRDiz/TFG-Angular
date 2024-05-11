import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/modals/login';
import { Registration } from 'src/app/core/modals/registration';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppValidator } from 'src/app/models/custom-validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  @Output() closeEvent = new EventEmitter();
  //@Output() submitEvent = new EventEmitter();

  loginMode: boolean = true;

  loginError: string = "";

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, AppValidator.emailValidator()]),
    password: new FormControl("", [Validators.required])
  });

  registerForm = new FormGroup({
    email: new FormControl("", [Validators.required, AppValidator.emailValidator()]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.registerForm.controls.confirmPassword.addValidators(AppValidator.confirmPasswordValidator(this.registerForm.controls.password))
  }

  switchMode() {
    this.loginMode = !this.loginMode;
  }
  register() {

    let formData: Registration = {
      "email": this.registerForm.value.email ?? '',
      "password": this.registerForm.value.password ?? ''
    }
    this.authService.signUp(formData).subscribe({
      next: (data) => {
      },
      error: (errorData) => {
        this.loginError = "Este correo electrónico ya está en uso.";
      },
      complete: () => {
        this.loginMode = true;
        console.info("SignUp completado");
      }
    })
  }
  login() {
    let formData: Login = {
      "email": this.loginForm.value.email ?? '',
      "password": this.loginForm.value.password ?? ''
    }
    this.authService.login(formData).subscribe({
      next: (data) => {
        console.log("Logueado");
      },
      error: (errorData) => {
        this.loginError = "La contraseña o el correo electrónico son incorrectos";

      },
      complete: () => {
        console.info("Login completado");

        this.router.navigate(['/', 'user'])
          .then(nav => {
            console.log(nav); // true if navigation is successful
          }, err => {
            console.log(err) // when there's an error
          });
      }
    })
  }
}
