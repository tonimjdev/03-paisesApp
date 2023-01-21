import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  // Inyectamos ActivatedRoute para poder subscribirnos a cualquier cambio del Url
  constructor( private activatedRoute: ActivatedRoute,
                private paisService: PaisService ) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      // Con switchMap recibimos un observable y enviamos otro observable
      // (recibimos el cambio de la Url y devolvemos todo el objeto del pais pasando por el servicio)
      switchMap( ( { id } ) => this.paisService.getPaisPorAlpha( id )),
      tap( console.log )

    )
    .subscribe( 
      pais => this.pais = pais[0]
      );
      


  // Al entrar capturamos la ID del pais elegido
  //   this.activatedRoute.params
  //   .subscribe( ({ id }) => {
  //     console.log( id );

  //     this.paisService.getPaisPorAlpha( id )
  //     .subscribe( pais => {
  //       console.log( pais );
  //     })
  //   } )
  // }

}
}
