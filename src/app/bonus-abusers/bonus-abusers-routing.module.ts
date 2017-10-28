import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BonusAbusersComponent } from './bonus-abusers.component';

const routes: Routes = [
  { path: '', component: BonusAbusersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonusAbusersRoutingModule { }
