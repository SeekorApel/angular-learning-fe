import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './view/base/navbar/navbar.component';
import { PlantComponent } from './view/master/plant/plant.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
