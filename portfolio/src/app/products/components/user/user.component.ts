import { Component } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/core/modals/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidator } from 'src/app/models/custom-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  errorMessage: string = "";
  user: User;
  loading: boolean = false;
  settingsSection: boolean = false;
  ordersSection: boolean = false;
  //  FORM
  contact: FormGroup;
  shipping_address: FormGroup;
  userForm: FormGroup;

  constructor(private userService: UsersService, private router: Router,) { }

  ngOnInit() {
    this.initializeForm()
    this.getUser();
  }
  getUser() {
    this.loading = true;
    this.userService.getUser().subscribe({
      next: (userData) => {
        this.user = userData
        this.userForm.patchValue(
          {
            contact: {
              email: this.user.email,
              firstName: this.user.firstName,
              lastName: this.user.lastName,
            },
            shipping_address: {

              address: this.user.address,
              secondAddress: this.user.secondAddress,
              city: this.user.city,
              postalCode: this.user.postalCode,
              phone: this.user.phone
            },
            userForm: {
              contact: this.contact,
              //SPAIN
              shipping_address: this.shipping_address,
            }
          })

      },
      error: (errorData) => {
        this.errorMessage = errorData;
      },
      complete: () => {
        console.info("User Data Ok")
        this.loading = false;
      }
    });

  }

  updateUser() {
    this.loading = true;
    let userData: User = {
      "email": this.userForm.value.contact?.email ?? '',
      "firstName": this.userForm.value.contact?.firstName ?? '',
      "lastName": this.userForm.value.contact?.lastName ?? '',
      "address": this.userForm.value.shipping_address?.address ?? '',
      "secondAddress": this.userForm.value.shipping_address?.secondAddress ?? '',
      "city": this.userForm.value.shipping_address?.city ?? '',
      "postalCode": this.userForm.value.shipping_address?.postalCode ?? '',
      "phone": this.userForm.value.shipping_address?.phone ?? '',
    }
    this.userService.updateUser(userData).subscribe(
      {
        next: (user) => {
          this.user = user
        },
        error: (errorData) => {
          this.errorMessage = errorData;
        },
        complete: () => {
          console.info("User Data Ok")
          this.loading = false;
        }
      }
    )
  }

  initializeForm() {
    //  FORM
    this.contact = new FormGroup({
      email: new FormControl("", [Validators.required, AppValidator.emailValidator()]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });
    this.shipping_address = new FormGroup({
      //country: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      secondAddress: new FormControl(''),
      city: new FormControl('', [Validators.required, AppValidator.cityValidator()]),
      postalCode: new FormControl('', [Validators.required, AppValidator.postalCodeValidator()]),
      phone: new FormControl('', [Validators.required, AppValidator.phoneValidator()])
    });
    this.userForm = new FormGroup({
      contact: this.contact,
      //SPAIN
      shipping_address: this.shipping_address,
    })
  }
  settingsSectionOn() {
    this.settingsSection = true;
  }
  ordesSectionOn() {
    this.ordersSection = true;
  }
  back() {
    this.settingsSection = false;
    this.ordersSection = false;
  }
  backToStore() {
    this.router.navigate(['/','store'])
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
  }
}
