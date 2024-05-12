import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() title? = '';

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();


  close(): void {
    this.closeEvent.emit();
  }
}
