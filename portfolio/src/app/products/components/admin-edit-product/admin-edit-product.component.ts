import { Component, TemplateRef, Input, inject, HostListener } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ViewportScroller, NgIf, NgFor } from '@angular/common';
import { ControlContainer, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IllustrationService } from 'src/app/illustrations/services/illustration.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCreate } from '../../product-create';
import { ProductService } from '../../services/product.service';
import {
  MatDialog
} from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../category';
import { Product } from '../../product';
import { ProductEdit } from '../../product-edit';
import { ProductCategoryService } from '../../services/product-category.service';
import { environment } from 'src/app/environments/environment';
import { CategoriesModalComponent } from '../categories-modal/categories-modal.component';
import { TagsInputComponent } from '../../../shared/components/form-components/tags-input/tags-input.component';
import { CategoriesInputComponent } from '../../../shared/components/form-components/categories-input/categories-input.component';
import { ToggleInputComponent } from '../../../shared/components/form-components/toggle-input/toggle-input.component';
import { PriceInputComponent } from '../../../shared/components/form-components/price-input/price-input.component';
import { AddImageComponent } from '../../../shared/components/add-image/add-image.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LazyImgDirective } from '../../../shared/directives/lazy-img.directive';
import { InputComponent } from '../../../shared/components/form-components/input/input.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

interface ImageData {
  id: String,
  path: String
}

@Component({
    selector: 'app-admin-edit-product',
    templateUrl: './admin-edit-product.component.html',
    styleUrls: ['./admin-edit-product.component.scss'],
    standalone: true,
    imports: [NgIf, LoaderComponent, FormsModule, ReactiveFormsModule, InputComponent, NgFor, LazyImgDirective, MatButtonModule, MatIconModule, AddImageComponent, PriceInputComponent, ToggleInputComponent, CategoriesInputComponent, TagsInputComponent, CategoriesModalComponent]
})
export class AdminEditProductComponent {

  // VARIABLES
  public loading: boolean = false;
  public tags: string[] = [];
  id: number;
  categoriesModal: boolean = false;
  images!: FormGroup;
  organization!: FormGroup;
  editForm!: FormGroup;
  inventory!: FormGroup;
  // imagesData: ImageData[] = [];
  // imagePaths: String[] = [];
  imageIds: String[] = [];
  imageUrl = environment.urlApiImage;
  oldCategoryIds: Number[];

  // SERVICES
  illustrationService: IllustrationService = inject(IllustrationService);
  productService: ProductService = inject(ProductService);
  categoriesService: CategoriesService = inject(CategoriesService)
  productCategoryService: ProductCategoryService = inject(ProductCategoryService);

  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    //  Create form
    this.initializeForm();
    // Get id from param
    this.id = this.route.snapshot.params['id']
    // Fetch Illustration by Id
    // console.log("1 Fetch")
    this.getProduct();
    // console.log("3 Form")
    // console.log(this.editForm)
  }
  // GETTERS
  get image(): any {
    return this.images.get('image');
  }
  getCategories(): any {
    return this.organization.get('categories')?.value;
  }
  // getImagePaths() {
  //   if (this.imagePaths) {
  //     return this.imagePaths;
  //   }
  //   return null
  // }
  getImageIds() {
    if (this.imageIds) {
      return this.imageIds
    }
    return null
  }

  getImagePath(imageId: String) {
    return this.imageUrl + imageId;
  }

  getThumbnailImage() {
    if(this.editForm.value.images.thumbnail_image_id!='')return this.imageUrl.concat(this.editForm.value.images.thumbnail_image_id);
    else return ''
  }

  initializeForm() {
    //  FORM
    this.images = new FormGroup({
      image: new FormControl<Array<File>>([]),
      thumbnail_image_id: new FormControl<String>('')
    })
    this.inventory = new FormGroup({
      price: new FormControl("")
    });
    this.organization = new FormGroup({
      visibility: new FormControl(false),
      categories: new FormControl<Array<number>>([]),
      tags: new FormControl<Array<string>>(this.tags),
    })
    this.editForm = new FormGroup({
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
  }

  getProduct() {
    this.productService.getProductById(this.id).subscribe((data) => {
      let product: Product = { ...data };
      // pre-populate data
      this.editForm.patchValue(
        {
          details: {
            name: product.name,
            description: product.description,
          },
          organization: {
            categories: product.category_ids,
            visibility: product.visibility
          },
          images: {
            thumbnail_image_id: product.thumbnail_image_id
          },
          inventory: {
            price: product.price.toString()
          }
        })
        
      this.imageIds = product.image_ids;
      this.oldCategoryIds = [...product.category_ids];
    })
  }

  // setImages(imageIds: string[]) {
  //   // this.imageIds = [];
  //   // this.imagePaths = [];
  //   this.imagesData = [];
  //   for (let i = 0; i < imageIds.length; i++) {
  //     //this.imageIds.push(imageIds[i]);
  //     let imagePath: string = 'http://localhost:8080/images/' + imageIds[i];
  //     //this.imagePaths.push(imageUrl);
  //     let imageData: ImageData = {"id": imageIds[i], "path": imagePath};
  //     this.imagesData.push(imageData);
  //   }
  // }



  anchorScrolling(id: string): void {
    this.viewportScroller.scrollToAnchor(id);
  }

  deleteImage(imageId: String) {
    console.log("Delete Image")
    this.productService.deleteProductImage(this.id, imageId);
    this.imageIds = this.imageIds.filter(id => id != imageId);
    if (this.editForm.value.images.thumbnail_image_id == imageId) {
      this.editForm.patchValue(
        {
          images: {
            thumbnail_image_id: ''
          }
        })
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
  //  SAVE ILLUSTRATION WITH VISIBILITY=FALSE
  save() {
    console.log("save")
    // this.editForm.patchValue({
    //   organization: {
    //     visibility: false
    //   }
    // })
    this.submitEditForm();
  }
  //  SAVE ILLUSTRATION WITH VISIBILITY=TRUE
  publish() {
    this.editForm.patchValue({
      organization: {
        visibility: true
      }
    })
    this.submitEditForm();
  }
  //  SAVE ILLUSTRATION
  submitEditForm() {
    this.loading = true
    const product: ProductEdit = {
      "name": this.editForm.value.details?.name ?? '',
      "description": this.editForm.value.details?.description ?? '',
      "visibility": this.editForm.value.organization?.visibility ?? false,
      "thumbnail_image_id": this.editForm.value.images?.thumbnail_image_id ?? '',
      "tags": this.editForm.value.organization?.tags ?? [],
      "price": this.editForm.value.inventory?.price ?? ''
    }

    //CATEGORIES
    let currentCategories: Number[] = this.editForm.value.organization.categories;
    let commonCategories: Number[] = this.oldCategoryIds.filter(x => currentCategories.includes(x));
    let deletedCategories: Number[] = this.oldCategoryIds.filter(x => !commonCategories.includes(x));
    let newCategories = currentCategories.filter(x => !commonCategories.includes(x));

    this.productCategoryService.delete(this.id, deletedCategories).subscribe(data => {
      console.log(data);
    })
    this.productCategoryService.create(this.id, newCategories).subscribe(data => {
      console.log(data);
    })

    this.productService.updateProduct(this.id, product).subscribe(data => {
      console.log(data);
      this.router.navigate(['/', 'admin', 'products'])
        .then(nav => {
          console.log(nav); // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
        });
      this.openSnackBar("Editado con éxito")
    })
  }
  selectThumbnail(imageId: String) {
    this.editForm.patchValue({
      images: {
        thumbnail_image_id: imageId
      }
    })
    console.log(this.editForm);
  }

  //TAGS
  updateTags(value: any){
    this.tags = value;
  }

  //CATEGORIES MODAL
  openModal() {
    this.categoriesModal = true;
  }
  closeModal() {
    this.categoriesModal = false;
  }
  selectCategories($event: any) {
    console.log($event);
    this.editForm.patchValue({
      organization: {
        categories: $event
      }
    })
    console.log("FORM PATCH, OLD CATEGORIES" + this.oldCategoryIds);
  }

  //  ON CHANGE
  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    const files = event;
    if (files) {
      console.log(files)
      for (let i = 0; i < files.length; i++) {
        let file: any = files.item(i);
        this.productService.addProductImage(this.id, file).subscribe((data) => {
          console.log(data);
          this.imageIds = data.image_ids;
        });
      }
    }
  }
}
