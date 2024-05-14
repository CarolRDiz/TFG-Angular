import { NgModule } from '@angular/core';
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
