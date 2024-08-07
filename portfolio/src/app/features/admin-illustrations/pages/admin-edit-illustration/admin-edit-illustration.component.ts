import { Component, Input, inject, HostListener } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ViewportScroller, NgIf } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IllustrationService } from '../../../illustrations/services/illustration.service';
import { Illustration } from '../../../illustrations/illustration';
import { IllustrationCreate } from '../../../illustrations/illustration-create';
import { IllustrationEdit } from '../../../illustrations/illustration-edit';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/app/environments/environment';
import { ToggleInputComponent } from '../../../../shared/components/form-components/toggle-input/toggle-input.component';
import { InputComponent } from '../../../../shared/components/form-components/input/input.component';
import { AddImageComponent } from '../../../../shared/components/add-image/add-image.component';
import { SelectedImageComponent } from '../../../../shared/components/selected-image/selected-image.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
    selector: 'app-admin-edit-illustration',
    templateUrl: './admin-edit-illustration.component.html',
    styleUrls: ['./admin-edit-illustration.component.scss'],
    standalone: true,
    imports: [NgIf, LoaderComponent, FormsModule, ReactiveFormsModule, SelectedImageComponent, AddImageComponent, InputComponent, ToggleInputComponent]
})
export class AdminEditIllustrationComponent {

  // private file: File | null = null;
  fileUrl: String | null = null;
  public loading: boolean = false;

  illustration: Illustration
  id: number;
  private sub: any;
  images!: FormGroup;
  editForm!: FormGroup;
  imageUrl = environment.urlApiImage;

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
    this.getIllustration();
  }
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
  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
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
    this.loading = true;

    const illustration: IllustrationEdit = {
      "name": this.editForm.value.details?.name ?? '',
      "description": this.editForm.value.details?.description ?? '',
      "visibility": this.editForm.value.details?.visibility ?? false,
    }
    this.illustrationService.updateIllustration(this.illustration.id, illustration).subscribe({
      next: (data) => {
      },
      error: (errorData) => {
        this.openSnackBar("Ha ocurrido un error")
      },
      complete: () => {
        this.router.navigate(['/', 'admin', 'illustration'])
          .then(nav => {
            console.log(nav); // true if navigation is successful
          }, err => {
            console.log(err) // when there's an error
          });
        this.openSnackBar("Editado con éxito")
      }
    })
  }
  publish() {
    this.editForm.patchValue({
      details: {
        visibility: true
      }
    })
    this.submitEditForm();
  }
  save() {
    this.submitEditForm();
  }

  getIllustration() {
    this.illustrationService.getIllustrationById(this.id).subscribe((data) => {
      this.illustration = data;
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
        this.fileUrl = this.imageUrl + this.illustration.image_id
      }
    })
  }

  //  ON CHANGE
  //  IMAGE SELECTED
  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    const file = event && event.item(0);
    if (file) {
      //  SET FILE
      this.updateImage(file);
      // SET URL FILE
      this.illustrationService.updateIllustrationImage(this.illustration.id, this.editForm.value.images.image)
      this.fileUrl = URL.createObjectURL(file);
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
