import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DonutChartComponent } from './donut-chart.component';
import { AlertsService } from './alerts.service';
import { PlayerService } from './player.service';
import { GroupedBarChartComponent } from './g-bar-chart.component';
import { HorizontalBarChartComponent } from './h-bar-chart.component';
import { ColorInfoComponent } from './color-info.component';
import { TreeChartComponent } from './tree-chart.component';
import { PlayerListComponent } from './player-list.component';
import { PlayerListResolverService } from './player-list-resolver.service';
import { FilterListPipe } from './filter-list.pipe';
import { FormsModule } from '@angular/forms';
import { PlayerStakesResolverService } from './player-stakes-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule
  ],
  declarations: [
    DonutChartComponent,
    GroupedBarChartComponent,
    HorizontalBarChartComponent,
    ColorInfoComponent,
    TreeChartComponent,
    PlayerListComponent,
    FilterListPipe
  ],
  exports: [
    DonutChartComponent,
    GroupedBarChartComponent,
    HorizontalBarChartComponent,
    ColorInfoComponent,
    TreeChartComponent,
    PlayerListComponent
  ],
  providers: [
    AlertsService,
    PlayerService,
    PlayerListResolverService,
    PlayerStakesResolverService
  ]
})
export class SharedModule { }
