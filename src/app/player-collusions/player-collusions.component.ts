import { Component, OnInit } from '@angular/core';
import { AlertType } from '../shared/alert-type.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'player-collusions',
  templateUrl: './player-collusions.component.html',
  styleUrls: ['./player-collusions.component.scss']
})
export class PlayerCollusionsComponent implements OnInit {
  ROUTE = 'player-collusion-details';
  type = AlertType.COLLUDERS;
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
