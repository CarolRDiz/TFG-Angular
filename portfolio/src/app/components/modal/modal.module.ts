import { NgModule } from '@angular/core';
import { ModalComponent } from "./components/modal/modal.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { SearchBarComponent } from '../search-bar/search-bar.component';
@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    CommonModule,
  ],
})
export class ModalModule { }
