import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { Order } from '../../order';
import { OrderService } from '../../services/orders.service';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss'],
    standalone: true,
    imports: [OrderSummaryComponent]
})
export class ConfirmationComponent {

  transactionID = "";
  order: Order;

  // order: Order = {
  //   "id": 1,
  //   "items": [
  //     // {
  //     //   "id": 1,
  //     //   "product": {
  //     //     "id": 1,
  //     //     "name": "sefe w fsaf d",
  //     //     //"date": "2024-04-28T17:21:44.238+00:00",
  //     //     "price": 2.0,
  //     //     "image_ids": [
  //     //       "662e85a2262e7c2f0373453c",
  //     //       "662e85a3262e7c2f0373453d"
  //     //     ],
  //     //     "thumbnail_image_id": "662e85a2262e7c2f0373453c",
  //     //     "description": "desc",
  //     //     "tags": [],
  //     //     //"sellCount": 26,
  //     //     "visibility": true
  //     //   },
  //     //   "amount": 2
  //     // }
  //   ],
  //   "email": "a@gmail.com",
  //   "firstName": "Nombre",
  //   "lastName": "last_name",
  //   "address": "address",
  //   "secondAddress": "address2",
  //   "city": "address2",
  //   "postalCode": "address2",
  //   "phone": "address2",
  //   "shipped": 1,
  //   "totalPrice": 23,
  //   "date": "2024-04-28T17:21:44.238+00:00"
  // }

  constructor(
    private router: Router, 
    private payment: PaymentService,
    private orderService: OrderService
  ){}


  ngOnInit(){
    this.transactionID = this.payment.transactionID;
    let order = this.payment.getOrder();
    this.orderService.getOrder(order.id).subscribe({
      next: (data) => {
        this.order = data;
      },
      error: (errorData)=> {
        console.log("No existe este pedido")
      }
    })
  }

}
