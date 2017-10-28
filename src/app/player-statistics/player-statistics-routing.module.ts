import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerStatisticsComponent } from './player-statistics.component';

const routes: Routes = [
  { path: '', component: PlayerStatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerStatisticsRoutingModule { }
