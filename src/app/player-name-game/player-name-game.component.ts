import { Component, OnInit, Input } from '@angular/core';
import { GamePlayer } from '../../models/game';

@Component({
	selector: 'app-player-name-game',
	templateUrl: './player-name-game.component.html',
	styleUrls: ['./player-name-game.component.scss']
})
export class PlayerNameGameComponent implements OnInit {

	@Input('player') player: GamePlayer;

	constructor() { }

	ngOnInit(): void { }

}
