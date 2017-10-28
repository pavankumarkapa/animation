import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AlertsService } from './alerts.service';
import { Observable } from 'rxjs/Observable';
import { AlertType } from './alert-type.enum';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerListResolverService implements Resolve<any> {
  routesHash = {
    '/bot-users': AlertType.BOT_USERS,
    '/money-dumpers': AlertType.MONEY_DUMPING,
    '/bonus-abusers': AlertType.BONUS_ABUSERS,
    '/player-associations': AlertType.ASSOCIATIONS,
    '/player-collusions': AlertType.COLLUDERS
  }
  constructor(
    private alertsService: AlertsService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const alertType = this.routesHash[state.url];
    if (!alertType) {
      console.warn('PLAYER_NAMES_ALERT_TYPE UNDEFINED', state.url);
      this.router.navigate(['alerts-dashboard']);
      return null;
    }
    return this.alertsService.getPlayersForAlertType(alertType).map((r: any) => {
      if (r.playerNames == null || r.playerNames.length == 0) {
        console.error('PLAYER_NAMES EMPTY:', r);
        r.playerNames = ['pp_pokerauto1000', 'pp_pokerauto1001', 'pp_pokerauto1002', 'pp_pokerauto1003'];
      }
      return r;
    });
  }
}
