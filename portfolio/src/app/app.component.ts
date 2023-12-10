import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  private edad = 17;
  //PROPIEDAD PARA BINDING
  disableProperty = true;
  getEdad(){
    return this.edad;
  }
  llamaEmpresa(value:String){
  }

  registrado = false;
  //FUNCION PARA REGISTRARSE
  getRegistroUsuario(){
    this.registrado = true;
  }
  mostrarAlerta(){
    alert("ALERTAAA")
  }
  bidireccional = "bidireccional"
  // cambiarValue(event:Event){
  //   this.bidireccional = (<HTMLInputElement>event.target).value;
  // }
}
