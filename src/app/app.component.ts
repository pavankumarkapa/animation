import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router
  ) {}

  handlePlayerSearch(playerId: string) {
    if (playerId.length === 0) {
      return;
    }

    const navigationQuery: NavigationExtras = {
      queryParams: {
        playerId: playerId
      }
    };

    console.log('handlePlayerSearch');
    this.router.navigate(['player-statistics'], navigationQuery);
  }
}
