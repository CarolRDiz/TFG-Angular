import { Component, TemplateRef, Input, inject, HostListener } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { IllustrationService } from 'src/app/illustrations/services/illustration.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCreate } from '../../product-create';
import { ProductService } from '../../services/product.service';
import { ModalService } from 'src/app/shared/components/modal/services/modal.service';
import {
  MatDialog
} from '@angular/material/dialog';
import { CategoryDialogComponent } from 'src/app/shared/components/category-dialog/category-dialog.component';
@Component({
  selector: 'app-admin-create-product',
  templateUrl: './admin-create-product.component.html',
  styleUrls: ['./admin-create-product.component.scss']
})
export class AdminCreateProductComponent {

  constructor(
    private viewportScroller: ViewportScroller, 
    private router: Router, 
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private modalService: ModalService
    ) {
  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, { size: 'lg', title: 'Selecciona una categoría' })
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }

  ngOnInit() {
  }

  // SERVICES
  illustrationService: IllustrationService = inject(IllustrationService);
  productService: ProductService = inject(ProductService);

  // VARIABLES
  fileUrl: String[] = [];
  public show: boolean | null = false;
  public loading: boolean = false;
  public tags: string[] = [];
  //  FORM
  images = new FormGroup({
    image: new FormControl<Array<File>>([]),
    thumbnailIndex: new FormControl<number>(0)
  })
  organization = new FormGroup({
    visibility: new FormControl(false),
    //categories: new FormControl<Array<number>>([]),
    tags:  new FormControl<Array<string>>(this.tags)
  })
  createForm = new FormGroup({
    details: new FormGroup({
      name: new FormControl('', Validators.required),
      // name: new FormControl('')
      description: new FormControl(''),
      //visibility: new FormControl(false)
    }),
    images: this.images,
    organization: this.organization
  })

  // SETTERS
  updateImages(files: FileList) {
    
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
  getThumbnailImage(){
    let index = this.createForm.value.images?.thumbnailIndex ?? 0
    return this.fileUrl[index];
  }

  anchorScrolling(id: string): void {
    this.viewportScroller.scrollToAnchor(id);
  }

  deleteImage(image: any) {
    console.log("DELETE");
    let index = this.fileUrl.indexOf(image);
    let filesArray = this.image.value;
    filesArray.splice(index, 1);
    this.image.setValue(filesArray);
    console.log(this.image.value)
    console.log("REMOVE URL")
    this.fileUrl = this.fileUrl.filter(url => url!=image)
    console.log(this.fileUrl);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  //  SAVE ILLUSTRATION WITH VISIBILITY=FALSE
  save() {
    console.log("save")
    this.createForm.patchValue({
      organization: {
        visibility: false
      }
    })
    this.submitCreateForm();
  }
  //  SAVE ILLUSTRATION WITH VISIBILITY=TRUE
  publish() {
    this.createForm.patchValue({
      organization: {
        visibility: true
      }
    })
    this.submitCreateForm();
  }
  //  SAVE ILLUSTRATION
  submitCreateForm() {
    this.loading = true
    // const illustration: IllustrationCreate = {
    //   "name": this.createForm.value.details?.name ?? '',
    //   "description": this.createForm.value.details?.description ?? '',
    //   "image": this.createForm.value.images?.image,
    //   "visibility": this.createForm.value.details?.visibility ?? false
    // }
    const product: ProductCreate = {
      "name": this.createForm.value.details?.name ?? '',
      "description": this.createForm.value.details?.description ?? '',
      "visibility": this.createForm.value.organization?.visibility ?? false,
      "category_ids": [],
      "images": this.createForm.value.images?.image ?? [],
      "thumbnail_index": this.createForm.value.images?.thumbnailIndex ?? 0,
      "tags": this.createForm.value.organization?.tags ?? []
    }
    console.log(product);
    this.productService.postProduct(product)
      .then(({ status, data }) => {
        console.log(status);
        this.router.navigate(['/', 'admin', 'products'])
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
  selectThumbnail(i: any){
    this.createForm.patchValue({
      images: {
        thumbnailIndex: i
      }
    })
    console.log(i);
    console.log(this.createForm);
  }
  addTag(newTag: string){
    if(newTag!='' && !this.tags.includes(newTag)){
      console.log(newTag)
      this.tags.push(newTag);
    }
    console.log(this.createForm.value.organization?.tags);
  }
  deleteTag(value: string){
    console.log(value);
    this.tags = this.tags.filter((tag) => tag!=value);
    console.log(this.tags)
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //  ON CHANGE
  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    console.log(event);
    const files = event;
    if (files) {
      console.log(files)
      //  SET FILE
      //this.updateImages(files);
      // SET URL FILE
      let filesArray = this.image.value;
      for(let i=0; i<files.length; i++){
        let file: any = files.item(i);
        this.fileUrl.push(URL.createObjectURL(file));
        filesArray.push(file);
      }
      this.image.setValue(filesArray);
      console.log(this.image.value);
      console.log(this.fileUrl);
      this.show = true;
    }
  }
}
