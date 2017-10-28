import { Component, OnInit } from '@angular/core';
import { MoneyDumpingService } from '../shared/money-dumping.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'money-dumper-details',
  templateUrl: './money-dumper-details.component.html',
  styleUrls: ['./money-dumper-details.component.scss']
})
export class MoneyDumperDetailsComponent implements OnInit {
  playerPersonalInfo;
  mostPlayedNetWinsAndNetLoss;
  mostPlayedOpponents;
  mostHatedOpponents;
  mostLovedOpponents;

  constructor(
    private route: ActivatedRoute,
    private moneyDumpingService: MoneyDumpingService
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
    this.moneyDumpingService.getPlayerMoneyDumpingInfo(playerId).subscribe(
      (r: any) => {
        this.mostPlayedOpponents = r.mostPlayedOpponents.map(d => {
          return {
            key: d.playerId,
            value: d.handPercentage
          };
        });

        this.mostHatedOpponents = r.lossOpponents.map(d => {
          return {
            key: d.playerId,
            value: d.netWin
          };
        });

        this.mostLovedOpponents = r.winOpponents.map(d => {
          return {
            key: d.playerId,
            value: d.netLoss
          };
        });

        // { type: 'flopCBetIP', MICRO: 0.6, MEDIUM: 0.5},
        // { type: 'flopCBetOOP', MICRO: 1.0, MEDIUM: 0.2},
        // { type: 'turnCBetIP', MICRO: 0.3, MEDIUM: 0.7},
        // { type: 'turnCBetOOP', MICRO: 1.0, MEDIUM: 1.0}

        // netWin
        // netLoss
        // playerId

        this.mostPlayedNetWinsAndNetLoss = r.mostPlayedOpponents.map((d) => {
            return {
              type: d['playerId'],
              NETWIN: d['netWin'],
              NETLOSS: d['netLoss'],
            };
        });

        console.log(this.mostPlayedNetWinsAndNetLoss);
      },
      (error) => console.log(error)
    );
  }
}
