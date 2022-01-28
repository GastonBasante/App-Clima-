import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { ApiClimaService } from '../../services/api-clima.service';
import { BuscarCiudadService } from '../../services/buscarCiudad.service';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements AfterViewInit, OnInit{

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
