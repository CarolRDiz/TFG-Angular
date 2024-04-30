import { NgModule } from '@angular/core';
import { IllustrationComponent } from './components/illustration/illustration.component';
import { IllustrationService } from './services/illustration.service';
import { AdminCreateIllustrationComponent } from './components/admin-create-illustration/admin-create-illustration.component';
import { AdminEditIllustrationComponent } from './components/admin-edit-illustration/admin-edit-illustration.component';
import { AdminIllustrationComponent } from './components/admin-illustration/admin-illustration.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SortGalleryComponent } from './components/sort-gallery/sort-gallery.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [  
    AdminCreateIllustrationComponent,
    AdminEditIllustrationComponent,
    AdminIllustrationComponent,
    GalleryComponent,
    IllustrationComponent,
    SortGalleryComponent
  ],
  exports:[
    AdminCreateIllustrationComponent,
    AdminEditIllustrationComponent,
    AdminIllustrationComponent,
    GalleryComponent,
    IllustrationComponent,
    SortGalleryComponent
  ],
  providers: [
    IllustrationService
  ]
})
export class IllustrationsModule { }
