import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartService } from './features/cart/cart.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
      RouterOutlet
    ]
})
export class AppComponent {

  cartService: CartService = inject(CartService);

  ngOnInit() {
    this.cartService.loadCart();
  }

  title = 'portfolio';
  private edad = 17;
  //PROPIEDAD PARA BINDING
  disableProperty = true;
  getEdad() {
    return this.edad;
  }
  llamaEmpresa(value: String) {
  }

  registrado = false;
  //FUNCION PARA REGISTRARSE
  getRegistroUsuario() {
    this.registrado = true;
  }
  mostrarAlerta() {
    alert("ALERTAAA")
  }
  bidireccional = "bidireccional"
  // cambiarValue(event:Event){
  //   this.bidireccional = (<HTMLInputElement>event.target).value;
  // }
}
