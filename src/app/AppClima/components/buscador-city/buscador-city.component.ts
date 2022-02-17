import { Component, OnInit } from '@angular/core';
import { BuscarCiudadService } from '../../services/buscarCiudad.service';
import { LngLatLike } from 'mapbox-gl';
import { ApiClimaService } from '../../services/api-clima.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-buscador-city',
  templateUrl: './buscador-city.component.html',
  styleUrls: ['./buscador-city.component.css']
})
export class BuscadorCityComponent implements OnInit {

  private debounceTimer?: NodeJS.Timeout;
  public getPais:boolean = false
  public userLocation!:LngLatLike


  constructor( private BuscarCiudadService:BuscarCiudadService,
                private ApiClimaService: ApiClimaService  ) { }


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


  location(){
    this.BuscarCiudadService.getUserLocation()
    .then(resp=>{
      const [lat,lng] = resp
      this.ApiClimaService.getClima(lng,lat)
      this.BuscarCiudadService.flyTo(resp)
      this.BuscarCiudadService.getPais$.emit(true)
    })
    .catch(resp=>console.log('No se ha permitido el acceso',resp)
    )
  }




}
