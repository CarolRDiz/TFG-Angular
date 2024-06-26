import { Component, Input, Output, EventEmitter,HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        FormsModule,
        NgIf,
    ],
})
export class SearchBarComponent {
  @Input() placeholder: string;
  @Input() addButton: boolean;
  @Output() searchEvent = new EventEmitter<String>();
  @Output() addEvent = new EventEmitter<String>();
  search: String

  searchChange(){
    this.searchEvent.emit(this.search);
  }
  clear(){
    this.search = '';
    this.searchEvent.emit(this.search);
  }
  add(){
    this.addEvent.emit(this.search);
    this.clear();
  }
}
