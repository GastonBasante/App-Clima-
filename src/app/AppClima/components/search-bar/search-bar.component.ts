import { Component, OnInit } from '@angular/core';
import { BuscarCiudadService } from '../../services/buscarCiudad.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {


  private debounceTimer?: NodeJS.Timeout;
  public getPais:boolean = false
  constructor( private BuscarCiudadService:BuscarCiudadService  ) { }


  ngOnInit(): void {
   this.BuscarCiudadService.getPais$.subscribe(resp=>this.getPais = resp)
   
  }



  onQueryChanged( query: string = '' ) {
    if(query==''){
      this.BuscarCiudadService.deletePlaces()
      
    }
    if ( this.debounceTimer ) clearTimeout( this.debounceTimer );

    this.debounceTimer = setTimeout(() => {
      this.BuscarCiudadService.getPlacesByQuery( query );
      this.BuscarCiudadService.getPais$.emit(false)
    }, 350 );    
    
  }


}
