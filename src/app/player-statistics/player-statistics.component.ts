import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.scss']
})
export class PlayerStatisticsComponent implements OnInit {
  playerStatisticsInfo;
  playerStakesInfo;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (d) => {
        this.playerStatisticsInfo = d['playerStatisticsInfo'];
        this.playerStakesInfo = d['playerStakesResolverService'];
        console.log('playerStakesInfo', this.playerStakesInfo);
      }
    );
  }

}
