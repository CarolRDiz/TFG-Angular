import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  transactionID = "";
  constructor(private router: Router, private payment: PaymentService){}

  ngOnInit(){
    this.transactionID = this.payment.transactionID;
  }

}
