import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss']
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
