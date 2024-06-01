import { Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: '',
                loadComponent: () => import("./pages/checkout/checkout.component")
                    .then(mod => mod.CheckoutComponent),
            },
            {
                path: 'confirmation', 
                loadComponent: () => import("./pages/confirmation/confirmation.component")
                    .then(mod => mod.ConfirmationComponent),
            },
        ]
    },
];

export default routes;