import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialModule } from '../material/material/material.module';



@NgModule({
  declarations: [
    NavBarComponent,
  ],
  exports:[
    NavBarComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
