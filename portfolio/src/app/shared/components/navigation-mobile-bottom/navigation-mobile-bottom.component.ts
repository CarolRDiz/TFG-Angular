import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LazyImgDirective } from '../../directives/lazy-img.directive';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navigation-mobile-bottom',
    templateUrl: './navigation-mobile-bottom.component.html',
    styleUrls: ['./navigation-mobile-bottom.component.scss'],
    standalone: true,
    imports: [RouterLink, LazyImgDirective, MatIconModule, MatButtonModule]
})
export class NavigationMobileBottomComponent {

}
