import { Component, OnInit } from '@angular/core';
import { BotsService } from '../shared/bots.service';
import { TimeFrame } from '../../shared/time-frame.enum';
import { PlayerService } from '../../shared/player.service';
import { ActivatedRoute } from '@angular/router';
import { BotAlertType } from '../shared/bot-alert-type.enum';

@Component({
  selector: 'basic-statistics',
  templateUrl: './basic-statistics.component.html',
  styleUrls: ['./basic-statistics.component.scss']
})
export class BasicStatisticsComponent implements OnInit {
  playerPersonalInfo;
  playerSessionsInfo;
  playerStakesInfo;
  playerStatisticsInfo;
  playerBotAlertDetails = {
    donutInfo: [],
    cardInfo: []
  };
  donutInfo = [BotAlertType.CAPTCHA, BotAlertType.STEALTH_TABLE_RESIZE,
    BotAlertType.STEALTH_CARD_RESIZE, BotAlertType.EXTENDED_CARD_CHANGE,
    BotAlertType.MOUSE, BotAlertType.FISHY_PROCESS];

  cardInfo = [BotAlertType.FISHY_PROCESS, BotAlertType.FAB_FAILURES,
    BotAlertType.MOUSE, BotAlertType, BotAlertType.KEYBOARD_HOOK]

  constructor(
    private route: ActivatedRoute,
    private botsService: BotsService,
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
    this.botsService.getPlayerSpecificBotAlertDetails(playerId, TimeFrame.MONTH).subscribe(
      (r: any) => {
        const t = r.botAlertDetails;
        const value = [{
          key: 'Failure',
          value: 0,
          total: 0,
          failure: true
        }, {
          key: 'Success',
          value: 100,
          total: 0,
          failure: false
        }];
        const tBotDetails: any = {
          1: value,
          2: value,
          3: value,
          4: value,
          5: value,
          6: value,
          7: value,
          8: value
        };
        t.forEach((d) => {
          if (tBotDetails[d.botSubAlertType]) {
            tBotDetails[d.botSubAlertType] = [{
              key: 'Failure',
              value: Math.ceil((d.activeCount / (d.activeCount + d.inActiveCount) * 100)),
              total: d.activeCount + d.inActiveCount,
              failure: true
            }, {
              key: 'Success',
              value: Math.floor((d.inActiveCount / (d.activeCount + d.inActiveCount) * 100)),
              total: d.activeCount + d.inActiveCount,
              failure: false
            }];
          }
        });

        const tmpBotAlertDetails: any = {
          donutInfo: [],
          cardInfo: []
        };

        const that = this;
        const temp = Object.keys(tBotDetails).map(k => {
          if (this.donutInfo.indexOf(parseInt(k, 10)) > -1) {
            tmpBotAlertDetails.donutInfo.push({
              type: k,
              data: tBotDetails[k]
            });
          }

          if (this.cardInfo.indexOf(parseInt(k, 10)) > -1) {
            tmpBotAlertDetails.cardInfo.push({
              type: k,
              data: tBotDetails[k]
            });
          }
          return {
            type: k,
            data: tBotDetails[k]
          };
        });
        this.playerBotAlertDetails = tmpBotAlertDetails;
        console.log('temp', temp);
        console.log('playerBotAlertDetails', this.playerBotAlertDetails);
      },
      (error) => console.log(error)
    );

    this.playerService.getPlayerStakesInfo(playerId).subscribe(
      (r) => {
        this.playerStakesInfo = r.map((d) => {
          return {
            key: d.gameType,
            value: d.totalHands
          };
        });
        //   = Object.keys(r[0]).map((k) => {
        //   const t = {
        //     type: k,
        //     MICRO: r[0][k],
        //     MEDIUM: r[1][k]
        //   };
        //   return t;
        // }).filter((f) => {
        //   return f.type === 'flopCBetIP' ||
        //     f.type === 'flopCBetOOP' ||
        //     f.type === 'turnCBetIP' ||
        //     f.type === 'turnCBetOOP';
        // });
      },
      (error) => console.log(error)
    );

    this.playerService.getPlayerSessionsInfo(playerId).subscribe(
      (r) => {
        this.playerSessionsInfo = Object.keys(r).map(k => {
          return {
            key: k,
            value: r[k]['durationOfSession'] / 1000
          };
        });
        console.log('playerSessionsInfo', this.playerSessionsInfo);
      },
      (error) => console.log(error)
    );

    this.playerService.getPlayerStatistics(playerId).subscribe(
      (r) => {
        this.playerStatisticsInfo = Object.keys(r).map(k => {
          const t = {
            key: k,
            value: r[k]
          };
          return t;
        });
      },
      (error) => console.log(error)
    );
  }
}
