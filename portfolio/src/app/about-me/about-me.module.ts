import { NgModule } from '@angular/core';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AboutMeComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [AboutMeComponent]
})
export class AboutMeModule { }
