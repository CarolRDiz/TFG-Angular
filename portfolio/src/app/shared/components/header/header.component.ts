import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
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
