import { Component, OnInit } from '@angular/core';
import { BuscarCiudadService } from '../../services/buscarCiudad.service';

@Component({
  selector: 'app-buscador-city',
  templateUrl: './buscador-city.component.html',
  styleUrls: ['./buscador-city.component.css']
})
export class BuscadorCityComponent implements OnInit {

  private debounceTimer?: NodeJS.Timeout;
  public getPais:boolean = false
  constructor( private BuscarCiudadService:BuscarCiudadService  ) { }


  ngOnInit(): void {
   this.BuscarCiudadService.getPais$.subscribe(resp=>this.getPais = resp)
   
  }



  buscador( query: string = '' ) {
    if(query==''){
      this.BuscarCiudadService.deletePlaces()
      
    }
    if ( this.debounceTimer ) clearTimeout( this.debounceTimer );

    this.debounceTimer = setTimeout(() => {
      this.BuscarCiudadService.getUbicacion( query );
      this.BuscarCiudadService.getPais$.emit(false)
    }, 350 );    
    
  }

}
