import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoneyDumpersComponent } from './money-dumpers.component';
import { MoneyDumperDetailsComponent } from './money-dumper-details/money-dumper-details.component';
import { PlayerPersonalInfoResolverService } from './shared/player-personal-info-resolver.service';

const routes: Routes = [
  { path: '', component: MoneyDumpersComponent, children: [
      { path: 'money-dumper-details/:playerId', component: MoneyDumperDetailsComponent, resolve: {
        playerPersonalInfo: PlayerPersonalInfoResolverService
      }}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyDumpersRoutingModule { }
