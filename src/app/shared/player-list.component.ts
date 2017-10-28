import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'player-list',
  template: `
    <div class="player-list">
      <div class="row player-search">
        <div class="col-md-12">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for" [(ngModel)]="searchQuery">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 player-list-element">
          <div class="list-group">
            <a class="list-group-item list-group-item-action"
               [routerLink]="[ROUTE_PATH, player]"
               routerLinkActive="active"
               *ngFor="let player of players | filterList: searchQuery"
               (click)="OnSelect(player)">
              {{player}}
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .player-list {
      background-color: #F8F9FA;
      border: 1px solid #212121;
      padding: 0.5em;
    }
    .player-search {
      margin-bottom: 1em;
    }
    .player-list-element {
      max-height: 460px;
      overflow: scroll;
    }
    .list-group-item-action {
      cursor: pointer;
      background-color: #9E9E9E;
    }
    .list-group-item-action:hover, .active {
      background-color: #212121;
      color: white;
    }
    .list-group-item.active {
      border-color: inherit;
    }
    html {
      overflow: scroll;
      overflow-x: hidden;
    }
    ::-webkit-scrollbar {
      width: 0px;  /* remove scrollbar space */
      background: transparent;  /* optional: just make scrollbar invisible */
    }
    /* optional: show position indicator in red */
    ::-webkit-scrollbar-thumb {
    }
  `]
})
export class PlayerListComponent implements OnInit {
  @Input() players;
  @Input() ROUTE_PATH;
  @Output() playerSelect = new EventEmitter();
  searchQuery;

  constructor() {
  }

  ngOnInit() {
  }

  OnSelect(player) {
    this.playerSelect.emit(player);
  }
}
