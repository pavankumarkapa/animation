import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../shared/player.service';
import { MoneyDumpingService } from './shared/money-dumping.service';
import { AlertType } from '../shared/alert-type.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'money-dumpers',
  templateUrl: './money-dumpers.component.html',
  styleUrls: ['./money-dumpers.component.scss']
})
export class MoneyDumpersComponent implements OnInit {
  ROUTE = 'money-dumper-details';
  type = AlertType.MONEY_DUMPING;
  players = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (d) => {
        this.players = d['players'].playerNames;
      }
    );
  }

  navigateTo(player) {
    // this.router.navigate([this.ROUTE, player]);
  }
}
