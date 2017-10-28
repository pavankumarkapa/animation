import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerService {

  constructor(private http: HttpClient) { }

  getPlayerPersonalInfo(playerId: string) {
    const END_POINT = 'https://releaseb-eprotector-dashboard.ivycomptech.co.in/api-dashboard-alerts/getPlayerPersonalInfoData';
    return this.http.get(END_POINT, {
      params: new HttpParams().set('userId', playerId)
    });
  }

  getPlayerFinancialInfo(playerId: string) {
    const END_POINT = 'https://releaseb-eprotector-dashboard.ivycomptech.co.in/api-dashboard-alerts/getplayerFinancialInfoData';
    return this.http.get(END_POINT, {
      params: new HttpParams().set('userId', playerId)
    });
  }

  getPlayerStatistics(playerId: string, month: number = 9, year: number = 2017) {
    const END_POINT = 'https://releaseb-eprotector-dashboard.ivycomptech.co.in/player/getPlayerStatistics';
    return this.http.get(END_POINT, {
      params: new HttpParams().set('accountName', playerId).set('month', `${month}`).set('year', `${year}`)
    }).map((r: any) => {
      return r.eprotectorStatsRatios ? r.eprotectorStatsRatios : {
        raiseRatioPercentMOCK: 10.006476683937823,
        callPercentMOCK: 39.99352331606217,
        betPercentMOCK: 0.0,
        foldPercentMOCK: 50.0,
        checkRaisePercentMOCK: 0.0
      };
    });
  }

  getDetailedPlayerStatistics(playerId: string, month: number = 9, year: number = 2017) {
    const END_POINT = 'https://releaseb-eprotector-dashboard.ivycomptech.co.in/player/getPlayerStatistics';
    return this.http.get(END_POINT, {
      params: new HttpParams().set('accountName', playerId).set('month', `${month}`).set('year', `${year}`)
    });
  }

  getPlayerStakesInfo(playerId: string, month: number = 9, year: number = 2017) {
    const END_POINT = 'https://releaseb-eprotector-dashboard.ivycomptech.co.in/player/stakeStats';
    return this.http.get(END_POINT, {
      params: new HttpParams().set('accountName', playerId).set('month', `${month}`).set('year', `${year}`)
    }).map((r: any) => {
      return r.stakeStatsBeans ? r.stakeStatsBeans : [{
        gameType: 'MICROMOCK',
        totalHands: 5530
      }, {
        gameType: 'MEDIUMMOCK',
        totalHands: 2590
      }, {
        gameType: 'MACROMOCK',
        totalHands: 530
      }];
    });
  }

  getDetailedPlayerStakesInfo(playerId: string, month: number = 9, year: number = 2017) {
    const END_POINT = 'https://releaseb-eprotector-dashboard.ivycomptech.co.in/player/stakeStats';
    return this.http.get(END_POINT, {
      params: new HttpParams().set('accountName', playerId).set('month', `${month}`).set('year', `${year}`)
    });
  }

  getPlayerSessionsInfo(playerId: string) {
    const END_POINT = 'https://releaseb-eprotector-dashboard.ivycomptech.co.in/player/getPlayerSessionData';
    return this.http.get(END_POINT, {
      params: new HttpParams().set('accountName', playerId)
    }).map((r: any) => {
      if (r.errorCode) {
        r.sessionDataMap = null;
        r.playerId = playerId;
      }
      return r.sessionDataMap ? r.sessionDataMap : {
        pp_pokerauto997109MOCK: {
          startTime: 1506594390000,
          endTime: 1506595675000,
          durationOfSession: 1285000,
          lastUpdatedAt: 1507707292500
        },
        pp_pokerauto997177MOCK: {
          startTime: 1506594390000,
          endTime: 1506595675000,
          durationOfSession: 2485000,
          lastUpdatedAt: 1507708192077
        },
        pp_pokerauto997438MOCK: {
          startTime: 1506594390000,
          endTime: 1506595675000,
          durationOfSession: 85000,
          lastUpdatedAt: 1508014073528
        },
        pp_pokerauto997838MOCK: {
          startTime: 1506594390000,
          endTime: 1506595675000,
          durationOfSession: 15000,
          lastUpdatedAt: 1507712606179
        },
        pp_pokerauto997971MOCK: {
          startTime: 1506594390000,
          endTime: 1506595675000,
          durationOfSession: 1985000,
          lastUpdatedAt: 1507955093083
        },
        pp_pokerauto997164MOCK: {
          startTime: 1506594390000,
          endTime: 1506595675000,
          durationOfSession: 2985000,
          lastUpdatedAt: 1507718306358
        }
      };
    });
  }
}
