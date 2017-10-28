import { Component, OnInit } from '@angular/core';
import { AlertType } from '../shared/alert-type.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'player-associations',
  templateUrl: './player-associations.component.html',
  styleUrls: ['./player-associations.component.scss']
})
export class PlayerAssociationsComponent implements OnInit {
  ROUTE = 'player-association-details';
  type = AlertType.ASSOCIATIONS;
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
