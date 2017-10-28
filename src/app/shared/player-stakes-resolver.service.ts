import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { PlayerService } from './player.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlayerStakesResolverService implements Resolve<any> {

  constructor(
    private router: Router,
    private playerService: PlayerService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.playerService.getDetailedPlayerStakesInfo(route.queryParams.playerId)
      .map((r: any) => {
        if (r == null || r.stakeStatsBeans == null) {
          this.router.navigate(['alerts-dashboard']);
          return null;
        }
        return r.stakeStatsBeans;
      });
  }
}
