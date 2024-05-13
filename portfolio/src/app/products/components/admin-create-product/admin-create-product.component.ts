import { Component, TemplateRef, Input, inject, HostListener } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { IllustrationService } from 'src/app/illustrations/services/illustration.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCreate } from '../../product-create';
import { ProductService } from '../../services/product.service';
import {
  MatDialog
} from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../category';

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
    private categoriesService: CategoriesService,
  ) {
  }

  categoriesModal: boolean = false;

  openModal() {
    this.categoriesModal = true;
  }
  closeModal() {
    this.categoriesModal = false;
  }

  ngOnInit(): void {

  }

  // SERVICES
  illustrationService: IllustrationService = inject(IllustrationService);
  productService: ProductService = inject(ProductService);

  // VARIABLES
  imagePaths: String[] = [];
  public show: boolean | null = false;
  public loading: boolean = false;
  public tags: string[] = [];
  //  FORM
  images = new FormGroup({
    image: new FormControl<Array<File>>([]),
    thumbnailIndex: new FormControl<number>(0)
  });
  organization = new FormGroup({
    visibility: new FormControl(false),
    categories: new FormControl<Array<number>>([]),
    tags: new FormControl<Array<string>>(this.tags),
  });
  inventory = new FormGroup({
    price: new FormControl("0")
  });
  createForm = new FormGroup({
    details: new FormGroup({
      name: new FormControl('', Validators.required),
      // name: new FormControl('')
      description: new FormControl(''),
      //visibility: new FormControl(false)
    }),
    images: this.images,
    organization: this.organization,
    inventory: this.inventory
  })

  // GETTERS
  get image(): any {
    return this.images.get('image');
  }
  getCategories(): any {
    return this.organization.get('categories')?.value;
  }

  getimagePaths() {
    if (this.imagePaths) {
      return this.imagePaths;
    }
    return null
  }
  getShow() {
    return this.show;
  }
  getThumbnailImage() {
    let index = this.createForm.value.images?.thumbnailIndex ?? 0
    return this.imagePaths[index];
  }

  anchorScrolling(id: string): void {
    this.viewportScroller.scrollToAnchor(id);
  }

  deleteImage(image: any) {
    let index = this.imagePaths.indexOf(image);
    let filesArray = this.image.value;
    filesArray.splice(index, 1);
    this.image.setValue(filesArray);
    this.imagePaths = this.imagePaths.filter(url => url != image)
  }

  validatePrice($event: any) {
    let price = this.createForm.value.inventory?.price?.toString() ?? '';
    const exRegPrice = /^\d+\.?\d{0,2}$/g;
    if (!exRegPrice.test(price)) {
      price = price.slice(0, -1);
      if (price == '') price = "0"
      this.createForm.patchValue({
        inventory: {
          price: price
        }
      })
    };
  }
  completePrice() {
    let price = this.createForm.value.inventory?.price?.toString() ?? '';
    if (price == '') price = '0';
    this.createForm.patchValue({
      inventory: {
        price: parseFloat(price).toFixed(2).toString()
      }
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
  //  SAVE ILLUSTRATION WITH VISIBILITY=FALSE
  save() {
    // this.createForm.patchValue({
    //   organization: {
    //     visibility: false
    //   }
    // })
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
    const product: ProductCreate = {
      "name": this.createForm.value.details?.name ?? '',
      "description": this.createForm.value.details?.description ?? '',
      "visibility": this.createForm.value.organization?.visibility ?? false,
      "category_ids": this.createForm.value.organization?.categories ?? [],
      "images": this.createForm.value.images?.image ?? [],
      "thumbnail_index": this.createForm.value.images?.thumbnailIndex ?? 0,
      "tags": this.createForm.value.organization?.tags ?? [],
      "price": this.createForm.value.inventory?.price ?? '0'
    }
    console.log(product);
    this.productService.postProduct(product).subscribe({
      next: (data) => {
        console.log(data);

      },
      error: (errorData) => {
        this.openSnackBar("Ha ocurrido un error")
      },
      complete: () => {
        this.router.navigate(['/', 'admin', 'products'])
          .then(nav => {
            console.log(nav); // true if navigation is successful
          }, err => {
            console.log(err) // when there's an error
          });
        this.openSnackBar("Creado con éxito")
      }
    })
  }
  selectThumbnail(i: any) {
    this.createForm.patchValue({
      images: {
        thumbnailIndex: i
      }
    })
    console.log(i);
    console.log(this.createForm);
  }
  updateTags(value: any) {
    this.tags = value;
  }

  selectCategories($event: any) {
    console.log($event);
    this.createForm.patchValue({
      organization: {
        categories: $event
      }
    })
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
      for (let i = 0; i < files.length; i++) {
        let file: any = files.item(i);
        this.imagePaths.push(URL.createObjectURL(file));
        filesArray.push(file);
      }
      this.image.setValue(filesArray);
      console.log(this.image.value);
      console.log(this.imagePaths);
      this.show = true;
    }
  }
}
