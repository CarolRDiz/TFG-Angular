import { Component, Output, EventEmitter,HostListener } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<String>();
  search: String 

  searchChange(){
    this.searchEvent.emit(this.search);
  }
  clear(){
    this.search = '';
    this.searchEvent.emit(this.search);
  }
}
