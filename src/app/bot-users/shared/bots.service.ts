import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TimeFrame } from '../../shared/time-frame.enum';
import 'rxjs/add/operator/map';

@Injectable()
export class BotsService {

  constructor(private http: HttpClient) { }

  getPlayerSpecificBotAlertDetails(playerId: string, timeFrame: TimeFrame) {
    const END_POINT = 'https://releaseb-eprotector-dashboard.ivycomptech.co.in/api-dashboard-alerts/getBotAlertInfoOfPlayer';
    // TODO: Change alertType to timeFrame/duration in HttpParams
    return this.http.get(END_POINT, {
      params: new HttpParams().set('userId', playerId).set('timeFrame', `${timeFrame}`)
    }).map((r) => {
      const mock = {
        botAlertDetails: [
          {
            botSubAlertType: 1,
            activeCount: 4,
            inActiveCount: 0,
          },
          {
            botSubAlertType: 2,
            activeCount: 3,
            inActiveCount: 1,
          },
          {
            botSubAlertType: 3,
            activeCount: 2,
            inActiveCount: 2,
          },
          {
            botSubAlertType: 4,
            activeCount: 1,
            inActiveCount: 3,
          }
        ]
      };
      // r = mock;
      return r;
    });
  }

}
