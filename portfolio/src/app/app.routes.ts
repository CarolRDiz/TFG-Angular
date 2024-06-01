import { Routes } from "@angular/router";
import { PublicPageContainerComponent } from "./core/layout/public-page-container/public-page-container.component";
import { isAuthenticatedGuard } from './core/auth/guards/is-authenticated.guard';
import { isAdminGuard } from './core/auth/guards/is-admin.guard';

export const routes: Routes = [
    {
        path: '',
        component: PublicPageContainerComponent,
        children: [

            {
                path: '',
                loadComponent: () => import("./features/illustrations/components/illustration/illustration.component")
                    .then(mod => mod.IllustrationComponent),
            },
            {
                path: 'store',
                loadChildren: () => import("./features/products/products.routes"),
            },
            // {
            //     path: 'cart',
            //     loadComponent: () => import("./shared/components/cart/cart.component")
            //         .then(mod => mod.CartComponent),
            //     component: CartComponent
            // },
            {
                path: 'checkout', 
                loadChildren: () => import("./features/checkout/checkout.routes"),
            },
            {
                path: 'user', 
                loadComponent: () => import("./features/user/pages/user/user.component")
                    .then(mod => mod.UserComponent),
                canActivate: [isAuthenticatedGuard],
            },
            {
                path: 'contact',
                loadComponent: () => import("./features/contact/pages/contact-page/contact.component")
                    .then(mod => mod.ContactComponent)
            },
            {
                path: 'about-me',
                loadComponent: () => import("./features/about-me/about-me.component")
                    .then(mod => mod.AboutMeComponent)
            },
            // {
            //     path: 'order', component: ConfirmationComponent
            // }
        ]
    },
    {
        path: 'admin-login',
        loadComponent: () => import("./core/auth/pages/admin-login/admin-login.component")
                    .then(mod => mod.AdminLoginComponent)
    },
    {
        path: 'login',
        loadComponent: () => import("./core/auth/pages/login/login-page.component")
                    .then(mod => mod.LoginPageComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import("./core/layout/admin-page-container/admin-page-container.component")
                    .then(mod => mod.AdminPageContainerComponent
                    ),
        canActivate: [isAdminGuard],
        children: [
            // {
            //   path: '',
            //   component: AdminLoginComponent
            // },
            {
                path: 'illustration',
                loadChildren: () => import("./features/admin-illustrations/admin-illustration.routes"),
            },
            {
                path: 'products',
                loadChildren: () => import("./features/admin-products/admin-products.routes"),
            },
            {
                path: 'orders',
                loadChildren: () => import("./features/admin-orders/admin-orders.routes"),
            },
        ]
    },
    {
        path: '**', pathMatch: 'full',
        loadComponent: () => import("./core/page-404/pages/page-404/page-not-found.component")
                    .then(mod => mod.PageNotFoundComponent
                    )
    },
];