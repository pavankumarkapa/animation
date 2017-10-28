import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BotUsersRoutingModule } from './bot-users-routing.module';
import { BotUsersComponent } from './bot-users.component';
import { BasicStatisticsComponent } from './basic-statistics/basic-statistics.component';
import { SharedModule } from '../shared/shared.module';
import { BotsService } from './shared/bots.service';
import { FormatBotAlertPipe } from './shared/format-bot-alert.pipe';

@NgModule({
  imports: [
    CommonModule,
    BotUsersRoutingModule,
    SharedModule
  ],
  declarations: [BotUsersComponent, BasicStatisticsComponent, FormatBotAlertPipe],
  providers: [BotsService]
})
export class BotUsersModule { }
