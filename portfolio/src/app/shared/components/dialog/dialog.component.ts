import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() title? = '';

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  constructor(@Inject(DOCUMENT) private document: Document,
    protected renderer: Renderer2
  ) {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  ngOnDestroy(){
    this.renderer.setStyle(document.body, 'overflow', 'visible');
  }

  close(): void {
    this.closeEvent.emit();
    this.renderer.setStyle(document.body, 'overflow', 'visible');
  }
}
