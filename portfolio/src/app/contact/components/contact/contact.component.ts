import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { AppValidator } from 'src/app/models/custom-validator';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  constructor(
    private contactService: ContactService
  ) { }

  contactForm = new FormGroup({
    email: new FormControl("", [Validators.required, AppValidator.emailValidator()]),
    name: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

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
      },
      error: (errorData) => {
        console.log(errorData);

      },
      complete: () => {
        console.info("Enviado");
      }
    }

    )
  }
}
