import { NgModule } from '@angular/core';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
    imports: [
        SharedModule,
        AboutMeComponent
    ],
    exports: [AboutMeComponent]
})
export class AboutMeModule { }
