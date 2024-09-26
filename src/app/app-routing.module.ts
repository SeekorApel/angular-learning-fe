import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantComponent } from './view/master/plant/plant.component';


const routes: Routes = [
  { path: 'master/plant', component: PlantComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
