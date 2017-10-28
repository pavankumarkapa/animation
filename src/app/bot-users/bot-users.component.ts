import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType } from '../shared/alert-type.enum';

@Component({
  selector: 'bot-users',
  templateUrl: './bot-users.component.html',
  styleUrls: ['./bot-users.component.scss']
})
export class BotUsersComponent implements OnInit {
  ROUTE = 'basic-statistics';
  type = AlertType.BOT_USERS;
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
