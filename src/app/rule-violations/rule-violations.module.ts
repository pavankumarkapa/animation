import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuleViolationsRoutingModule } from './rule-violations-routing.module';
import { RuleViolationsComponent } from './rule-violations.component';
import { RulesTableComponent } from './rules-table/rules-table.component';
import { RulesViolationService } from './shared/rules-violation.service';
import { RuleViolationDetailsComponent } from './rule-violation-details/rule-violation-details.component';

@NgModule({
  imports: [
    CommonModule,
    RuleViolationsRoutingModule
  ],
  declarations: [RuleViolationsComponent, RulesTableComponent, RuleViolationDetailsComponent],
  exports: [RulesTableComponent],
  providers: [RulesViolationService]
})
export class RuleViolationsModule { }
