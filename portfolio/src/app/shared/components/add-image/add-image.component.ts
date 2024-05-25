import { Component, Input, inject, HostListener } from '@angular/core';
import { ControlContainer, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-add-image',
    templateUrl: './add-image.component.html',
    styleUrls: ['./add-image.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatIconModule]
})
export class AddImageComponent {
  @Output() selectImageEvent = new EventEmitter<File>();
  @Input() parentForm: FormGroup;
  @Input() maxFiles: number;
  private file: File | null = null;
  private fileUrl: String | null = null;

  // getFile(){
  //   return this.file;
  // }

  // getFileName(){
  //   if(this.file){
  //     return this.file.name;
  //   }
  //   return "nada"
  // }
  // getFileUrl(){
  //   if(this.fileUrl){
  //     return this.fileUrl;
  //   }
  //   return null
  // }

  // deleteImage(){
  //   this.deleteImageEvent.emit();
  // }

  // FILE IS SAVED IN THE VARIABLE WHEN INPUT CHANGES
  // @HostListener('change', ['$event.target.files'])
  // emitFiles(event: FileList) {
  //   const file = event && event.item(0);
  //   if(file){
  //     this.selectImageEvent.emit(file);
  //     // this.file = file;
  //     // this.fileUrl = URL.createObjectURL(file);
  //   }
  //   console.log(file);
  //   console.log(this.fileUrl);
  // }
}

