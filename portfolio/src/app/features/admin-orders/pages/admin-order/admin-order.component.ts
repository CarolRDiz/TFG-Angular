import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf, DatePipe } from '@angular/common';
import { Order } from 'src/app/features/checkout/order';
import { OrderSummaryComponent } from 'src/app/features/checkout/components/order-summary/order-summary.component';
import { OrderService } from 'src/app/features/checkout/orders.service';

@Component({
    selector: 'app-admin-order',
    templateUrl: './admin-order.component.html',
    styleUrls: ['./admin-order.component.scss'],
    standalone: true,
    imports: [NgIf, OrderSummaryComponent, DatePipe]
})
export class AdminOrderComponent {
  id: number;
  loading: boolean = false;
  order: Order;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.getOrder();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  getOrder() {
    this.loading = true;
    this.orderService.getOrder(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.order = data
      },
      error: (errorData) => {

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
          this.openSnackBar("Ha ocurrido un error")
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
