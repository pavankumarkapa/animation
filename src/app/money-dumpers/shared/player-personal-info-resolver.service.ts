import { Injectable } from '@angular/core';
import { PlayerService } from '../../shared/player.service';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerPersonalInfoResolverService implements Resolve<any> {

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.playerService.getPlayerPersonalInfo(route.paramMap.get('playerId'))
      .map((r) => {
        if (r) {
          return r;
        }

        this.router.navigate(['money-dumpers']);
      });
  }
}
