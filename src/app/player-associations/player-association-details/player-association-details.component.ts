import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../shared/player.service';

@Component({
  selector: 'player-association-details',
  templateUrl: './player-association-details.component.html',
  styleUrls: ['./player-association-details.component.scss']
})
export class PlayerAssociationDetailsComponent implements OnInit {
  playerPersonalInfo;
  playerAssociationInfo;

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
