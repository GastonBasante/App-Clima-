import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BuscarCiudadService } from '../../services/buscarCiudad.service';
import { ApiClimaService } from '../../services/api-clima.service';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-buscador-city-result',
  templateUrl: './buscador-city-result.component.html',
  styleUrls: ['./buscador-city-result.component.css']
})
export class BuscadorCityResultComponent implements OnInit , AfterViewInit {

  public selectedId: string = '';

  public getPais:boolean = false;

  panelOpenState = false;

  get isLoadingPlaces(): boolean {
    return this.BuscarCiudadService.isLoadingPlaces;
  }

  get places(): Feature[] {
     return this.BuscarCiudadService.places;
  }

  get climaArr() {
    return this.apiClima.climaArr;
  }



  constructor( 
    private BuscarCiudadService: BuscarCiudadService,
    private apiClima:ApiClimaService
   
  ) { }
  ngOnInit(): void {
    this.BuscarCiudadService.getPais$.subscribe(resp=>this.getPais = resp)
  
  }


  ngAfterViewInit(): void {

  }



  irUbicacion( place: Feature  ) {

    
    this.selectedId = place.id;
    this.BuscarCiudadService.deletePlaces()
    const [ lng, lat ] = place.center;
    console.log(lng, lat);
    
    this.BuscarCiudadService.flyTo([lng,lat]);
   
    this.apiClima.getClima(lat,lng);

    this.BuscarCiudadService.getPais$.emit(true)
  }

 

}
