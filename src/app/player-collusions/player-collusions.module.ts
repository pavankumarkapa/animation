import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerCollusionsRoutingModule } from './player-collusions-routing.module';
import { PlayerCollusionsComponent } from './player-collusions.component';
import { SharedModule } from '../shared/shared.module';
import { PlayerCollusionDetailsComponent } from './player-collusion-details/player-collusion-details.component';

@NgModule({
  imports: [
    CommonModule,
    PlayerCollusionsRoutingModule,
    SharedModule
  ],
  declarations: [PlayerCollusionsComponent, PlayerCollusionDetailsComponent]
})
export class PlayerCollusionsModule { }
