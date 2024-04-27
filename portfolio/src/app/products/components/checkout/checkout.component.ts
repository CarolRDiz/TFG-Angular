import { Component, ElementRef, ViewChild } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidator } from 'src/app/models/custom-validator';
import { Product } from '../../product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { OrderCreate } from '../../order-create';
import { CartItem } from '../../cart-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  totalAmount: number;
  amount: number;
  delivery: number;
  steps = 3;
  step = 1;
  products: Product[];
  cartProducts: any = [];
  cartItems: CartItem[] = [];

  constructor(
    private router: Router, 
    private payment: PaymentService,
    private cartService: CartService,
    private productService: ProductService,
    private paymentService: PaymentService
  ) { }

  //  FORM
  contact = new FormGroup({
    email: new FormControl("", [Validators.required, AppValidator.emailValidator()]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });
  shipping_address = new FormGroup({
    //country: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    secondAddress: new FormControl(''),
    city: new FormControl('', [Validators.required, AppValidator.cityValidator()]),
    postalCode: new FormControl('', [Validators.required, AppValidator.postalCodeValidator()]),
    phone: new FormControl('', [Validators.required, AppValidator.phoneValidator()])
  });
  checkoutForm = new FormGroup({
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

  ngOnInit() {
    this.delivery = this.paymentService.delivery;
    this.cartItems = this.cartService.getItems();
    let cartIds = this.cartItems.map((item: CartItem) => item.product_id);

    this.productService.getListProducts(cartIds).subscribe(products => {

      this.products = products;

      this.cartItems.forEach((cartItem: CartItem) => {
        let product: any = this.products.find((product) => product.id == cartItem.product_id);
        product = { ...product, amount: cartItem.amount }
        this.cartProducts.push(product);
      });
      
      this.calculateTotal()
    });


    //this.amount = this.payment.totalAmount;

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
              this.createOrder().subscribe(response => {
                console.log(response);
                this.paymentService.setOrder(response);
                this.router.navigate(['confirmation'])
              });
              
            }
          })
        },
        onError: (error: any) => {
          console.log(error);
        }
      }
    ).render(this.paymentRef.nativeElement);
  }

  createOrder(){
    let order: OrderCreate = {
      "email": this.checkoutForm.value.contact?.email??'',
      "firstName": this.checkoutForm.value.contact?.firstName??'',
      "lastName": this.checkoutForm.value.contact?.lastName??'',
      "address": this.checkoutForm.value.shipping_address?.address??'',
      "secondAddress":this.checkoutForm.value.shipping_address?.secondAddress??'',
      "city": this.checkoutForm.value.shipping_address?.city??'',
      "postalCode": this.checkoutForm.value.shipping_address?.postalCode??'',
      "phone": this.checkoutForm.value.shipping_address?.phone??'',
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
    if (this.step == 1 && this.contact.valid) {
      console.log(this.checkoutForm.value);
      this.step += 1;
    } else if (this.step == 2 && this.shipping_address.valid){
      this.step += 1;
      console.log(this.step)
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
    if(this.step==1){
      return false
    }
    if(this.step==2) {
      if(step==2)return false
      if(step==1) return true
    }
    if(this.step==3) {
      if(step==2)return true
      if(step==1) return true
    }
    return false
  }
}
