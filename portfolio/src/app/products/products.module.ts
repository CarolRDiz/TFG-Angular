import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './components/store/store.component';
import { AdminCreateProductComponent } from './components/admin-create-product/admin-create-product.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from './services/product.service';
import { CategoriesModalComponent } from './components/categories-modal/categories-modal.component';
import { AdminEditProductComponent } from './components/admin-edit-product/admin-edit-product.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { CartService } from './services/cart.service';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    StoreComponent,
    AdminCreateProductComponent,
    AdminProductsComponent,
    CategoriesModalComponent,
    AdminEditProductComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    ConfirmationComponent,
    UserComponent,
  ],
  exports: [
    StoreComponent,
    AdminCreateProductComponent,
    AdminProductsComponent,
    CategoriesModalComponent,
  ],
  imports: [
    SharedModule,
    
  ],
  providers: [
    ProductService,
    CartService
  ]
})
export class ProductsModule { }
