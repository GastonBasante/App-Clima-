import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




import { AppClimaRoutingModule } from './app-clima-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MaterialModule } from '../material/material/material.module';
import { MapViewComponent } from './components/mapa-view/map-view.component';
import { BuscadorCityComponent } from './components/buscador-city/buscador-city.component';
import { BuscadorCityResultComponent } from './components/buscador-city-result/buscador-city-result.component';






@NgModule({
  declarations: [
    InicioComponent,
    MapViewComponent,
    BuscadorCityComponent,
    BuscadorCityResultComponent,
    

  ],
  imports: [
    CommonModule,
    AppClimaRoutingModule,
    MaterialModule,

  ],
})
export class AppClimaModule { }
