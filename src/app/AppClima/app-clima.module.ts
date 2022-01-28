import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




import { AppClimaRoutingModule } from './app-clima-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MaterialModule } from '../material/material/material.module';
import { MapViewComponent } from './components/mapa/map-view.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';




@NgModule({
  declarations: [
    InicioComponent,
    SearchBarComponent,
    MapViewComponent,
    NavBarComponent,
    SearchResultsComponent,
    

  ],
  imports: [
    CommonModule,
    AppClimaRoutingModule,
    MaterialModule
  ],
})
export class AppClimaModule { }
