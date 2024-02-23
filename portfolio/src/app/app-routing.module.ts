import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IllustrationComponent } from './illustrations/components/illustration/illustration.component';
import { StoreComponent } from './products/components/store/store.component';
// import { PublicComponent } from './views/public/public/public.component';
import { AdminViewComponent } from './views/admin/admin-view/admin-view.component';
import { AdminIllustrationComponent } from './illustrations/components/admin-illustration/admin-illustration.component';
import { AdminCreateIllustrationComponent } from './illustrations/components/admin-create-illustration/admin-create-illustration.component';
import { AdminEditIllustrationComponent } from './illustrations/components/admin-edit-illustration/admin-edit-illustration.component';
import { AdminProductsComponent } from './products/components/admin-products/admin-products.component';
import { AdminCreateProductComponent } from './products/components/admin-create-product/admin-create-product.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: PublicComponent,
  //   children: [
  //     {
  //       path: '', component: IllustrationComponent
  //     },
  //     {
  //       path: 'store', component: StoreComponent
  //     }
  //   ]
  // },
  {
    path: '',
    // component: PublicComponent,
    children: [
      {
        path: '', component: IllustrationComponent
      },
      {
        path: 'store', component: StoreComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminViewComponent,
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
