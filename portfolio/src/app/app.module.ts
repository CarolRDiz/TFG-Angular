import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminViewComponent } from './views/admin/admin-view/admin-view.component';

import { CoreModule } from './core/core.module';
import { IllustrationsModule } from './illustrations/illustrations.module';
import { ProductsModule } from './products/products.module';
@NgModule({
  declarations: [
    AppComponent,
    AdminViewComponent,

  ],
  imports: [
    ProductsModule,
    IllustrationsModule,
    CoreModule,
    AppRoutingModule,
    CommonModule,
    
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
