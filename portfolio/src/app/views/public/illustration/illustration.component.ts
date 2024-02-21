import { Component } from '@angular/core';
import { IllustrationService } from 'src/app/services/illustration.service';
import { Illustration } from 'src/app/illustration';

@Component({
  selector: 'app-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.scss']
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
