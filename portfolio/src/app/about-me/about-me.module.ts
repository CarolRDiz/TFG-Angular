import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMeComponent } from './components/about-me/about-me.component';



@NgModule({
  declarations: [
    AboutMeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AboutMeComponent]
})
export class AboutMeModule { }
