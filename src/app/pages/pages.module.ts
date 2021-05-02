import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { FiltroPipe } from './pipe/filtro.pipe';
import { SharedModule } from '../shared/shared.module';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { HeightPipe } from './pipe/height.pipe';
import { HeightMeterPipe } from './pipe/height-meter.pipe';
import { WeightKgPipe } from './pipe/weight-kg.pipe';
import { WeightlbsPipe } from './pipe/weightlbs.pipe';



@NgModule({
  declarations: [HomeComponent, PagesComponent, FiltroPipe, PokemonDetailsComponent, HeightPipe, HeightMeterPipe, WeightKgPipe, WeightlbsPipe, ],
  exports: [HomeComponent, PagesComponent],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
})
export class PagesModule {}
