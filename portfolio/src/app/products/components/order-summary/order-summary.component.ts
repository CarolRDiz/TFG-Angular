import { Component, Input } from '@angular/core';
import { Order } from '../../order';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {
  @Input() order: Order;
  imageUrl = environment.urlApiImage;
  
}
