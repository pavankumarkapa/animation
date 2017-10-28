import { Component, OnInit } from '@angular/core';
import { RulesViolationService } from './shared/rules-violation.service';

@Component({
  selector: 'rule-violations',
  templateUrl: './rule-violations.component.html',
  styleUrls: ['./rule-violations.component.scss']
})
export class RuleViolationsComponent implements OnInit {
  playerInfo = {
    name: 'pp_TheMonsterHERO',
    mail: 'monster_hero@gmail.com',
    product: 'POKER'
  };
  takeAction = false;
  block = false;
  unblock = false;
  ignore = false;
  actionResultSuccess = false;
  responseMessage = '';

  constructor(
    private rService: RulesViolationService
  ) { }

  ngOnInit() {
  }

  handleAction(bel, uel, iel) {
    this.takeAction = false;
    this.block = bel.checked;
    this.unblock = uel.checked;
    this.ignore = iel.checked;
    if (this.block || this.unblock || this.ignore) {
      this.takeAction = true;
    }
  }

  submitAction(el) {
    let type = 'BLOCK';
    if (this.block) {
      type = 'BLOCK';
    }
    if (this.unblock) {
      type = 'UNBLOCK';
    }
    if (this.ignore) {
      type = 'IGNORE';
    }
    this.rService.submitActionForPlayer(this.playerInfo.name, type, el.value).subscribe(
      (r: any) => {
        this.takeAction = false;
        this.actionResultSuccess = true;
        this.responseMessage = r.actionResponseMessage;
      },
      (error) => console.log(error)
    );
  }
}
