import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ControlContainer, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppValidator } from 'src/app/models/custom-validator';
import { OrderCreate } from '../../order-create';
import { UsersService } from 'src/app/core/auth/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InputComponent } from '../../../../shared/components/form-components/input/input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { Product } from 'src/app/features/products/product';
import { CartItem } from 'src/app/features/cart/cart-item';
import { PaymentService } from '../../payment.service';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CartService } from 'src/app/features/cart/cart.service';
import { ProductService } from 'src/app/features/admin-products/product.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf, MatButtonModule, MatIconModule, InputComponent]
})
export class CheckoutComponent {

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  userLoginOn: boolean = false;

  totalAmount: number;
  amount: number;
  delivery: number;
  steps = 3;
  step = 1;
  products: Product[];
  cartProducts: any = [];
  cartItems: CartItem[] = [];
  // FormGroups
  contact: FormGroup;
  shipping_address: FormGroup;
  checkoutForm: FormGroup;

  constructor(
    private router: Router,
    private payment: PaymentService,
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private paymentService: PaymentService,
    private userService: UsersService,
    private _snackBar: MatSnackBar,

  ) {
    this.authService.userLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
  }


  ngOnInit() {
    this.delivery = this.paymentService.delivery;
    this.cartItems = this.cartService.getItems();
    let cartIds = this.cartItems.map((item: CartItem) => item.product_id);

    this.initializeForm()
    //TODO
    this.productService.getListProducts(cartIds).subscribe(products => {

      this.products = products;

      this.cartItems.forEach((cartItem: CartItem) => {
        let product: any = this.products.find((product) => product.id == cartItem.product_id);
        product = { ...product, amount: cartItem.amount }
        this.cartProducts.push(product);
      });

      this.calculateTotal()
    });
    this.getUser();

    window.paypal.Buttons(
      {
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        },

        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount.toString(),
                  currency_code: 'EUR'
                }
              }
            ]
          })
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            if (details.status === 'COMPLETED') {
              this.payment.transactionID = details.id;
              // this.createOrder().subscribe(response => {
              //   console.log(response);
              //   this.paymentService.setOrder(response);
              //   this.router.navigate(['confirmation'])
              // });
              this.createOrder().subscribe({
                next: (data) => {
                  this.paymentService.setOrder(data);
                },
                error: (errorData) => {
                  this.openSnackBar("Ha ocurrido un error")
                },
                complete: () => {
                  this.router.navigate(['checkout','confirmation'])
                }
              });

            }
          })
        },
        onError: (error: any) => {
          console.log(error);
          this.openSnackBar("Ha ocurrido un error")
        }
      }
    ).render(this.paymentRef.nativeElement);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  initializeForm() {
    //  FORM
    this.contact = new FormGroup({
      email: new FormControl("", [Validators.required, AppValidator.emailValidator()]),
      firstName: new FormControl('', [Validators.required,  Validators.maxLength(150), AppValidator.nameValidator()]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(150), AppValidator.nameValidator()]),
    });
    this.shipping_address = new FormGroup({
      //country: new FormControl('', Validators.required),
      address: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      secondAddress: new FormControl('',[Validators.maxLength(150)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(150), AppValidator.cityValidator()]),
      postalCode: new FormControl('', [Validators.required, AppValidator.postalCodeValidator()]),
      phone: new FormControl('', [Validators.required, AppValidator.phoneValidator()])
    });
    this.checkoutForm = new FormGroup({
      contact: this.contact,
      //SPAIN
      shipping_address: this.shipping_address,
      // payment: new FormGroup({
      //   paypal_option: new FormControl(false),
      //   card: new FormGroup({
      //     firstName_card: new FormControl('', Validators.required),
      //     lastName_card: new FormControl('', Validators.required),
      //     card_number: new FormControl('', [Validators.required, AppValidator.luhnValidator()]),
      //     expiration_date: new FormControl(''),
      //     cvv_cvc: new FormControl('')
      //   }),
      // })
    })
  }

  getUser() {
    console.log("getUser()")
    if (this.userLoginOn) {
      console.log("userLoginOn: true")
      this.userService.getUser().subscribe(
        {
          next: (user) => {
            console.log(user)
            this.checkoutForm.patchValue(
              {
                contact: {
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                },
                shipping_address: {
                  address: user.address,
                  secondAddress: user.secondAddress,
                  city: user.city,
                  postalCode: user.postalCode,
                  phone: user.phone
                }
              }
            )
          }
        }
      )
    }
  }

  createOrder() {
    let order: OrderCreate = {
      "email": this.checkoutForm.value.contact?.email ?? '',
      "firstName": this.checkoutForm.value.contact?.firstName ?? '',
      "lastName": this.checkoutForm.value.contact?.lastName ?? '',
      "address": this.checkoutForm.value.shipping_address?.address ?? '',
      "secondAddress": this.checkoutForm.value.shipping_address?.secondAddress ?? '',
      "city": this.checkoutForm.value.shipping_address?.city ?? '',
      "postalCode": this.checkoutForm.value.shipping_address?.postalCode ?? '',
      "phone": this.checkoutForm.value.shipping_address?.phone ?? '',
      "cartItems": this.cartItems,
      "totalPrice": this.amount
    }
    return this.paymentService.createOrder(order);
  }

  calculateTotal() {
    this.amount = this.cartProducts.reduce((total: any, item: any) => {
      return total + (item.amount * item.price)
    }, 0)
    this.totalAmount = this.amount + this.paymentService.delivery;
  }

  // getPaypalOption(){
  //   return this.checkoutForm.value.payment?.paypal_option;
  // }


  saveStep() {
    // if (this.step == 1 && this.contact.valid) {
    //   console.log(this.checkoutForm.value);
    //   this.step += 1;
    // } else if (this.step == 2 && this.shipping_address.valid) {
    //   this.step += 1;
    //   console.log(this.step)
    // }
    if (this.step == 1) {
      if (this.contact.valid) this.step += 1;
      else {
        Object.keys(this.contact.controls).forEach(field => { // {1}
          const control = this.contact.get(field);            // {2}
          control?.markAsTouched({ onlySelf: true });       // {3}
        });
      }
    } else if (this.step == 2) {
      if(this.shipping_address.valid)  this.step += 1;
      else {
        Object.keys(this.shipping_address.controls).forEach(field => { // {1}
          const control = this.shipping_address.get(field);            // {2}
          control?.markAsTouched({ onlySelf: true });       // {3}
        });
      }
    }
  }
  editFormGroup(step: number) {
    this.step = step;
  }
  // switchPaymentMethod(value: boolean){
  //   this.checkoutForm.patchValue({
  //     payment: {
  //       paypal_option: value
  //     }
  //   })
  // }
  isEditable(step: number) {
    if (this.step == 1) {
      return false
    }
    if (this.step == 2) {
      if (step == 2) return false
      if (step == 1) return true
    }
    if (this.step == 3) {
      if (step == 2) return true
      if (step == 1) return true
    }
    return false
  }
}
