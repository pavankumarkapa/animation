import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BotUsersComponent } from './bot-users.component';
import { BasicStatisticsComponent } from './basic-statistics/basic-statistics.component';
import { PlayerPersonalInfoResolverService } from '../money-dumpers/shared/player-personal-info-resolver.service';

const routes: Routes = [
  { path: '', component: BotUsersComponent, children: [
    { path: 'basic-statistics/:playerId', component: BasicStatisticsComponent, resolve: {
      playerPersonalInfo: PlayerPersonalInfoResolverService
    } }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotUsersRoutingModule { }
