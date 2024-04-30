import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/orders.service';
import { Order } from '../../order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  orderList: Order[] = [];
  orderListModified: Order[];
  idSort: Boolean = false;
  nameSort: Boolean = false;
  orderSelectedArray: number[] = [];
  currentDate = new Date();


  constructor(
    private orderService: OrderService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.getOrders();
    // this.orderService.getAllorders().subscribe((orders) => {
    //   this.orderList = orders;
    //   this.orderListModified = orders;
    // }
    // )
  }
  // SERVICES
  // orderService: orderService = inject(orderService);

  // METHODS
  getOrders() {
    this.orderService.getOrders().subscribe((data) => {
      this.orderList = data;
      this.orderListModified = data;

    })
    // this.orderService.getAllorders().subscribe((orders) => {
    //   this.orderList = orders;
    //   this.orderListModified = orders;
    // })
  }

  editar(id: Number) {
    this.router.navigate(['/', 'admin', 'edit-product', id])
  }

  sortById() {
    this.idSort = !this.idSort
    this.orderListModified.sort((a, b) => (a.id > b.id) ? 1 : -1)
    //this.orderListModified.sort((a, b) => (a.visibility == this.idSort) ? 1 : -1)
  }
  sortName() {
    this.nameSort = !this.nameSort
    if (this.nameSort) {
      //this.orderListModified.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }
    else {
      //this.orderListModified.sort((a, b) => (a.name < b.name) ? 1 : -1)
    }
  }
  search(value: any) {
    // let orderListWithName = this.orderList.map((order) => {
    //   if (!order.name) {
    //     order.name = '';
    //   }
    //   return order;
    // })
    // this.orderListModified = orderListWithName.filter((order) => order.name.includes(value));
  }
  async deleteOrder(id: any) {
    // let success;
    // await this.orderService.deleteorder(id)
    //   .then(({ status }) => {
    //     console.log(status);
    //     success = true;
    //   }
    //   );
    // if (success) {
    //   this.orderService.getAllorders().subscribe((orders) => {
    //     this.orderList = orders;
    //     this.orderListModified = orders;
    //   }
    //   )
    // }
  }
  async deleteOrderList() {
    // //TODO
    // // ARE YOU SURE
    // let success;
    // await this.orderService.deleteorderList(this.orderSelectedArray)
    //   .then(({ status }) => {
    //     console.log(status);
    //     success = true;
    //   }
    //   );
    // if (success) {
    //   this.orderService.getAllorders().subscribe((orders) => {
    //     this.orderList = orders;
    //     this.orderListModified = orders;
    //     this.orderSelectedArray = [];
    //   }
    //   )
    // }
  }

  //TODO
  //SELECTED order
  onOrderPressed($event: any) {
    let id: string = $event.source.value;
    if ($event.checked) {
      this.orderSelectedArray.push(parseInt(id));
    }
    else {
      this.orderSelectedArray = this.orderSelectedArray.filter((checkedId) => checkedId != parseInt(id))
    }
  }
  selectAllOrders() {
    this.orderSelectedArray = this.orderListModified.map((order) => order.id)
    console.log(this.orderListModified.map((order) => order.id.toString()))
    console.log(this.orderSelectedArray)
  }
  unselectAllOrders() {
    this.orderSelectedArray = [];
  }
  isOrderChecked(id: number) {
    return this.orderSelectedArray.includes(id);
  }
  updateSelectedOrders() {
    this.orderService.updateStatusOrderList(this.orderSelectedArray, 1).subscribe(
      {
        next: (data) => {
          console.log("Actualizando Orders");
        },
        error: (errorData) => {
          console.log(errorData);

        },
        complete: () => {
          console.info("Actualizado");
          this.getOrders();
        }
      }
    )

  }
  updateStatusOrder(id: number, status: number) {
    this.orderService.updateStatusOrder(id, status).subscribe(
      {
        next: (data) => {
          console.log("Actualizando Order: " + id);
        },
        error: (errorData) => {
          console.log(errorData);

        },
        complete: () => {
          console.info("Actualizado");
          this.getOrders();
        }
      }
    )
  }

  goToOrder(id: number) {
    this.router.navigate(['/', 'admin', 'order', id])
      .then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
  }
}
