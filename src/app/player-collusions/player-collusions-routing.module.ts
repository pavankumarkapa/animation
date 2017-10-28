import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerCollusionsComponent } from './player-collusions.component';
import { PlayerPersonalInfoResolverService } from '../money-dumpers/shared/player-personal-info-resolver.service';
import { PlayerCollusionDetailsComponent } from './player-collusion-details/player-collusion-details.component';

const routes: Routes = [
  { path: '', component: PlayerCollusionsComponent, children: [
    { path: 'player-collusion-details/:playerId', component: PlayerCollusionDetailsComponent, resolve: {
      playerPersonalInfo: PlayerPersonalInfoResolverService
    }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerCollusionsRoutingModule { }
