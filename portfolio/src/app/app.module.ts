import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GalleryComponent } from './components/gallery/gallery.component';
import { IllustrationComponent } from './views/public/illustration/illustration.component';
import { StoreComponent } from './views/public/store/store.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicComponent } from './views/public/public/public.component';
import { AdminViewComponent } from './views/admin/admin-view/admin-view.component';
import { AdminHeaderComponent } from './layout/admin-header/admin-header.component';
import { AdminIllustrationComponent } from './views/admin/illustration/admin-illustration/admin-illustration.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatButtonModule} from '@angular/material/button'; 

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AdminCreateIllustrationComponent } from './views/admin/illustration/admin-create-illustration/admin-create-illustration.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AddImageComponent } from './components/add-image/add-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GalleryComponent,
    IllustrationComponent,
    StoreComponent,
    LightboxComponent,
    PublicComponent,
    AdminViewComponent,
    AdminHeaderComponent,
    AdminIllustrationComponent,
    AdminCreateIllustrationComponent,
    SearchBarComponent,
    AddImageComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
