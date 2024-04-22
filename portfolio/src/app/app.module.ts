import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminViewComponent } from './shared/components/views/admin-view/admin-view.component';

import { CoreModule } from './core/core.module';
import { IllustrationsModule } from './illustrations/illustrations.module';
import { ProductsModule } from './products/products.module';
import { PublicViewComponent } from './shared/components/views/public-view/public-view.component';
import { ContactModule } from './contact/contact.module';
import { AboutMeModule } from './about-me/about-me.module';
@NgModule({
  declarations: [
    AppComponent,
    AdminViewComponent,
    PublicViewComponent,

  ],
  imports: [
    ProductsModule,
    IllustrationsModule,
    CoreModule,
    AppRoutingModule,
    CommonModule,
    ContactModule,
    AboutMeModule
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
