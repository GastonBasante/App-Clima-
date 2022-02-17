import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FzdG9uYmFzYW50ZSIsImEiOiJja3llZm5kNm4wZXloMndtbGt3YXB3aXd3In0.rK7XehnBTAyYdWUxDAalCg';


if(!navigator.geolocation){
  alert('Tu navegador no soporta la Geolocalizacion')
  throw new Error('Tu navegador no soporta la Geolocalizacion')
  
}


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
