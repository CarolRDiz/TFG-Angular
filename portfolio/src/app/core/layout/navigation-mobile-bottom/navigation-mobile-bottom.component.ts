import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LazyImgDirective } from 'src/app/shared/directives/lazy-img.directive';

@Component({
    selector: 'app-navigation-mobile-bottom',
    templateUrl: './navigation-mobile-bottom.component.html',
    styleUrls: ['./navigation-mobile-bottom.component.scss'],
    standalone: true,
    imports: [RouterLink, LazyImgDirective, MatIconModule, MatButtonModule]
})
export class NavigationMobileBottomComponent {

}
