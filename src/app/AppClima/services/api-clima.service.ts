import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClimaResp } from '../interfaces/ClimaResp';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiClimaService {

  public BaseUrl = 'https://api.openweathermap.org/data/2.5/weather'

  
  public climaArr:any[] = []

  constructor(private http:HttpClient) { }




getClima(lat:number,lng:number){

  const params={
    lat: lat,
    lon: lng,
    lang: 'es',
    units:'metric',
    appid: environment.TokenClima
  }
  
 this.http.get<ClimaResp>(this.BaseUrl,{params})
 .pipe(
  tap(({coord,main,name,visibility,weather,wind,clouds})=>
  
      this.climaArr = [{coord,main,name,visibility,weather,wind,clouds}]
    ))
.subscribe(resp=>{
  // console.log(this.climaArr);
  
  

} 
  
  )






}


}




