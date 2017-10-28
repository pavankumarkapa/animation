import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AlertType } from './alert-type.enum';

@Injectable()
export class AlertsService {

  constructor(private http: HttpClient) { }

  getPlayersForAlertType(alertType: AlertType) {
    const END_POINT = 'https://releaseb-eprotector-dashboard.ivycomptech.co.in/api-dashboard-alerts/getPlayerNamesBasedOnAlerttype';
    return this.http.get(END_POINT, {
      params: new HttpParams().set('alertType', `${alertType}`)
    });
  }

  getDashboardAlerts() {
    return [
      { type: 'Bot Users',
        url: '/bot-users',
        data: [
        {
          key: 'Failure',
          value: 23,
          failure: true
        },
        {
          key: 'Success',
          value: 67,
          failure: false
        }
      ]},
      { type: 'Money Dumping',
        url: '/money-dumpers',
        data: [
        {
          key: 'Failure',
          value: 10,
          failure: true
        },
        {
          key: 'Success',
          value: 90,
          failure: false
        }
      ]},
      { type: 'Bonus Abusers',
        url: '/bonus-abusers',
        data: [
        {
          key: 'Failure',
          value: 13,
          failure: true
        },
        {
          key: 'Success',
          value: 87,
          failure: false
        }
      ]},
      { type: 'Player Associations',
        url: '/player-associations',
        data: [
        {
          key: 'Failure',
          value: 45,
          failure: true
        },
        {
          key: 'Success',
          value: 55,
          failure: false
        }
      ]},
      { type: 'Collusions',
        url: '/player-collusions',
        data: [
        {
          key: 'Failure',
          value: 5,
          failure: true
        },
        {
          key: 'Success',
          value: 95,
          failure: false
        }
      ]},
      { type: 'Rule Violations',
        url: '/rule-violations',
        data: [
        {
          key: 'Failure',
          value: 25,
          failure: true
        },
        {
          key: 'Success',
          value: 75,
          failure: false
        }
      ]}
    ];
  }
}
