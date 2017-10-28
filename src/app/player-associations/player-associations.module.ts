import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerAssociationsRoutingModule } from './player-associations-routing.module';
import { PlayerAssociationsComponent } from './player-associations.component';
import { SharedModule } from '../shared/shared.module';
import { PlayerAssociationDetailsComponent } from './player-association-details/player-association-details.component';

@NgModule({
  imports: [
    CommonModule,
    PlayerAssociationsRoutingModule,
    SharedModule
  ],
  declarations: [PlayerAssociationsComponent, PlayerAssociationDetailsComponent],
  exports: [PlayerAssociationsComponent, PlayerAssociationDetailsComponent]
})
export class PlayerAssociationsModule { }
