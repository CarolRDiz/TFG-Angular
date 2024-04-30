import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IllustrationComponent } from './illustrations/components/illustration/illustration.component';
import { StoreComponent } from './products/components/store/store.component';
// import { PublicComponent } from './views/public/public/public.component';
import { AdminViewComponent } from './shared/components/views/admin-view/admin-view.component';
import { AdminIllustrationComponent } from './illustrations/components/admin-illustration/admin-illustration.component';
import { AdminCreateIllustrationComponent } from './illustrations/components/admin-create-illustration/admin-create-illustration.component';
import { AdminEditIllustrationComponent } from './illustrations/components/admin-edit-illustration/admin-edit-illustration.component';
import { AdminProductsComponent } from './products/components/admin-products/admin-products.component';
import { AdminCreateProductComponent } from './products/components/admin-create-product/admin-create-product.component';
import { PublicPageContainerComponent } from './shared/components/public-page-container/public-page-container.component';
import { AdminPageContainerComponent } from './shared/components/admin-page-container/admin-page-container.component';
import { AdminEditProductComponent } from './products/components/admin-edit-product/admin-edit-product.component';
import { ProductComponent } from './products/components/product/product.component';
import { CartComponent } from './products/components/cart/cart.component';
import { CheckoutComponent } from './products/components/checkout/checkout.component';
import { ConfirmationComponent } from './products/components/confirmation/confirmation.component';
import { UserComponent } from './products/components/user/user.component';
import { ContactComponent } from './contact/components/contact/contact.component';
import { AboutMeComponent } from './about-me/components/about-me/about-me.component';
import { StoreCatalogComponent } from './products/components/store-catalog/store-catalog.component';
import { AdminOrdersComponent } from './products/components/admin-orders/admin-orders.component';
import { AdminOrderComponent } from './products/components/admin-order/admin-order.component';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { isAdminGuard } from './core/guards/is-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: PublicPageContainerComponent,
    children: [
      {
        path: '', component: IllustrationComponent
      },
      {
        path: 'store', component: StoreComponent,
        children: [
          {
            path: '', component: StoreCatalogComponent
          },
          {
            path: ':id', component: ProductComponent
          },
        ]
      },
      
      {
        path: 'cart', component: CartComponent
      },
      {
        path: 'checkout', component: CheckoutComponent
      },
      {
        path: 'confirmation', component: ConfirmationComponent
      },
      {
        path: 'user', component: UserComponent
      },
      {
        path: 'contact', component: ContactComponent
      },
      {
        path: 'about-me', component: AboutMeComponent
      }
    ]
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
  },
  {
    path: 'admin',
    component: AdminPageContainerComponent,
    canActivate:[isAdminGuard],
    children: [
      // {
      //   path: '',
      //   component: AdminLoginComponent
      // },
      { 
        path: 'illustration',
        component: AdminIllustrationComponent
      },
      { 
        path: 'create-illustration',
        component: AdminCreateIllustrationComponent
      },
      { 
        path: 'edit-illustration/:id',
        component: AdminEditIllustrationComponent
      },
      { 
        path: 'products',
        component: AdminProductsComponent
      },
      {
        path: 'create-product',
        component: AdminCreateProductComponent
      },
      { 
        path: 'edit-product/:id',
        component: AdminEditProductComponent
      },
      {
        path: 'orders',
        component: AdminOrdersComponent
      },
      {
        path: 'order/:id',
        component: AdminOrderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
