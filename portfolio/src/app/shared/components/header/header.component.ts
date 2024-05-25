import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatIconRegistry, MatIconModule } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { LazyImgDirective } from '../../directives/lazy-img.directive';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [RouterLink, LazyImgDirective, MatIconModule]
})
export class HeaderComponent {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "instagram",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/icons/instagram.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "email",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/icons/email.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "twitter",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/icons/twitter.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "tik-tok",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/icons/tik-tok.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "twitch",
      this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/icons/twitch.svg")
    );
  }


}
