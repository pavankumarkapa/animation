import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../shared/player.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'player-collusion-details',
  templateUrl: './player-collusion-details.component.html',
  styleUrls: ['./player-collusion-details.component.scss']
})
export class PlayerCollusionDetailsComponent implements OnInit {
  playerPersonalInfo;
  playerCollusionInfo;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (d) => {
        this.playerPersonalInfo = d['playerPersonalInfo'];
      }
    );
    this.route.paramMap.subscribe(
      (p) => {
        const playerId = p.get('playerId');
        this.fetchResults(playerId);
      }
    );
  }

  private fetchResults(playerId: string) {
  }
}
