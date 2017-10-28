import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerStatisticsRoutingModule } from './player-statistics-routing.module';
import { PlayerStatisticsComponent } from './player-statistics.component';
import { PlayerStatisticsResolverService } from './shared/player-statistics-resolver.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PlayerStatisticsRoutingModule,
    SharedModule
  ],
  declarations: [PlayerStatisticsComponent],
  providers: [PlayerStatisticsResolverService]
})
export class PlayerStatisticsModule { }
