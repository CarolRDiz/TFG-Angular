import { Component, Input, inject, HostListener } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { IllustrationService } from 'src/app/illustration.service';
import { Illustration } from 'src/app/illustration';
import { IllustrationCreate } from 'src/app/illustration-create';
import { IllustrationEdit } from 'src/app/illustration-edit';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-edit-illustration',
  templateUrl: './admin-edit-illustration.component.html',
  styleUrls: ['./admin-edit-illustration.component.scss']
})
export class AdminEditIllustrationComponent {

  // private file: File | null = null;
  fileUrl: String | null = null;

  illustration: Illustration
  id: number;
  private sub: any;
  images!: FormGroup;
  editForm!: FormGroup;

  // SETTERS
  updateImage(file: File) {
    this.images.setValue(
      {
        image: file
      }
    );
  }

  //  EVENTS
  // @Output() closeEvent = new EventEmitter<void>();

  constructor(
    private illustrationService: IllustrationService,
    private viewportScroller: ViewportScroller,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    //  Create form
    this.initializeForm();
    // Get id from param
    this.id = this.route.snapshot.params['id']
    // Fetch Illustration by Id
    console.log("1 Fetch")
    this.getIllustration();
    console.log("3 Form")
    console.log(this.editForm)
  }
  // async ngOnInit() {
  //   this.sub = this.route.params.subscribe(params => {
  //     (async () => {
  //       this.id = +params['id'];  //(+) converts string 'id' to a number
  //       await this.getIllustration();

  //       this.images = new FormGroup({
  //         image: new FormControl<File | null>(null)
  //       })
  //       this.editForm = new FormGroup({
  //         details: new FormGroup({
  //           name: new FormControl(this.illustration.name, Validators.required),
  //           // name: new FormControl('')
  //           description: new FormControl(this.illustration.description)
  //         }),
  //         images: this.images
  //       })
  //     })
  //   })
  // }

  //  METHODS

  initializeForm() {
    this.images = new FormGroup({
      image: new FormControl<File | null>(null)
    });
    this.editForm = new FormGroup({
      details: new FormGroup({
        //name: new FormControl('', Validators.required),
        name: new FormControl(''),
        description: new FormControl(''),
        visibility: new FormControl(''),
      }),
      images: this.images
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  // close() {
  //   this.closeEvent.emit();
  //   console.log("CLOSE")
  // }
  anchorScrolling(id: string): void {
    this.viewportScroller.scrollToAnchor(id);
  }

  deleteImage() {
    this.illustrationService.deleteIllustrationImage(this.illustration.id)
    this.images.reset();
    this.fileUrl = '';

  }
  updateIllustrationImage() {
    this.illustrationService.updateIllustrationImage(this.illustration.id, this.editForm.value.images.image)
  }
  async submitEditForm() {
    console.log("EDIT FORM")
    console.log(this.editForm)

    const illustration: IllustrationEdit = {
      "name": this.editForm.value.details?.name ?? '',
      "description": this.editForm.value.details?.description ?? '',
      //TODO
      // Dar a elegir la visibilidad
      "visibility": this.editForm.value.details?.visibility ?? false,
    }

    try {
      let success: boolean = false;
      // this.illustrationService.updateIllustration(this.illustration.id, illustration)
      await this.illustrationService.updateIllustration(this.illustration.id, illustration)
        .then(({ status }) => {
          console.log(status);
          success = true;
        }
        );
      if (success) {
        this.router.navigate(['/', 'admin', 'illustration'])
          .then(nav => {
            console.log(nav); // true if navigation is successful
          }, err => {
            console.log(err) // when there's an error
          });
        this.openSnackBar("Guardado con éxito", "Ver")
      }
    }
    catch (error) {
      console.log(error)
      //TODO
      //Reintentar
      this.openSnackBar("No se ha podido guardar", "Reintentar")
    }

    // if (success) {
    //   this.router.navigate(['/', 'admin', 'illustration'])
    //     .then(nav => {
    //       console.log(nav); // true if navigation is successful
    //     }, err => {
    //       console.log(err) // when there's an error
    //     });
    // }
  }

  // async getIllustration() {
  //   await this.illustrationService.getIllustrationById(this.id)
  //     .then(({ status, data }) => {
  //       if (status == 200) {
  //         console.log(data)
  //         this.illustration = data;
  //         console.log(this.illustration)
  //       };
  //     })
  // }

  getIllustration() {
    this.illustrationService.getIllustrationById(this.id).subscribe((data) => {
      this.illustration = data;
      console.log(this.illustration)
      // pre-populate data
      this.editForm.patchValue(
        {
          details: {
            name: this.illustration.name,
            description: this.illustration.description,
            visibility: this.illustration.visibility
          }
        })
      if (this.illustration.image_id) {
        this.fileUrl = 'http://localhost:8080/images/' + this.illustration.image_id
      }
    })
  }

  //  ON CHANGE
  //  IMAGE SELECTED
  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    const file = event && event.item(0);
    if (file) {
      console.log(file)
      //  SET FILE
      this.updateImage(file);
      // SET URL FILE
      this.illustrationService.updateIllustrationImage(this.illustration.id, this.editForm.value.images.image)
      this.fileUrl = URL.createObjectURL(file);
      console.log(this.fileUrl);
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
