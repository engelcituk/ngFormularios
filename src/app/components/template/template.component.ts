import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
    `.ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }`
  ]
})
export class TemplateComponent {

  usuario: object = {
    nombre: null,
    apellido: null,
    email: null,
    pais : '',
    sexo : 'Hombre',
    acepta: false
  };

  paises = [{
   codigo: 'MEX' ,
   pais: 'México'
  }, {
      codigo: 'USA',
      nombre: 'EUA'
  },
    {
      codigo: 'ESP',
      nombre: 'ESPAÑA'
    }
];

sexos: string[] = ['Hombre', 'Mujer', 'Sin definir'];

  constructor() { }

  guardar(forma: NgForm) {
    console.log('formulario posteado');
    console.log('ngForm', forma);
    console.log('valor', forma.value);
  }
}
