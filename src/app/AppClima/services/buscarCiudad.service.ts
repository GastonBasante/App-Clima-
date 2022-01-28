import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LngLatLike, Map, Marker} from 'mapbox-gl';
import { Feature, PlacesResponse } from '../interfaces/places';
import {catchError, map, tap} from 'rxjs/operators'
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class BuscarCiudadService {

  private marcador!: Marker



    constructor(private http:HttpClient){}

    public useLocation?: [number, number];

    public isLoadingPlaces: boolean = false;
    public places: any[] = [];
    private map?: Map;

    public baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'


    getPais$ = new EventEmitter<boolean>()

getPlacesByQuery( query: string = '' ) {
    if(query == '') return;
    if ( query.length === 0 ) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }


    this.isLoadingPlaces = true;

    const params={
        limit: 5,
        language: 'es',
        access_token: environment.TokenMapBox,
        proximity:[-58.41739616921034,-34.605488644615285]
    }

    this.http.get<PlacesResponse>(`${this.baseUrl}${ query }.json`, {params})
    .pipe(
      tap(resp =>{
        this.places = resp.features;
      }),
      catchError(resp=>of([false])),
      
    )
    .subscribe( resp => {
      this.isLoadingPlaces = false;

        
      });

  }

  setMap( map: Map ) {
    this.map = map;
  }

  
  flyTo( coords: LngLatLike,) {
    if(this.marcador) this.marcador.remove();
    
this.places = []
    this.map?.flyTo({
      zoom: 11,
      center: coords
    });
    
 this.marcador =new Marker({ color: 'red' })
    .setLngLat( coords )
    .addTo( this.map!)



    
   



  }


  deletePlaces() {
    this.places = [];
    // console.log('se borra');
    
  }




}