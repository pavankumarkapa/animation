import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RuleViolationsComponent } from './rule-violations.component';
import { RulesTableComponent } from './rules-table/rules-table.component';

const routes: Routes = [
  { path: '', component: RuleViolationsComponent, children: [
    { path: 'failure', component: RulesTableComponent },
    { path: 'success', component: RulesTableComponent },
    { path: 'actedon', component: RulesTableComponent },
    { path: 'aboard', component: RulesTableComponent },
    { path: '', redirectTo: 'failure', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleViolationsRoutingModule { }
