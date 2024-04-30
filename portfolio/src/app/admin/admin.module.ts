import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AdminLoginComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AdminModule { }
