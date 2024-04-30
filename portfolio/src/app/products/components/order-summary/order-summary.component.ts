import { Component, Input } from '@angular/core';
import { Order } from '../../order';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {
  @Input() order: Order;
  
}
