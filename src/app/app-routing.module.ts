import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsDashboardModule } from './alerts-dashboard/alerts-dashboard.module';
import { BotUsersModule } from './bot-users/bot-users.module';
import { MoneyDumpersModule } from './money-dumpers/money-dumpers.module';
import { BonusAbusersModule } from './bonus-abusers/bonus-abusers.module';
import { PlayerAssociationsModule } from './player-associations/player-associations.module';
import { PlayerCollusionsModule } from './player-collusions/player-collusions.module';
import { RuleViolationsModule } from './rule-violations/rule-violations.module';
import { PlayerListResolverService } from './shared/player-list-resolver.service';
import { PlayerStatisticsModule } from './player-statistics/player-statistics.module';
import { PlayerStatisticsResolverService } from './player-statistics/shared/player-statistics-resolver.service';
import { PlayerStakesResolverService } from './shared/player-stakes-resolver.service';
import { DashboardAlertsResolverService } from './alerts-dashboard/shared/dashboard-alerts-resolver.service';

const routes: Routes = [
  { path: 'alerts-dashboard', loadChildren: './alerts-dashboard/alerts-dashboard.module#AlertsDashboardModule', resolve: {
    alerts: DashboardAlertsResolverService
  } },
  { path: 'bot-users', loadChildren: './bot-users/bot-users.module#BotUsersModule', resolve: {
    players: PlayerListResolverService
  } },
  { path: 'money-dumpers', loadChildren: './money-dumpers/money-dumpers.module#MoneyDumpersModule', resolve: {
    players: PlayerListResolverService
  } },
  { path: 'bonus-abusers', loadChildren: './money-dumpers/money-dumpers.module#MoneyDumpersModule', resolve: {
    players: PlayerListResolverService
  } },
  // { path: 'bonus-abusers', loadChildren: './bonus-abusers/bonus-abusers.module#BonusAbusersModule' },
  { path: 'player-associations', loadChildren: './player-associations/player-associations.module#PlayerAssociationsModule', resolve: {
    players: PlayerListResolverService
  }},
  { path: 'player-collusions', loadChildren: './player-collusions/player-collusions.module#PlayerCollusionsModule', resolve: {
    players: PlayerListResolverService
  } },
  { path: 'rule-violations', loadChildren: './rule-violations/rule-violations.module#RuleViolationsModule' },
  { path: 'player-statistics', loadChildren: './player-statistics/player-statistics.module#PlayerStatisticsModule', resolve: {
    playerStatisticsInfo: PlayerStatisticsResolverService,
    playerStakesResolverService: PlayerStakesResolverService
  } },
  { path: '', redirectTo: 'alerts-dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    AlertsDashboardModule,
    BotUsersModule,
    MoneyDumpersModule,
    BonusAbusersModule,
    PlayerAssociationsModule,
    PlayerCollusionsModule,
    RuleViolationsModule,
    PlayerStatisticsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
