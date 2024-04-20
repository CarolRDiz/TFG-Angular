import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/core/modals/login';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppValidator } from 'src/app/models/custom-validator';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {

  @Output() closeEvent = new EventEmitter();
  //@Output() submitEvent = new EventEmitter();

  loginError: string = "";

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, AppValidator.emailValidator()]),
    password: new FormControl("", [Validators.required])
  });

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService
  ) { 

  }

  ngOnInit(): void {
  }

  close(): void {
    this.closeEvent.emit();
  }

  login(){
    let formData: Login = {
      "email": this.loginForm.value.email??'',
      "password": this.loginForm.value.password??''
    }
    this.authService.login(formData).subscribe({
      next: (data) => {
        this.authService.setToken(data);
      },
      error: (errorData) => {
        console.log(errorData);
        this.loginError = errorData;

      },
      complete: () => {
        console.info("Login completado");
      }
    })
    /*
    this.authService.login(formData).subscribe(response => {
      console.log(response);
      if(response){
        this.authService.setToken(response);
      }
      else {
        this.loginError = true;
      }
    }
    )*/
  }

  // submit(): void {
  //   this.elementRef.nativeElement.remove();
  //   this.submitEvent.emit();
  // }


}
