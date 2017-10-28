import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyDumpersRoutingModule } from './money-dumpers-routing.module';
import { MoneyDumpersComponent } from './money-dumpers.component';
import { SharedModule } from '../shared/shared.module';
import { MoneyDumpingService } from './shared/money-dumping.service';
import { MoneyDumperDetailsComponent } from './money-dumper-details/money-dumper-details.component';
import { PlayerPersonalInfoResolverService } from './shared/player-personal-info-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    MoneyDumpersRoutingModule,
    SharedModule
  ],
  declarations: [MoneyDumpersComponent, MoneyDumperDetailsComponent],
  exports: [MoneyDumpersComponent, MoneyDumperDetailsComponent],
  providers: [MoneyDumpingService, PlayerPersonalInfoResolverService]
})
export class MoneyDumpersModule { }
