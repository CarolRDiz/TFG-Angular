import { Component, ElementRef, ViewChild } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  @ViewChild('paymentRef', {static: true}) paymentRef!: ElementRef;

  amount= 17;

  constructor(private router: Router, private payment: PaymentService){}

  ngOnInit(){
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
          return actions.order.capture().then((details: any)=>{
            if (details.status === 'COMPLETED') {
              this.payment.transactionID = details.id;
              //this.router.navigate(['confirm'])
            }
          })
        },
        onError: (error: any) => {
          console.log(error);
        }
      }
    ).render(this.paymentRef.nativeElement);
  }

}
