import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { AppValidator } from 'src/app/models/custom-validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../../contact.service';
import { InputComponent } from 'src/app/shared/components/form-components/input/input.component';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputComponent]
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
        this.contactForm.reset();
      },
      error: (errorData) => {
        this.openSnackBar("Ha ocurrido un error")
      },
      complete: () => {
        this.openSnackBar("Correo enviado con éxito")
        this.createForm()
      }
    }

    )
  }
}
