// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { AdminViewComponent } from './shared/components/views/admin-view/admin-view.component';
// import { ProductComponent } from './features/products/pages/product/product.component';
// import { CartComponent } from './shared/components/cart/cart.component';

// import { LoginPageComponent } from './core/auth/pages/login/login-page.component';
// import { PageNotFoundComponent } from './page-404/page-not-found.component';
// import { ContactComponent } from './features/contact/pages/contact-page/contact.component';
// import { AboutMeComponent } from './features/about-me/about-me.component';
// import { IllustrationComponent } from './features/illustrations/components/illustration/illustration.component';
// import { StoreComponent } from './features/products/pages/store/store.component';
// import { StoreCatalogComponent } from './features/products/pages/store-catalog/store-catalog.component';
// import { CheckoutComponent } from './features/checkout/pages/checkout/checkout.component';
// import { ConfirmationComponent } from './features/checkout/pages/confirmation/confirmation.component';
// import { UserComponent } from './features/user/pages/user/user.component';
// import { isAuthenticatedGuard } from './core/auth/guards/is-authenticated.guard';
// import { isAdminGuard } from './core/auth/guards/is-admin.guard';
// import { PublicPageContainerComponent } from './shared/components/public-page-container/public-page-container.component';
// import { AdminLoginComponent } from './core/auth/pages/admin-login/admin-login.component';
// import { AdminPageContainerComponent } from './core/layout/admin-page-container/admin-page-container.component';
// import { AdminIllustrationComponent } from './features/admin-illustrations/pages/admin-illustration/admin-illustration.component';
// import { AdminCreateIllustrationComponent } from './features/admin-illustrations/pages/admin-create-illustration/admin-create-illustration.component';
// import { AdminEditIllustrationComponent } from './features/admin-illustrations/pages/admin-edit-illustration/admin-edit-illustration.component';
// import { AdminProductsComponent } from './features/admin-products/pages/admin-products/admin-products.component';
// import { AdminCreateProductComponent } from './features/admin-products/pages/admin-create-product/admin-create-product.component';
// import { AdminEditProductComponent } from './features/admin-products/pages/admin-edit-product/admin-edit-product.component';
// import { AdminOrdersComponent } from './features/admin-orders/pages/admin-orders/admin-orders.component';
// import { AdminOrderComponent } from './features/admin-orders/pages/admin-order/admin-order.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: PublicPageContainerComponent,
//     children: [
      
//       {
//         path: '', component: IllustrationComponent
//       },
//       {
//         path: 'store', component: StoreComponent,
//         children: [
//           {
//             path: '', component: StoreCatalogComponent
//           },
//           {
//             path: ':id', component: ProductComponent
//           },
//         ]
//       },
//       {
//         path: 'cart', component: CartComponent
//       },
//       {
//         path: 'checkout', component: CheckoutComponent
//       },
//       {
//         path: 'confirmation', component: ConfirmationComponent
//       },
//       {
//         path: 'user', component: UserComponent,
//         canActivate: [isAuthenticatedGuard],
//       },
//       {
//         path: 'contact', component: ContactComponent
//       },
//       {
//         path: 'about-me', component: AboutMeComponent
//       },
//       {
//         path: 'order', component: ConfirmationComponent
//       }
//     ]
//   },
//   {
//     path: 'admin-login',
//     component: AdminLoginComponent
//   },
//   {
//     path: 'login',
//     component: LoginPageComponent,
//   },
//   {
//     path: 'admin',
//     component: AdminPageContainerComponent,
//     canActivate: [isAdminGuard],
//     children: [
//       // {
//       //   path: '',
//       //   component: AdminLoginComponent
//       // },
//       {
//         path: '',
//         component: AdminIllustrationComponent
//       },
      
//       {
//         path: 'products',
//         component: AdminProductsComponent
//       },
//       {
//         path: 'create-product',
//         component: AdminCreateProductComponent
//       },
//       {
//         path: 'edit-product/:id',
//         component: AdminEditProductComponent
//       },
//       {
//         path: 'orders',
//         component: AdminOrdersComponent
//       },
//       {
//         path: 'order/:id',
//         component: AdminOrderComponent
//       }
//     ]
//   },
//   {
//     path: '**', pathMatch: 'full',
//     component: PageNotFoundComponent
//   },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
