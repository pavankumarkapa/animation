import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerAssociationsComponent } from './player-associations.component';
import { PlayerPersonalInfoResolverService } from '../money-dumpers/shared/player-personal-info-resolver.service';
import { PlayerAssociationDetailsComponent } from './player-association-details/player-association-details.component';

const routes: Routes = [
  { path: '', component: PlayerAssociationsComponent, children: [
    { path: 'player-association-details/:playerId', component: PlayerAssociationDetailsComponent, resolve: {
      playerPersonalInfo: PlayerPersonalInfoResolverService
    }}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerAssociationsRoutingModule { }
