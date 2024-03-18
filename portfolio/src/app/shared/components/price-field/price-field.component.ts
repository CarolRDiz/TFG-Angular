import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-price-field',
  templateUrl: './price-field.component.html',
  styleUrls: ['./price-field.component.scss']
})
export class PriceFieldComponent {
  @Input() parentForm: FormGroup;
  
  validatePrice($event: any){
    let price = this.parentForm.value.price?.toString()??'';
    const exRegPrice = /^\d+\.?\d{0,2}$/g;
    if (!exRegPrice.test(price)) {
      price = price.slice(0,-1);
      this.parentForm.patchValue({
        price: price
      })
    };
  }
  completePrice(){
    let price = this.parentForm.value.price?.toString()??'';
    if(price=='') price='0';
    this.parentForm.patchValue({
      price: parseFloat(price).toFixed(2).toString()
    })
  }
}
