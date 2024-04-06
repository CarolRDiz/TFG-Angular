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

const routes: Routes = [
  {
    path: '',
    component: PublicPageContainerComponent,
    children: [
      {
        path: '', component: IllustrationComponent
      },
      {
        path: 'store', component: StoreComponent
      },
      {
        path: 'product/:id', component: ProductComponent
      },
      {
        path: 'cart', component: CartComponent
      },
      {
        path: 'checkout', component: CheckoutComponent
      },
      {
        path: 'confirmation', component: ConfirmationComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminPageContainerComponent,
    children: [
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
