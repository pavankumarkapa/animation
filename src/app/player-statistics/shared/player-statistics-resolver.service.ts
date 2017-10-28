import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PlayerService } from '../../shared/player.service';

@Injectable()
export class PlayerStatisticsResolverService implements Resolve<any> {

  constructor(
    private router: Router,
    private playerService: PlayerService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.playerService.getDetailedPlayerStatistics(route.queryParams.playerId)
    .map((r: any) => {
      if (r == null) {
        this.router.navigate(['alerts-dashboard']);
        return null;
      }
      let counter = 0;
      Object.keys(r).map((k) => {
        console.log(k);
        if (r[k] == null) {
          counter++;
        }
      });

      if (counter > 3) {
        this.router.navigate(['alerts-dashboard']);
        return null;
      }
      return r;
    });
  }
}
