import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AdminPageContainerComponent } from './components/admin-page-container/admin-page-container.component';
import { ModalService } from './services/modal.service';
import { ModalComponent } from './components/modal/modal.component';
import { PublicPageContainerComponent } from './components/public-page-container/public-page-container.component';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { InputComponent } from './components/form-components/input/input.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SelectedImageComponent } from './components/selected-image/selected-image.component';
import { DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";
import { SelectComponent } from './components/select/select.component';
import { ToggleInputComponent } from './components/form-components/toggle-input/toggle-input.component';
import { PriceInputComponent } from './components/form-components/price-input/price-input.component';
import { TagsInputComponent } from './components/form-components/tags-input/tags-input.component';
import { CategoriesInputComponent } from './components/form-components/categories-input/categories-input.component';
import { HeaderMobileComponent } from './components/header-mobile/header-mobile.component';
import { NavigationMobileComponent } from './components/navigation-mobile/navigation-mobile.component';
import { NavigationMobileBottomComponent } from './components/navigation-mobile-bottom/navigation-mobile-bottom.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminHeaderMobileComponent } from './components/admin-header-mobile/admin-header-mobile.component';
import { AdminNavigationMobileComponent } from './components/admin-navigation-mobile/admin-navigation-mobile.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';

@NgModule({
  declarations: [
    AddImageComponent,
    AdminHeaderComponent,
    AdminPageContainerComponent,
    HeaderComponent,
    LoaderComponent,
    LoginModalComponent,
    LightboxComponent,
    SearchBarComponent,
    AdminPageContainerComponent,
    ModalComponent,
    PublicPageContainerComponent,
    PriceInputComponent,
    InputComponent,
    LoginModalComponent,
    SelectedImageComponent,
    SelectComponent,
    ToggleInputComponent,
    TagsInputComponent,
    CategoriesInputComponent,
    HeaderMobileComponent,
    NavigationMobileComponent,
    NavigationMobileBottomComponent,
    CartComponent,
    AdminHeaderMobileComponent,
    AdminNavigationMobileComponent,
    DialogComponent,
    ClickStopPropagationDirective
  ],
  imports: [
    RouterModule,
    CommonModule,
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
    DragDropModule,
    MatRadioModule,
    NgxMaskDirective,
    NgxMaskPipe,
    
  ],
  exports: [
    PriceInputComponent,
    AddImageComponent,
    AdminHeaderComponent,
    AdminPageContainerComponent, 
    CommonModule, 
    BrowserModule,
    BrowserAnimationsModule, 
    CategoriesInputComponent,
    DialogComponent,
    HeaderComponent, 
    HeaderMobileComponent, 
    HttpClientModule, 
    InputComponent,
    LoaderComponent,
    LoginModalComponent,
    LightboxComponent,
    SearchBarComponent,
    ModalComponent,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    DragDropModule,
    PublicPageContainerComponent,
    RouterModule,
    MatRadioModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SelectedImageComponent,
    SelectComponent,
    ToggleInputComponent,
    TagsInputComponent,
    NavigationMobileComponent,
    CartComponent,
    ClickStopPropagationDirective
  ],
  providers: [
    ModalService,
    provideNgxMask(),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "short" }
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ]
})
export class SharedModule { }
