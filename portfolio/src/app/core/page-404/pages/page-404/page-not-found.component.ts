import { Component } from '@angular/core';
import { LazyImgDirective } from 'src/app/shared/directives/lazy-img.directive';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
    standalone: true,
    imports: [LazyImgDirective]
})
export class PageNotFoundComponent {

}
