import { NgModule } from '@angular/core';
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
import { StoreCatalogComponent } from './components/store-catalog/store-catalog.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminOrderComponent } from './components/admin-order/admin-order.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

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
    StoreCatalogComponent,
    AdminOrdersComponent,
    AdminOrderComponent,
    OrderSummaryComponent,
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
