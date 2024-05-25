import { Component } from '@angular/core';
import { LazyImgDirective } from '../../../shared/directives/lazy-img.directive';

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.scss'],
    standalone: true,
    imports: [LazyImgDirective]
})
export class AboutMeComponent {
  
}
