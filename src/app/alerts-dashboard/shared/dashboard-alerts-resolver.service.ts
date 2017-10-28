import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AlertsService } from '../../shared/alerts.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardAlertsResolverService implements Resolve<any>{

  constructor(
    private router: Router,
    private alertsService: AlertsService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.alertsService.getDashboardAlerts();
  }
}
