import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../shared/alerts.service';

@Component({
  selector: 'alerts-dashboard',
  templateUrl: './alerts-dashboard.component.html',
  styleUrls: ['./alerts-dashboard.component.scss']
})
export class AlertsDashboardComponent implements OnInit {
  alerts;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
    // this.route.data.subscribe(
    //   (d) => {
    //     this.alerts = d['alerts'];
    //     console.log(this.alerts);
    //   }
    // );

    this.alerts = this.alertsService.getDashboardAlerts();
    console.log(this.alerts);
  }

}
