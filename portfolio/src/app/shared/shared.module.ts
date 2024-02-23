import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ModalModule } from './components/modal/modal.module';
import { LoaderComponent } from './components/loader/loader.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {DragDropModule} from '@angular/cdk/drag-drop'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AdminPageContainerComponent } from './components/admin-page-container/admin-page-container.component';

@NgModule({
  declarations: [
    AddImageComponent,
    AdminHeaderComponent,
    AdminPageContainerComponent,
    CategoryDialogComponent,
    HeaderComponent,
    LoaderComponent,
    LightboxComponent,
    SearchBarComponent,
    AdminPageContainerComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    DragDropModule
  ],
  exports: [
    AddImageComponent,
    AdminHeaderComponent,
    AdminPageContainerComponent,
    CategoryDialogComponent,
    HeaderComponent,
    LoaderComponent,
    LightboxComponent,
    SearchBarComponent,
    CommonModule,
    ModalModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    DragDropModule
  ]
})
export class SharedModule { }
