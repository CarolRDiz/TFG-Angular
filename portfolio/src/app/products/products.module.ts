import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './components/store/store.component';
import { AdminCreateProductComponent } from './components/admin-create-product/admin-create-product.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { SharedModule } from '../shared/shared.module';
import { ProductService } from './services/product.service';
import { CategoriesModalComponent } from './components/categories-modal/categories-modal.component';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [
    StoreComponent,
    AdminCreateProductComponent,
    AdminProductsComponent,
    CategoriesModalComponent,
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
    ModalService
  ]
})
export class ProductsModule { }
