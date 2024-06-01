import { Component } from '@angular/core';
import { IllustrationService } from '../../services/illustration.service';
import { Illustration } from '../../illustration';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
    selector: 'app-illustration',
    templateUrl: './illustration.component.html',
    styleUrls: ['./illustration.component.scss'],
    standalone: true,
    imports: [GalleryComponent]
})
export class IllustrationComponent {
  illustrationList: Illustration[];
  // constructor(
  //   private illustrationService: IllustrationService
  // ) {}
  // ngOnInit(): void {
  //   this.getPublicIllustrations();
  // }
  // async getPublicIllustrations(){
  //   var success: boolean = false;
  //   await this.illustrationService.getIllustrationsPublic()
  //     .then(({ status, data }) => {
  //       console.log(status);
  //       console.log(data);
  //       this.illustrationList = data;
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
    
  // }
}
