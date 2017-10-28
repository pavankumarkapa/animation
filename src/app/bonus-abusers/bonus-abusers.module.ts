import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonusAbusersRoutingModule } from './bonus-abusers-routing.module';
import { BonusAbusersComponent } from './bonus-abusers.component';
import { BonusAbuserDetailsComponent } from './bonus-abuser-details/bonus-abuser-details.component';

@NgModule({
  imports: [
    CommonModule,
    BonusAbusersRoutingModule
  ],
  declarations: [BonusAbusersComponent, BonusAbuserDetailsComponent]
})
export class BonusAbusersModule { }
