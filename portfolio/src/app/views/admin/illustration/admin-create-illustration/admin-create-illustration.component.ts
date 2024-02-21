import { Component, Input, inject, HostListener } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { IllustrationService } from 'src/app/services/illustration.service';
import { Illustration } from 'src/app/illustration';
import { IllustrationCreate } from 'src/app/illustration-create';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-create-illustration',
  templateUrl: './admin-create-illustration.component.html',
  styleUrls: ['./admin-create-illustration.component.scss'],
})
export class AdminCreateIllustrationComponent {

  constructor(private viewportScroller: ViewportScroller, private router: Router, private _snackBar: MatSnackBar) {
  }
  ngOnInit() {
  }

  // SERVICES
  illustrationService: IllustrationService = inject(IllustrationService);


  // VARIABLES
  private fileUrl: String | null = null;
  public show: boolean | null = false;
  public loading: boolean = false;

  //  FORM
  images = new FormGroup({
    image: new FormControl<File | null>(null)
  })

  createForm = new FormGroup({
    details: new FormGroup({
      name: new FormControl('', Validators.required),
      // name: new FormControl('')
      description: new FormControl(''),
      visibility: new FormControl(false)
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

  getFileUrl() {
    if (this.fileUrl) {
      return this.fileUrl;
    }
    return null
  }
  getShow() {
    return this.show;
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  //  SAVE ILLUSTRATION WITH VISIBILITY=FALSE
  save() {
    console.log("save")
    this.createForm.patchValue({
      details: {
        visibility: false
      }
    })
    this.submitCreateForm();
  }
  //  SAVE ILLUSTRATION WITH VISIBILITY=TRUE
  publish() {
    this.createForm.patchValue({
      details: {
        visibility: true
      }
    })
    this.submitCreateForm();
  }
  //  SAVE ILLUSTRATION
  submitCreateForm() {
    this.loading = true
    const illustration: IllustrationCreate = {
      "name": this.createForm.value.details?.name ?? '',
      "description": this.createForm.value.details?.description ?? '',
      "image": this.createForm.value.images?.image,
      "visibility": this.createForm.value.details?.visibility ?? false
    }
    this.illustrationService.postIllustration(illustration)
      .then(({ status, data }) => {
        console.log(status);
        this.router.navigate(['/', 'admin', 'illustration'])
          .then(nav => {
            console.log(nav); // true if navigation is successful
          }, err => {
            console.log(err) // when there's an error
          });
        this.openSnackBar("Creado con éxito", "Ver")
      })
      .catch(function (error) {
        console.log(error);
      })
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
