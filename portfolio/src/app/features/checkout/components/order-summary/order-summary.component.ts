import { Component, Input } from '@angular/core';
import { Order } from '../../order';
import { environment } from 'src/app/environments/environment';
import { LazyImgDirective } from '../../../../shared/directives/lazy-img.directive';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.scss'],
    standalone: true,
    imports: [NgFor, LazyImgDirective]
})
export class OrderSummaryComponent {
  @Input() order: Order;
  imageUrl = environment.urlApiImage;
  
}
