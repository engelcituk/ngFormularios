import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;

  usuario: any = {
    nombrecompleto: {
      nombre: 'Magic mike',
      apellido: 'Ctret'
    },
    correo: 'magicmike@gmail.com',
    // pasatiempos : ['Correr', 'Dormir', 'comer']
  };

  constructor() {

    // console.log(this.usuario);

    this.forma = new FormGroup({

      nombrecompleto: new FormGroup({
        nombre: new FormControl( '', [
                                      Validators.required,
                                      Validators.minLength(3),
                                    ]
        ),
        apellido: new FormControl('', [
                                        Validators.required,
                                        this.noHerrera
                                      ]
                                  ),
      }),
      correo: new FormControl('',   [
                                      Validators.required,
                                      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,13}$')
                                    ]
                              ),
      pasatiempos : new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      username: new FormControl('', Validators.required, this.existeUsuario),
      password: new FormControl('', Validators.required),
      password2: new FormControl()
    });

    // this.forma.setValue(this.usuario);s
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ]);

    // this.forma.valueChanges
    //   .subscribe( data => {
    //     console.log(data);
    //   });
    this.forma.controls['username'].valueChanges
      .subscribe(data => {
        console.log(data);
      });
    this.forma.controls['username'].statusChanges
      .subscribe(data => {
        console.log(data);
      })
   }

   agregarPasatiempo(){
     (<FormArray> this.forma.controls['pasatiempos']).push(
       new FormControl('', Validators.required)
     );
   }
  // validaciones
   noHerrera( control: FormControl): { [s: string]: boolean} {
     if (control.value === 'herrera') {
       return {
         noherrera: true
       };
     }
     return null;
   }
   // contraseñas iguales
  noIgual(control: FormControl): { [s: string]: boolean } {
    const forma: any = this;

    if (control.value !== forma.controls['password'].value) {
      return {
        noiguales: true
      };
    }
    return null;
  }
  // validador asincrono
  existeUsuario(control: FormControl): Promise<any>| Observable<any> {

    const promesa = new Promise(

      ( resolve, reject) => {

        setTimeout(() => {
          if (control.value === 'strider') {
            resolve( {existe: true});
          } else {
            resolve( null );
          }
        }, 3000);
      }
    );

    return promesa;
  }
   guardarCambios() {
     console.log('forma', this.forma.value );
     console.log('ngForm', this.forma);

    //  this.forma.reset( {
    //    nombrecompleto: {
    //      nombre: '',
    //      apellido: ''
    //    },
    //    correo: ''
    //  } );

   }

}
