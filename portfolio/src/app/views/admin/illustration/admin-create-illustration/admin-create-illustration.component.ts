import { Component, Input, inject, HostListener } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { IllustrationService } from 'src/app/illustration.service';
import { Illustration } from 'src/app/illustration';
import { IllustrationCreate } from 'src/app/illustration-create';

@Component({
  selector: 'app-admin-create-illustration',
  templateUrl: './admin-create-illustration.component.html',
  styleUrls: ['./admin-create-illustration.component.scss'],
})
export class AdminCreateIllustrationComponent {

  constructor(private viewportScroller: ViewportScroller) {
  }
  ngOnInit() {
    // this.onChanges();
  }

  // SERVICES
  illustrationService: IllustrationService = inject(IllustrationService);

  //  EVENTS
  @Output() closeEvent = new EventEmitter<void>();

  // VARIABLES
  private file: File | null = null;
  private fileUrl: String | null = null;
  public show: boolean | null = false;


  //  FORM
  images = new FormGroup({
    image: new FormControl<File | null>(null)
  })

  createForm = new FormGroup({
    details: new FormGroup({
      name: new FormControl('', Validators.required),
      // name: new FormControl('')
      description: new FormControl('')
    }),
    images: this.images
  })

  // SETTERS
  updateImage(file: File) {
    this.image.setValue(file);
  }
  // GETTERS
  get image(): any {
    return this.images.get('image');
  }
  getFile(): any {
    return this.file;
  }
  getFileName() {
    if (this.file) {
      return this.file.name;
    }
    return "nada"
  }
  getFileUrl() {
    if (this.fileUrl) {
      return this.fileUrl;
    }
    return null
  }
  getShow() {
    return this.show;
  }

  //  METHODS
  close() {
    this.closeEvent.emit();
    console.log("CLOSE")
  }
  anchorScrolling(id: string): void {
    this.viewportScroller.scrollToAnchor(id);
  }

  deleteImage() {
    console.log("DELETE");
    this.show = false;
    this.image.reset();
    this.fileUrl = null;
  }

  submitCreateForm() {
    console.log(this.createForm)
    const illustration : IllustrationCreate = {
      "name": this.createForm.value.details?.name??'',
      "description": this.createForm.value.details?.description??'',
      "image": this.createForm.value.images?.image,
      "visibility": false
    }
    this.illustrationService.postIllustration(illustration);
  }

  //  ON CHANGE
  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    const file = event && event.item(0);
    if (file) {
      console.log(file)
      //  SET FILE
      this.updateImage(file);
      // SET URL FILE
      this.fileUrl = URL.createObjectURL(file);
      console.log(this.fileUrl);
      this.show = true;
    }
  }

  // onChanges(): void {
  //   this.image.valueChanges.subscribe((val: FileList) => {
  //     console.log("CAMBIO: " + val);
  //     // const file = val && val.item(0);
  //     // //  SET FILE
  //     // this.file = file;
  //     // //  SET URL FILE
  //     // if (file) this.fileUrl = URL.createObjectURL(file);
  //     // this.show = true;

  //   });
  // }

}
