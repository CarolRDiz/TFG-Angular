import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IllustrationComponent } from './views/public/illustration/illustration.component';
import { StoreComponent } from './views/public/store/store.component';
import { PublicComponent } from './views/public/public/public.component';
import { AdminViewComponent } from './views/admin/admin-view/admin-view.component';
import { AdminIllustrationComponent } from './views/admin/illustration/admin-illustration/admin-illustration.component';
import { AdminCreateIllustrationComponent } from './views/admin/illustration/admin-create-illustration/admin-create-illustration.component';
import { AdminEditIllustrationComponent } from './views/admin/illustration/admin-edit-illustration/admin-edit-illustration.component';
import { AdminProductsComponent } from './views/admin/products/admin-products/admin-products.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
