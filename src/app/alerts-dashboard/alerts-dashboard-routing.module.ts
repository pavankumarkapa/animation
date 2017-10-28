import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsDashboardComponent } from './alerts-dashboard.component';

const routes: Routes = [
  { path: '', component: AlertsDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertsDashboardRoutingModule { }
