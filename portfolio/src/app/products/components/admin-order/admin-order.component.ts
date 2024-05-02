import { Component } from '@angular/core';
import { Order } from '../../order';
import { OrderService } from '../../services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent {
  id: number;
  loading: boolean = false;
  order: Order;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.getOrder();
  }
  getOrder() {
    this.loading = true;
    this.orderService.getOrder(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.order = data
      },
      error: (errorData) => {
        console.log(errorData);

      },
      complete: () => {
        this.loading = false;
      }
    })
  }
  updateStatusOrder() {
    this.loading = true;
    let status;
    if (this.order.shipped == 0) status = 1
    else status = 0

    this.orderService.updateStatusOrder(this.id, status).subscribe(
      {
        next: (data) => {
          console.log("Actualizando Order: " + this.id);
        },
        error: (errorData) => {
          console.log(errorData);

        },
        complete: () => {
          console.info("Actualizado");
          this.getOrder();
          this.loading = false;
        }
      }
    )
  }
}