import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
        {
            path: '',
            loadComponent: () => import("./pages/admin-products/admin-products.component")
                    .then(mod => mod.AdminProductsComponent)
        },
        {
        path: 'create-product',
        loadComponent: () => import("./pages/admin-create-product/admin-create-product.component")
                    .then(mod => mod.AdminCreateProductComponent)
        },
        {
        path: 'edit-product/:id',
        loadComponent: () => import("./pages/admin-edit-product/admin-edit-product.component")
                    .then(mod => mod.AdminEditProductComponent)
        },
    ]
  },
];

export default routes;