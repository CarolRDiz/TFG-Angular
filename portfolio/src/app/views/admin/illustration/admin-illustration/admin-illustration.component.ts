import { Component, inject} from '@angular/core';
import { Illustration } from 'src/app/illustration';
import { IllustrationService } from 'src/app/illustration.service';

@Component({
  selector: 'app-admin-illustration',
  templateUrl: './admin-illustration.component.html',
  styleUrls: ['./admin-illustration.component.scss']
})
export class AdminIllustrationComponent {
  illustrationList : Illustration[] = [];
  illustrationService : IllustrationService = inject(IllustrationService);

  constructor() { 
    this.illustrationList = this.illustrationService.getAllIllustrations();
  }
}
