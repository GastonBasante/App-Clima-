import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map} from 'mapbox-gl';
import { BuscarCiudadService } from '../../services/buscarCiudad.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') 
  mapDivElement!: ElementRef

  constructor( 
    private BuscarCiudadService: BuscarCiudadService
  ) { }

  ngAfterViewInit(): void {
      
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-59.671628854201664,-33.67793494793278],
      zoom: 14,
      interactive:false
    });


    this.BuscarCiudadService.setMap( map );

  }

}
