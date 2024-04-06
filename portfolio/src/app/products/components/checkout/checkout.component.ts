import { Component, ElementRef, ViewChild } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidator } from 'src/app/models/custom-validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  amount = 17;

  steps = 3;
  step = 1;

  constructor(private router: Router, private payment: PaymentService) { }

  //  FORM
  contact = new FormGroup({
    email: new FormControl("", [Validators.required, AppValidator.emailValidator()]),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
  });

  checkoutForm = new FormGroup({
    contact: this.contact,
    //SPAIN
    shipping_address: new FormGroup({
      //country: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      address2: new FormControl(''),
      city: new FormControl('', [Validators.required, AppValidator.cityValidator()]),
      postal_code: new FormControl('', [Validators.required, AppValidator.postalCodeValidator()]),
      phone: new FormControl('', [Validators.required, AppValidator.phoneValidator()])
    }),
    payment: new FormGroup({
      paypal_option: new FormControl(false),
      card: new FormGroup({
        first_name_card: new FormControl('', Validators.required),
        last_name_card: new FormControl('', Validators.required),
        card_number: new FormControl('', [Validators.required, AppValidator.luhnValidator()]),
        expiration_date: new FormControl(''),
        cvv_cvc: new FormControl('')
      }),
    })

  })

  ngOnInit() {
    //this.amount = this.payment.totalAmount;
    window.paypal.Buttons(
      {
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        },

        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount.toString(),
                  currency_code: 'EUR'
                }
              }
            ]
          })
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            if (details.status === 'COMPLETED') {
              this.payment.transactionID = details.id;
              this.router.navigate(['confirmation'])
            }
          })
        },
        onError: (error: any) => {
          console.log(error);
        }
      }
    ).render(this.paymentRef.nativeElement);
  }

  getPaypalOption(){
    return this.checkoutForm.value.payment?.paypal_option;
  }


  saveStep() {
    if (this.contact.valid) {
      console.log(this.checkoutForm.value);
      this.step += 1;
    } else {
      alert("FILL ALL FIELDS");
    }

  }
  editFormGroup(step: number) {
    this.step = step;
  }
  switchPaymentMethod(value: boolean){
    this.checkoutForm.patchValue({
      payment: {
        paypal_option: value
      }
    })
  }
}
