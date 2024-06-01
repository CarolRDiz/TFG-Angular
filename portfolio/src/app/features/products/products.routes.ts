import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/store/store.component")
    .then(mod => mod.StoreComponent),
    children: [
        {
            path: '',
            loadComponent: () => import("./pages/store-catalog/store-catalog.component")
                .then(mod => mod.StoreCatalogComponent),
        },
        {
            path: ':id',
            loadComponent: () => import("./pages/product/product.component")
                .then(mod => mod.ProductComponent),
        },
    ]
  },
];

export default routes;