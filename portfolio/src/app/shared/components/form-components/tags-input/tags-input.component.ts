import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-tags-input',
    templateUrl: './tags-input.component.html',
    styleUrls: ['./tags-input.component.scss'],
    standalone: true,
    imports: [NgFor, MatIconModule, FormsModule]
})
export class TagsInputComponent {

  @Input() tags: string[];
  @Output() tagsEvent = new EventEmitter();
  tag: string;

  deleteTag(value: string) {
    this.tags = this.tags.filter((tag) => tag != value);
    this.tagsEvent.emit(this.tags);
    
  }
  addTag(newTag: string) {
    if (newTag != '' && !this.tags.includes(newTag)) {
      this.tags.push(newTag);
      this.tagsEvent.emit(this.tags);
    }
    this.tag = ''
  }
}
