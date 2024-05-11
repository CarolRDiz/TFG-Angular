import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { AppValidator } from 'src/app/models/custom-validator';
import { ContactService } from '../../services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  contactForm: FormGroup;

  constructor(
    private contactService: ContactService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.contactForm = new FormGroup({
      email: new FormControl("", [Validators.required, AppValidator.emailValidator()]),
      name: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', { duration: 3000 });
  }

  send() {
    let formData = {
      access_key: environment.access_key_contact,
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    }
    this.contactService.sendEmail(formData).subscribe({
      next: (data) => {
        console.log(formData)
        console.log("Enviandose");
        this.contactForm.reset();
      },
      error: (errorData) => {
        console.log(errorData);

      },
      complete: () => {
        console.info("Enviado");

        this.openSnackBar("Correo enviado con éxito")
        this.createForm()
      }
    }

    )
  }
}
