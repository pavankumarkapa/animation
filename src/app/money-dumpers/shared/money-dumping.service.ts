import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MoneyDumpingService {

  constructor(private http: HttpClient) { }

  getPlayerMoneyDumpingInfo(playerId: string) {
    const END_POINT = 'https://releaseb-eprotector-dashboard.ivycomptech.co.in/player/playerMoneyDumping';
    return this.http.get(END_POINT, {
      params: new HttpParams().set('accountName', playerId)
    }).map((r) => {
      if (!r) {
        r = {
          mostPlayedOpponents: [],
          lossOpponents: [],
          mostLovedOpponents: []
        };
      }
      return r;
    });
  }
}
