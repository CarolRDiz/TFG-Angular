import { Routes } from "@angular/router";
const routes: Routes = [
  {
    path: "",
    children: [
        {
            path: '',
            loadComponent: () => import("./pages/admin-orders/admin-orders.component")
                    .then(mod => mod.AdminOrdersComponent)
        },
        {
            path: ':id',
            loadComponent: () => import("./pages/admin-order/admin-order.component")
                    .then(mod => mod.AdminOrderComponent)
        }
    ]
  },
];

export default routes;