import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsDashboardRoutingModule } from './alerts-dashboard-routing.module';
import { AlertsDashboardComponent } from './alerts-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardAlertsResolverService } from './shared/dashboard-alerts-resolver.service';
import { BotUsersModule } from '../bot-users/bot-users.module';
import { SystemAnimationComponent } from './system-animation/system-animation.component';
import { NewAnimationComponent } from './new-animation/new-animation.component';

@NgModule({
  imports: [
    CommonModule,
    AlertsDashboardRoutingModule,
    SharedModule
  ],
  declarations: [AlertsDashboardComponent, SystemAnimationComponent, NewAnimationComponent],
  providers: [DashboardAlertsResolverService, SystemAnimationComponent]
})
export class AlertsDashboardModule { }
