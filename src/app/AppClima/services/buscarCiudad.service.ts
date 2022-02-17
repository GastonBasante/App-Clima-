import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LngLatLike, Map, Marker} from 'mapbox-gl';
import { PlacesResponse } from '../interfaces/places';
import {catchError, tap} from 'rxjs/operators'
import { of } from "rxjs";


@Injectable({
    providedIn: 'root'
  })

export class BuscarCiudadService {

  private marcador!: Marker

  public userLocation?:[number,number];

  get userLocationReady():boolean{
    return !!this.userLocation;
  }




  public isLoadingPlaces: boolean = false;
  public places: any[] = [];
  private map?: Map;

    constructor(private http:HttpClient){
      // this.getUserLocation()
    }



    


    getPais$ = new EventEmitter<boolean>()

getUbicacion( query: string = '' ) {
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

    this.http.get<PlacesResponse>(`${environment.baseUrlMap}${ query }.json`, {params})
    .pipe(
      tap(resp =>{
        this.places = resp.features;
      }),
      catchError(resp=>of([false])),
      
    )
    .subscribe( resp => {
      this.isLoadingPlaces = false;
      // console.log(this.places);
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



 public async getUserLocation():Promise<[number,number]>{

  return new Promise((resolve, reject)=>{
    navigator.geolocation.getCurrentPosition(({coords})=> 
    {
      this.userLocation = [coords.longitude,coords.latitude]
      resolve(this.userLocation)
    },
    (err)=>{
      alert('No se pudo obtener la Geolocalizacion! \nDebes de tener activada la ubicacion de tu Navegador');
       console.log(err);
       reject();
       
    }
    
    
    );
   
  })


 }





}