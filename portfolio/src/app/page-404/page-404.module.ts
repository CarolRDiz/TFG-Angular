import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [PageNotFoundComponent]
})
export class Page404Module { }
