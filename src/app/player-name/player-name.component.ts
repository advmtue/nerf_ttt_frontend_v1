import { Component, Input } from '@angular/core';
import { Player } from 'src/models/player';

@Component({
  selector: 'app-player-name',
  templateUrl: './player-name.component.html',
  styleUrls: ['./player-name.component.scss']
})
export class PlayerNameComponent {

  @Input('player') player: Player;

  constructor() { }
}
