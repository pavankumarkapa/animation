import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RulesViolationService } from '../shared/rules-violation.service';

@Component({
  selector: 'rules-table',
  template: `
    <div class="row">
      <div class="col-md-12">
        <p *ngIf="!rulesAvailable" class="badge-info">No Rules Violation Found.</p>
      </div>
    </div>

    <div class="row rules-section" *ngIf="rulesAvailable">
      <div class="col-md-12">
        <table class="table table-striped table-bordered table-hover table-sm">
          <thead class="thead-default">
            <tr>
              <th>Rule Id</th>
              <th>Rules Violated</th>
              <th>Action Triggered</th>
              <th>Agent</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let playerRule of playerRules">
              <td>{{playerRule.f_ruleId}}</td>
              <td>{{playerRule.f_ruleComment}}</td>
              <td>{{playerRule.f_action_triggered}}</td>
              <td>{{playerRule.f_action_agent}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class RulesTableComponent implements OnInit {
  urlMapping = {
    '/rule-violations/failure': 'FAILURE',
    '/rule-violations/success': 'SUCCESS',
    '/rule-violations/actedon': 'ACTEDON',
    '/rule-violations/aboard' : 'ABOARD',
  };
  rulesAvailable = false;
  playerRules;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rService: RulesViolationService
  ) { }

  ngOnInit() {
    console.log(this.router.url);
    console.log(this.route.snapshot);

    this.rService.getPlayerRuleViolationsForType('pp_pokerauto100', this.urlMapping[this.router.url]).subscribe(
      (r: any) => {
        if (r.bvResult.length > 0) {
          this.playerRules = r.bvResult;
          this.rulesAvailable = true;
        } else {
          this.rulesAvailable = false;
        }
      },
      (error) => console.log(error)
    );
  }

}
