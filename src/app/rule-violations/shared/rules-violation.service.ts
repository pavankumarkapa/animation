import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class RulesViolationService {

  constructor(private http: HttpClient) { }

  getPlayerRuleViolationsForType(playerId: string, type: string) {
    const END_POINT = 'https://releaseb-eprotector-dashboard.ivycomptech.co.in/api-dashboard/getPokerBVRulesResult';
    return this.http.get(END_POINT, {
      params: new HttpParams()
        .set('userId', playerId)
        .set('ruleStatus', type)
        .set('dateFormat', 'yyyy-mm-dd')
        .set('startDate', '2017-09-01')
        .set('endDate', '2017-10-16')
    });
  }

  submitActionForPlayer(playerId: string, type: string, comment: string) {
    const END_POINT = 'https://releaseb-eprotector-dashboard.ivycomptech.co.in/api-dashboard/submitActionBVForPlayer';
    return this.http.get(END_POINT, {
      params: new HttpParams()
        .set('userId', playerId)
        .set('actionType', type)
        .set('agentName', 'admin')
        .set('comment', comment)
    });
  }
}
